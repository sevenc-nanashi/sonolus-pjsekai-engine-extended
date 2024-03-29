import { minFlickVR } from '../../../../constants.mjs'
import { archetypes } from '../../../../index.mjs'
import { ease } from '../../../../slideConnectors/EaseType.mjs'
import { getHitbox, timeToScaledTime } from '../../../../utils.mjs'
import { FlickNote } from '../FlickNote.mjs'

export abstract class SlideEndFlickNote extends FlickNote {
    slideEndFlickData = this.defineImport({
        slideRef: { name: 'slide', type: Number },
    })

    earlyInputTime = this.entityMemory(Number)

    head = this.entityMemory({
        time: Number,
        scaledTime: Number,

        l: Number,
        r: Number,
    })
    tail = this.entityMemory({
        time: Number,
        scaledTime: Number,

        l: Number,
        r: Number,
    })

    initialize() {
        super.initialize()

        this.earlyInputTime = this.targetTime + input.offset

        this.head.time = bpmChanges.at(this.headData.beat).time
        this.head.scaledTime = timeToScaledTime(this.head.time, this.headData.timeScaleGroup)
        this.head.l = this.headData.lane - this.headData.size
        this.head.r = this.headData.lane + this.headData.size

        this.tail.time = bpmChanges.at(this.tailData.beat).time
        this.tail.scaledTime = timeToScaledTime(this.tail.time, this.tailData.timeScaleGroup)
        this.tail.l = this.tailData.lane - this.tailData.size
        this.tail.r = this.tailData.lane + this.tailData.size
    }

    touch() {
        if (time.now < this.inputTime.min) return

        // if (this.startInfo.state !== EntityState.Despawned) return

        if (time.now < this.earlyInputTime) {
            this.earlyTouch()
        } else {
            this.lateTouch()
        }
    }

    get slideData() {
        return archetypes.NormalSlideConnector.data.get(this.slideEndFlickData.slideRef)
    }

    get startInfo() {
        return entityInfos.get(this.slideData.startRef)
    }

    get startSharedMemory() {
        return archetypes.NormalSlideStartNote.sharedMemory.get(this.slideData.startRef)
    }

    get headData() {
        return archetypes.NormalSlideStartNote.data.get(this.slideData.headRef)
    }

    get tailData() {
        return archetypes.NormalSlideStartNote.data.get(this.slideData.tailRef)
    }

    earlyTouch() {
        if (this.startSharedMemory.lastActiveTime === time.now) return

        const s = ease(
            this.slideData.ease,
            Math.unlerpClamped(
                this.head.scaledTime,
                this.tail.scaledTime,
                timeToScaledTime(time.now - input.offset, this.headData.timeScaleGroup)
            )
        )

        const hitbox = getHitbox({
            l: Math.lerp(this.head.l, this.tail.l, s),
            r: Math.lerp(this.head.r, this.tail.r, s),
            leniency: this.leniency,
        })

        for (const touch of touches) {
            if (touch.vr < minFlickVR) continue
            if (!hitbox.contains(touch.lastPosition)) continue
            if (!touch.ended && hitbox.contains(touch.position)) continue

            this.complete(touch)
            return
        }
    }

    lateTouch() {
        for (const touch of touches) {
            if (touch.vr < minFlickVR) continue
            if (!this.fullHitbox.contains(touch.lastPosition)) continue

            this.complete(touch)
            return
        }
    }
}
