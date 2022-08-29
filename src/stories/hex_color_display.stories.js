import HexColorDisplay from '../index.js';
import React, { useState, useEffect } from 'react';
import { storiesOf } from '@storybook/react'
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
	{
		"start": 20,
		"end": 32,
		"name": "section 2",
		"color": "",
		"sublist": []
	},
]

stories.add('App', () => {
	const raw = [97, 98, 99, 100, 101, 102, 103, 104, 105, 106,
		107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117,
		118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128]
	const view = <HexColorDisplay offsets={dataExample} bin={raw} />
	return (view);
});