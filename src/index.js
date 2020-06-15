import React from 'react';
import ReactDOM from 'react-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './drawingApp.css';
import DrawingApp from './DrawingApp';

import * as serviceWorker from './serviceWorker';




class APP extends React.Component{


  render(){


    return(
      <div>
        <DrawingApp />

      </div>
    )

  }
}





ReactDOM.render(
  <APP />
  , document.getElementById('root'));

  



serviceWorker.unregister();
