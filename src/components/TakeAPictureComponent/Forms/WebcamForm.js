import React from 'react';
import Webcam from 'react-webcam';
import Constants from '../../../helpers/constants';

class WebcamForm extends React.Component {
	setRef = (webcam) => {
		this.webcam = webcam;
	}

	capture = () => {
		const imageSrc = this.webcam.getScreenshot();
		let image = new Image();
		image.src = imageSrc;
		image.onload = () => {
		  	this.props.setImage(imageSrc, {width: image.width, height: image.height});
		}
	};

  	render() {	    
		return (
			<div>
				<Webcam
					audio={false}
					height={Constants.PictureData.Height}
					ref={this.setRef}
					screenshotFormat={Constants.PictureData.Format}
					width={Constants.PictureData.Width}
				/>
				<button onClick={this.capture}>Capture my beautiful face</button>
			</div>
		);
  	}
}

export default WebcamForm;