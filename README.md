# Hex Color Display

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
