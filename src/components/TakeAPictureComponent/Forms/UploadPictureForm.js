import React from 'react';
import Constants from '../../../helpers/constants';

class UploadPictureForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {file: '',imagePreviewUrl: '', image: null};
	}

	_handleImageChange(e) {
		e.preventDefault();

		let reader = new FileReader();
		let file = e.target.files[0];

		reader.onloadend = () => {
			var image = new Image();
			image.src = reader.result;

			image.onload = () => {
			  	this.setState({
			    	file: file,
			    	imagePreviewUrl: reader.result,
			    	image: {
			    		height: this.height,
			    		width: this.width
			    	}
			  	});
			}
		}

		reader.readAsDataURL(file)
	}

  	render() {
  		let {imagePreviewUrl} = this.state;
	    let $imagePreview = null;
	    if (imagePreviewUrl) {
	    	let image = this.state.image;
	    	console.log(image);
	    	let width = (image.width <= Constants.PictureData.Width) ? image.width : Constants.PictureData.Width;
	    	$imagePreview = (<img src={imagePreviewUrl} width={width} alt="Who's this nice looking person?" />);
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