import ExternalConstants from './constants';
import { Architect } from 'synaptic';

let Constants = {
	...ExternalConstants,
	PictureData: {
		Width: 0,
		Height: 0,
		Format: "image/png"
	}
}

function getData(inputImgData, outputCtx){
	outputCtx.drawImage(inputImgData, 0, 0);

	var imageData = outputCtx.getImageData(0, 0, Constants.PictureData.Width, Constants.PictureData.Height);
	return imageData.data;
}

function preview(iteration, outputCtx, inputImgData, spiriaTron, updateIteration, outputData){
	iteration++;
	updateIteration(iteration);
	let outputImageData = outputCtx.getImageData(0, 0, Constants.PictureData.Width, Constants.PictureData.Height);

	for (let x = 0; x < Constants.PictureData.Width; x++){
		for(let y = 0; y < Constants.PictureData.Height; y++){
			let rgb = spiriaTron.activate([x/Constants.PictureData.Width, y/Constants.PictureData.Height]);
			outputImageData.data[((Constants.PictureData.Width * y) + x) * 4] = Math.ceil((rgb[0] )* 255);
			outputImageData.data[((Constants.PictureData.Width * y) + x) * 4 + 1] = Math.ceil((rgb[1] ) * 255);
			outputImageData.data[((Constants.PictureData.Width * y) + x) * 4 + 2] = Math.ceil((rgb[2] ) * 255);
		}
	}
	outputCtx.putImageData(outputImageData,0,0);
	requestAnimationFrame(()=>{
		iterate(iteration, outputCtx, inputImgData, spiriaTron, updateIteration, outputData);
	});
}

function iterate(iteration, outputCtx, inputImgData, spiriaTron, updateIteration, output){
	for (let x = 0; x < Constants.PictureData.Width; x+=1){
		for(let y = 0; y < Constants.PictureData.Height; y+=1){
			let dynamicRate =  .01/(1+.0005*iteration);
			spiriaTron.activate([x/Constants.PictureData.Width,y/Constants.PictureData.Height]);
			spiriaTron.propagate(dynamicRate, pixel(output, x, y));
		}
	}

	preview(iteration, outputCtx, inputImgData, spiriaTron, updateIteration, output);
}

function pixel(data,x,y){
	var red = data[((Constants.PictureData.Width * y) + x) * 4];
    var green = data[((Constants.PictureData.Width * y) + x) * 4 + 1];
    var blue = data[((Constants.PictureData.Width * y) + x) * 4 + 2];

    return [red / 255, green / 255, blue / 255];
}

export function train(outputCtx, inputImgData,  imageTrueWidth, imageTrueHeight, updateIteration){
	Constants.PictureData.Width = imageTrueWidth;
	Constants.PictureData.Height = imageTrueHeight;
	const spiriaTron = new Architect.Perceptron(Constants.Machine.NumInputLayers, Constants.Machine.NumHiddenLayers, Constants.Machine.NumOutputLayers);
	let iteration = 0;
	let outputData = getData(inputImgData, outputCtx);
	preview(iteration, outputCtx, inputImgData, spiriaTron, updateIteration, outputData);
}