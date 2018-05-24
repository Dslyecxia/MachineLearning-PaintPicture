import React from 'react';

// Picture Module

class PaintPictureComponent extends React.Component {

	componentDidMount() {
	    const canvas = this.refs.uploaded;
	    const context = canvas.getContext('2d');
	  	let preview = new Image();
	    
	    preview.onload = function() {
			context.drawImage(preview, 0, 0);
	    }

	    preview.src = this.props.imagePreview;
	}

	  render() {

	    return (
	    	<div>
	    		<div>
	    			<canvas ref="uploaded" width="500px" height="500px"></canvas>
	    		</div>
	    		<div></div>
	    	</div>
	    );
	  }
}

export default PaintPictureComponent;
