import React from 'react';

class TrainingButton extends React.Component {
  	render() {
		return (
			<div>
				<button onClick={this.props.toggleTraining.bind(this)}>
					Draw me like one of your french girls
				</button>
			</div>
		);
  	}
}

export default TrainingButton;