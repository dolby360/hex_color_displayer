import HexColorDisplay from '../components/hex_color_display';
import React,  { useState, useEffect } from 'react';
import {storiesOf} from '@storybook/react'
const stories = storiesOf('test', module);

const data_example = [
	{
		"start": 0,
		"end": 13,
		"name": "Header and color table information",
		"color": "",
		"sublist": [
			{
				"start": 0,
				"end": 3,
				"name": "Header Signature (always GIF)",
				"color": "",
				"sublist": []
			},
			{
				"start": 3,
				"end": 6,
				"name": "GIF format version(87a or 89a)",
				"color": "",
				"sublist": []
			},
			{
				"start": 6,
				"end": 8,
				"name": "Width of Display Screen in Pixels",
				"color": "",
				"sublist": []
			},
			{
				"start": 8,
				"end": 10,
				"name": "Height of Display Screen in Pixels",
				"color": "",
				"sublist": []
			},
			{
				"start": 10,
				"end": 11,
				"name": "Screen and Color Map Information",
				"color": "",
				"sublist": []
			},
			{
				"start": 11,
				"end": 12,
				"name": "Background Color Index",
				"color": "",
				"sublist": []
			},
			{
				"start": 12,
				"end": 13,
				"name": "Pixel Aspect Ratio",
				"color": "",
				"sublist": []
			},
		],
	}
]

stories.add('App', () => {

	const getButton = () => {
		return(    
			<div>
				<div>
					Upload bin file
				</div>
				<input type="file" onChange={(e)=>onFilesSelected(e)}/>
			</div>
		)
	}
	const [view, setView] = useState(getButton);
	let fileReader = new FileReader()

	const setBin = (e) => {
		let raw = new Uint8Array(e.target.result );
		setView(
			<HexColorDisplay 
				offsets={data_example}
				bin={raw}
			/>
		)
	}

	const onFilesSelected = (e) => {
		fileReader.onload = setBin
		fileReader.readAsArrayBuffer(e.target.files[0])
	}
    return (view);
});