import React from 'react';
import Constants from '../../../helpers/constants';

class PictureTypeForm extends React.Component {
  	render() {
		return (
			<div>
				<button onClick={this.props.setComponent.bind(this, Constants.PictureComponent.Webcam)}>
					Webcam
				</button>
				<button onClick={this.props.setComponent.bind(this, Constants.PictureComponent.Picture)}>
					Upload
				</button>
			</div>
		);
  	}
}

export default PictureTypeForm;