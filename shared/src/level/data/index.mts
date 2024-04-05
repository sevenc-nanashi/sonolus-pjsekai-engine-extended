// import { LevelData } from '@sonolus/core'
// import { promises as fs } from 'fs'
// // import { chsToUSC } from '~lib/src/chs/convert.cjs'
// // import { susToUSC } from '~lib/src/sus/convert.cjs'
// // import { mmwsToUSC } from '~lib/src/mmws/convert.cjs'
// import { anyToUSC } from 'usctool'
// import { uscToLevelData } from '~lib/src/convert.cjs'
// // import expert from './test.json'

// export const data: LevelData = await fs
//     .readFile('./shared/src/level/data/ongeki.sus')
//     .then(anyToUSC)
//     .then(({ usc }) => uscToLevelData(usc))

// await fs.writeFile('./shared/src/level/data/test.levelData.json', JSON.stringify(data, null, 4))
// export const data: LevelData = expert
//
import { LevelData } from '@sonolus/core'
import level from './test.levelData.json'

export const data: LevelData = level

