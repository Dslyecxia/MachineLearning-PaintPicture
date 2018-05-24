import React from 'react';
import Constants from '../../helpers/constants';
import PictureTypeForm from './Forms/PictureTypeForm';
import WebcamForm from './Forms/WebcamForm';
import UploadPictureForm from './Forms/UploadPictureForm';
import PaintPictureComponent from '../PaintPictureComponent';

class LoadPictureView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			componentSelected: false,
			pictureData: {
				file: null
			},
			currentComponent: null
		};

		this.setComponent = this.setComponent.bind(this);
		this.setImage = this.setImage.bind(this);
	}

	setComponent(val) {
		this.setState({
			componentSelected: true,
			currentComponent: val
		});
	}

	setImage(val) {
		this.setState({
			pictureData: {
				file: val,
			},
			currentComponent: Constants.PictureComponent.Machine
		});
	}

  	render() {
  		const isSelected = this.state.componentSelected;
  		const curComponent = this.state.currentComponent;
  		let component;
		
		if(isSelected){
			switch(curComponent){
				case Constants.PictureComponent.Webcam:
					component = <WebcamForm setImage={this.setImage} />;
					break;
				case Constants.PictureComponent.Picture:
					component = <UploadPictureForm setImage={this.setImage} />;
					break;
				case Constants.PictureComponent.Machine:
					component = <PaintPictureComponent imagePreview={this.state.pictureData.file} />
					break;
				default:
					break;
			}
		} else {
			component  = <PictureTypeForm setComponent={this.setComponent} />
		}
		
		return (
			<div>
				<h2>Load your Picture</h2>
				<p>Think of happy thoughts when your picture gets taken otherwise it won't work. Seriously. There will be blood on your hands if you don't. This is your only warning.</p>
				<div>
					{component}
				</div>
			</div>
		);
  	}
}

export default LoadPictureView;