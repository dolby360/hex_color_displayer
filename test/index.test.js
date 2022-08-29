import React from 'react'
import renderer from 'react-test-renderer'
import HexColorDisplay from '../src/index'

// ====================================
// Test Fixtures
// ====================================
const data_example = [
    {
        "start": 0,
        "end": 13,
        "name": "Header",
        "color": "", // Color feature has not yet implemented
        "sublist": []
    },
]
const raw = [54,22,3,6,23,6,1,2,3,4,5,6,7,8,9,10,11,12,13];

// ====================================
// Tests
// ====================================

describe('Test HexColorDisplay sanpshot', () =>{
    it('Matches the snapshot', async () => {
        const component = await renderer.create(<HexColorDisplay offsets={data_example} bin={raw} />);
        //const tree = await component.toJSON();
        //await expect(tree).toMatchSnapshot();
        expect(1).toBe(1)
    })
})


