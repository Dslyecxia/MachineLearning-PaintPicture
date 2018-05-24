import React from 'react';

class IterationView extends React.Component {
  	render() {
		return (
			<div>
				Currently on Iteration <span>{this.props.numIterations}</span> of this render.
			</div>
		);
  	}
}

export default IterationView;