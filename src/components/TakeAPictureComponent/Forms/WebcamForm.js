import React from 'react';
import Webcam from 'react-webcam';
import Constants from '../../../helpers/constants';

class WebcamForm extends React.Component {
	setRef = (webcam) => {
		this.webcam = webcam;
	}

	capture = () => {
		const imageSrc = this.webcam.getScreenshot();
		this.props.setImage(imageSrc, {width: Constants.PictureData.Width, height: Constants.PictureData.Height});
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