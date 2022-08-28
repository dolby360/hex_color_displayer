import HexColorDisplay from '../index.js';
import React,  { useState, useEffect } from 'react';
import {storiesOf} from '@storybook/react'
const stories = storiesOf('test', module);

const dataExample = [
	{
		"start": 0,
		"end": 13,
		"name": "some fency header",
		"color": "",
		"sublist": [
			{
				"start": 0,
				"end": 3,
				"name": "sub header 1",
				"color": "",
				"sublist": []
			},
			{
				"start": 3,
				"end": 6,
				"name": "sub header 2",
				"color": "",
				"sublist": []
			},
			{
				"start": 6,
				"end": 8,
				"name": "sub header 3",
				"color": "",
				"sublist": []
			},
			{
				"start": 8,
				"end": 10,
				"name": "sub header 4",
				"color": "",
				"sublist": []
			},
			{
				"start": 10,
				"end": 11,
				"name": "sub header 5",
				"color": "",
				"sublist": []
			},
			{
				"start": 11,
				"end": 12,
				"name": "sub header 6",
				"color": "",
				"sublist": []
			},
			{
				"start": 12,
				"end": 13,
				"name": "sub header 7",
				"color": "",
				"sublist": []
			},
		],
	},
	{
		"start": 13,
		"end": 20,
		"name": "section 2",
		"color": "",
		"sublist": []
	},
]

stories.add('App', () => {
    const raw = new Uint8Array(97,98,99,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20);
    const view = <HexColorDisplay  offsets={dataExample} bin={raw}/>
    return (view);
});