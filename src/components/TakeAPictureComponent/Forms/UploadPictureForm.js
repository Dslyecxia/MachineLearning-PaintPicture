import React from 'react';

class UploadPictureForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {file: '',imagePreviewUrl: ''};
	}

	_handleImageChange(e) {
		e.preventDefault();

		let reader = new FileReader();
		let file = e.target.files[0];

		reader.onloadend = () => {
		  	this.setState({
		    	file: file,
		    	imagePreviewUrl: reader.result
		  	});
		}

		reader.readAsDataURL(file)
	}

  	render() {
  		let {imagePreviewUrl} = this.state;
	    let $imagePreview = null;
	    if (imagePreviewUrl) {
	    	$imagePreview = (<img src={imagePreviewUrl} height="200" alt="Who's this nice looking guy?" />);
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
						onClick={this.props.setImage.bind(this, this.state.imagePreviewUrl)}>Upload Image</button>
				</form>
				<div className="imgPreview">
					{$imagePreview}
				</div>
			</div>
		);
  	}
}

export default UploadPictureForm;