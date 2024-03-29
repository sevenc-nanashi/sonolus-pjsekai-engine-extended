import { SlideTickNote } from './SlideTickNote.mjs'
import { getAttached } from './utils.mjs'

export class IgnoredSlideTickNote extends SlideTickNote {
    attachedSlideTickData = this.defineImport({
        attachRef: { name: 'attach', type: Number },
    })

    globalPreprocess() {
        this.life.miss = -40
    }

    preprocessOrder = 1
    preprocess() {
        super.preprocess()
        ;({ lane: this.data.lane, size: this.data.size } = getAttached(
            this.attachedSlideTickData.attachRef,
            this.targetTime
        ))
    }
}
