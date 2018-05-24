import React from 'react';
import TrainingButton from './TrainingButton';
import IterationView from './IterationView';
import {train} from '../../helpers/mlHelper';
import Constants from '../../helpers/constants';


// Picture Module

class PaintPictureComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isStarted: false,
			iteration: 0
		};

		this.toggleTraining = this.toggleTraining.bind(this);
		this.generateOutputCanvas = this.generateOutputCanvas.bind(this);
		this.updateIteration = this.updateIteration.bind(this);
	}

	toggleTraining() {
		if(!this.state.isStarted){
			this.setState({
				isStarted: !this.state.isStarted
			});

			this.generateOutputCanvas();

		}
	}

	updateIteration(val) {
			this.setState({
				iteration: val
			});
	}

	generateOutputCanvas() {
		let outputCtx = this.getCanvasCtx(this.refs.output);
		let inputImgData = this.refs.uploaded;
	  	train(outputCtx, inputImgData, this.props.imagePreview.width, this.props.imagePreview.height, this.updateIteration);
	}

	getCanvasCtx(ref){
	    const ctx = ref.getContext('2d');
		return ctx;
	}

	render() {
		const isStarted = this.state.isStarted;
		let iteration = this.state.iteration;
		let component;

		if(isStarted){
			component  = <IterationView numIterations={iteration} />
		} else {
			component  = <TrainingButton toggleTraining={this.toggleTraining} />
		}

		return (
			<div>
				<div>
					<img src={this.props.imagePreview.file} ref="uploaded" width={Constants.PictureData.Width} />
				</div>
				<div>
					<canvas ref="output" width={Constants.PictureData.Width} height={Constants.PictureData.Height}></canvas>
				</div>
				<div>
					{component}
				</div>
			</div>
		);
	}
}

export default PaintPictureComponent;
