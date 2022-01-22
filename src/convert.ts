import {
    readFileSync,
    emptyDirSync,
    outputFileSync,
    outputJsonSync,
} from 'fs-extra'
import { compressSync } from 'sonolus-core'
import { archetypes } from './engine/data/archetypes'
import { fromSus } from './lib/sus/convert'

const distPath = 'levelDist'

const levelDataRaw = fromSus(readFileSync('convert.sus', 'utf8'), 0, archetypes)

const levelDataGzip = compressSync(levelDataRaw)

emptyDirSync(distPath)

outputJsonSync(`${distPath}/level.json`, levelDataRaw)
outputFileSync(`${distPath}/level.gz`, levelDataGzip)
