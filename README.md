# Hex Color Display

![Gif example](https://github.com/dolby360/hex_color_displayer/blob/master/assets/Capture.PNG?raw=true)

## Eample:
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
// bin is a buffer or byte array
React.render(<HexColorDisplay 
        offsets={data_example} bin={raw} />, document.body);
```


### Storybook example
In storybook I added an example of GIF image, I used the documentation below for the offset data.
Gif 89a binary structure:
https://www.w3.org/Graphics/GIF/spec-gif89a.txt
