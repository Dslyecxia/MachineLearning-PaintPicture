import React from 'react';
import Constants from '../../../helpers/constants';
import {resize} from '../../../helpers/imageHelper';

class UploadPictureForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {file: '',imagePreviewUrl: '', image: null};
	}

	_handleImageChange(e) {
		e.preventDefault();
		
		let file = e.target.files[0];
        let self = this;

	        resize(file, Constants.PictureData.Width, Constants.PictureData.Height, function (resizedDataUrl) {
	        	var image = new Image();
				image.src = resizedDataUrl;

				image.onload = () => {
				  	self.setState({
				    	file: file,
				    	imagePreviewUrl: resizedDataUrl,
				    	image: {
				    		height: image.height,
				    		width: image.width
				    	}
				  	});
				}
	        });
	}

  	render() {
  		let {imagePreviewUrl} = this.state;
	    let $imagePreview = null;
	    if (imagePreviewUrl) {
	    	let image = this.state.image;
	    	$imagePreview = (<img src={imagePreviewUrl} width={image.width} height={image.height} alt="Who's this nice looking person?" />);
	    } else {
	    	$imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
	    }

		return (
			<div className="previewComponent">
				<form onSubmit={(e)=>this._handleSubmit(e)}>
					<input className="fileInput" 
						type="file" 
						onChange={(e)=>this._handleImageChange(e)} />
					<button className="submitButton" 
						type="submit" 
						onClick={this.props.setImage.bind(this, this.state.imagePreviewUrl, this.state.image)}>Upload Image</button>
				</form>
				<div className="imgPreview">
					{$imagePreview}
				</div>
			</div>
		);
  	}
}

export default UploadPictureForm;