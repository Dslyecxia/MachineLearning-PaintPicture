import React from 'react';
import LoadPictureView from './LoadPictureView';

// Picture Module

class TakeAPictureComponent extends React.Component {
  render() {
    return (
    	<div>
    		<div>
    			<LoadPictureView />
    		</div>
    	</div>
    );
  }
}

export default TakeAPictureComponent;
