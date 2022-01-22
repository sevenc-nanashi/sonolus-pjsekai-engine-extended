# Sonolus PJSekai Engine Modified

A modifed Project Sekai: Colorful Stage! engine for [Sonolus](https://sonolus.com).

## Links

-   [Sonolus Website](https://sonolus.com)
-   [Sonolus Wiki](https://github.com/NonSpicyBurrito/sonolus-wiki)

## Installation

```
npm install sonolus-pjsekai-engine --save
```

## Build

### Build an engine
```
npm run build
(You'll see build result in dist folder)
```

### Convert a chart
```
(Put a chart file as `convert.sus` in the top level folder of this repository)
npm run convert
(You'll see build result in levelDist folder)
```


## Mods

- FUZZY note by [sevenc-nanashi](https://github.com/sevenc-nanashi)
 - It looks notes but works like slider. (from dankagu)
- DAMAGE note by [Dosugamea](https://github.com/Dosugamea)
 - It looks notes but get MISS on tap, otherwise get PERFECT. (from chunithm)
- HISPEED by [Dosugamea](https://github.com/Dosugamea)
 - It multiply notes flowing speed on any timings when the chart author specifies. (from chunithm)


## Custom Resources

Engine ID: `2`

### Skin Sprites

| ID    | Sprite        |
| ----- | ------------- |
| 1     | Stage         |
| 10-16 | Note (left)   |
| 20-26 | Note (middle) |
| 30-36 | Note (right)  |
| 40-46 | Diamond       |
| 50-56 | Slot          |
| 60-66 | Slot Glow     |
| 71-94 | Flick Arrow   |

### Effect Clips

| ID  | Clip           |
| --- | -------------- |
| 1   | Critical Tap   |
| 2   | Critical Tick  |
| 3   | Critical Flick |
| 4   | Tick           |

## Documentation

### `version`

Package version.

### `engineInfo`

Partial engine information compatible with [sonolus-express](https://github.com/NonSpicyBurrito/sonolus-express).

### `engineConfiguration`

Engine Configuration.

-   `engineConfiguration.path`: path to file.
-   `engineConfiguration.buffer`: buffer of file.
-   `engineConfiguration.hash`: hash of file.

### `engineData`

Engine Data.

-   `engineData.path`: path to file.
-   `engineData.buffer`: buffer of file.
-   `engineData.hash`: hash of file.

### `engineThumbnail`

Engine Thumbnail.

-   `engineThumbnail.path`: path to file.
-   `engineThumbnail.buffer`: buffer of file.
-   `engineThumbnail.hash`: hash of file.

### `fromSus(sus, offset)`

Converts sus chart to Level Data.

-   `sus`: sus chart.
-   `offset`: chart offset (default: `0`).

### `fromFannithm(fannithm, offset)`

Converts Fannithm chart to Level Data.

-   `fannithm`: Fannithm chart.
-   `offset`: chart offset (default: `0`).
