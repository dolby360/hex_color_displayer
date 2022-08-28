# Hex Color Display
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

NPM package to help you read a binary file with a structured format. On hover mouse the block is highlighted and a tooltip is popped up to explain each section.

![Gif example](https://github.com/dolby360/hex_color_displayer/blob/master/assets/Capture.PNG?raw=true)

## Example:
```js
var React = require('react')
var HexViewer = require('hex-color-displayer');

const data_example = [
    {
        "start": 0,
        "end": 13,
        "name": "Header",
        "color": "", // Color feature has not yet implemented
        "sublist": []
    },
]
let raw = new Uint8Array(54,22,3,6,23,6,1,2,3,4,5,6,7,8,9,10,11,12,13);
React.render(<HexColorDisplay 
        offsets={data_example} bin={raw} />, document.body);
```


### Storybook example
In storybook I added an example of GIF image, I used the documentation below for the offset data.
Gif 89a binary structure:
https://www.w3.org/Graphics/GIF/spec-gif89a.txt

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/aradbivas"><img src="https://avatars.githubusercontent.com/u/41302200?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Arad Bivas</b></sub></a><br /><a href="https://github.com/dolby360/hex_color_displayer/commits?author=aradbivas" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/vov62"><img src="https://avatars.githubusercontent.com/u/71568364?v=4?s=100" width="100px;" alt=""/><br /><sub><b>avi vovgen</b></sub></a><br /><a href="https://github.com/dolby360/hex_color_displayer/commits?author=vov62" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!