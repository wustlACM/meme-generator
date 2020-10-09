import React, { useState, useEffect } from 'react';
import "./meme.css";

// Functional component
function MemeGenerator(){
	const [topText, setTopText] = useState('');
	const [bottomText, setBottomText] = useState('');
	const [randomImg, setRandomImg] = useState('');
	const [memes, setMemes] = useState();

	// Function to load memes
	const retrieveMemes = async () => {
		// Fetch GET endpoint for json object
		const apiCall = await fetch("https://api.imgflip.com/get_memes")
			// Treat returned raw data as json
			.then((res) => {return res.json()})
			// extract the 'data'->'memes' field of the json object
			.then(res => {
				// Store into our state variable 'memes'
				setMemes(res.data["memes"]);
			})
	}

	// Change top text
	const changeTopText = (event) => {
		// Update our state variable
		const { name, value } = event.target;
		console.log(name + ":" + value);
		setTopText(value);
	}

	// Change bottom text
	const changeBottomText = (event) => {
		// Update our state variable
		const { name, value } = event.target;
		console.log(name + ":" + value);
		setBottomText(value);
	}

	// Generate the meme
	const generateMeme = (event) => {
		event.preventDefault(); // reloads the page (we don't want that)
		const randNum = Math.floor(Math.random() * memes.length)
		const randMemeImg = memes[randNum].url
		setRandomImg(randMemeImg);
	}

	// This plays the role of the constructor
	useEffect(() => {
		console.log("runs once");
		setRandomImg('http://i.imgflip.com/1bij.jpg');
		retrieveMemes(); // load our memes!
	}, []);

	return (
		<div>
			<form className="meme-form" onSubmit={generateMeme}>
				<input
					type="text"
					name="topText"
					placeholder="Top Text"
					onChange={changeTopText}
				/>
				<input
					type="text"
					name="bottomText"
					placeholder="Bottom Text"
					onChange={changeBottomText}
				/>
				<button>Gen</button>
			</form>
			<div className="meme">
				<h2 className="top">{topText}</h2>
				<img src={randomImg} />
				<h2 className="bottom">{bottomText}</h2>

				{/* Display/dump all info on our memes */}
				{/*<p>{JSON.stringify(memes)}</p>*/}
			</div>
		</div>
	)
}

export default MemeGenerator;