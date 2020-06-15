import React from 'react';

class DrawingApp extends React.Component {

    state = {
        isMouseDown :false,   //for canvas lines
        selected : '0',        //selected li color
        colors : ['0','1','2'],   //esme rang ha
        open:false,   //for add color box
        open2:false,  //for change stroke box
		valueR: 0 ,
		valueG:0,
		valueB:0,
        num : 2    ,
        CurrentColor : (0,0,0),
        rgbColors:['rgb(0,0,0)','darksalmon','dimgray'],    //khode rang ha
        defaultStroke: '0' ,

        
    }

 
    mouseMove = (e) =>{

        const ctx = this.refs.canvas.getContext('2d');
        if(this.isMouseDown){
        ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        ctx.stroke();

    }
    }



    mouseDown = (e) => {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);

        ctx.beginPath();
        this.isMouseDown = true;
        
    }

    addSelectedClass =(e)=>{        
        const clicked = e.target.id;
        if(this.state.selected === clicked) { 
            this.setState({selected: ''});
        } else {
            this.setState({selected: clicked})

       }
       const ctx = this.refs.canvas.getContext('2d');

       ctx.strokeStyle = this.state.rgbColors[e.target.id.replace(/\D/g, "")]

    }


    revealColorSelectBox =() =>{
		this.setState({
			open: !this.state.open,

        })


    }
    
    revealChangeStrokeBox = () => {
        this.setState({
			open2: !this.state.open2,

		})

    }


    strokeSlider = (e) =>{
        // console.log(e.target.value);
        // console.log(this.state.defaultStroke)



        this.setState(  {
            defaultStroke : e.target.value,


        })
        const ctx = this.refs.canvas.getContext('2d');
        ctx.lineWidth = e.target.value;

    }

	colorSlider = (e) =>{

		if (e.target.id==='blue'){
			this.setState({
				
                valueB  :e.target.value
				
			});
		}
		if (e.target.id==='green'){
			this.setState({
				valueG: e.target.value
			});
		}
		if (e.target.id==='red'){
			this.setState({
				valueR: e.target.value
				
			});
        }

        this.setState(prevState =>{
            
                prevState.CurrentColor = 'rgb('+this.state.valueR+','+this.state.valueG+','+this.state.valueB+')';
            }
        )
		return('rgb('+this.state.valueR+','+this.state.valueG+','+this.state.valueB+')')

	}



    addNewColor = (e) => {
        this.setState(prevState => {
            let TheList = prevState.colors;



            if(this.state.rgbColors.indexOf(prevState.CurrentColor) === -1) {
                prevState.num = this.state.num+1;
                TheList.push('s'+this.state.num);
                prevState.rgbColors.push(prevState.CurrentColor);
                console.log(prevState.CurrentColor)

              }

            
            // prevState.num = this.state.num+1;
            // TheList.push('s'+this.state.num);
            // prevState.rgbColors.push(prevState.CurrentColor);




             return {
              colors: TheList,
                 }
          });


    }


    handleOutSideClick =(e)=>{

                if (e.target.type === undefined )
                {
                    this.setState({open: false,open2:false});

            }

    
        
    }

    clear = () => {
        const ctx = this.refs.canvas.getContext('2d');

        ctx.clearRect(0, 0, 600, 400);
    }
   


    render() {
        return (
            <div onClick={this.handleOutSideClick}>
            <canvas ref="canvas" width={600} height={400} onMouseDown={this.mouseDown} onMouseMove={this.mouseMove.bind(this) } onMouseUp={()=>{this.isMouseDown=false;}} />
            


            <ul className='colorSelectContainer'>
        {
            this.state.colors.map( (item, index) =>{
                return (
                  <div key={index} style={{display:'inline'}}> 
                    <li className={` ${item}  ${this.state.selected === item ? 'selected': ''} `}   id={item} onClick={this.addSelectedClass}  style={{backgroundColor:this.state.rgbColors[index]}}></li>
                  </div>

                )
            })
    }
    </ul>



    <div>



<button id="revealColorSelect" onClick={this.revealColorSelectBox}>New Color</button>
{ this.state.open && (
    
    <div id="colorSelect">
    <span id="newColor" style={{backgroundColor:'rgb('+this.state.valueR+','+this.state.valueG+','+this.state.valueB+')'}}></span>
    <div className="sliders sliders-input">
        <p>
            {/* <label for="red">Red</label> */}
            <input id="red" name="red" type="range" min='0' max='255' defaultValue={this.state.valueR} onClick={this.colorSlider} onChange={this.colorSlider} /><span id="show-red"></span>
        </p>
        <p>
            {/* <label for="green">Green</label> */}
            <input id="green" name="green" type="range" min='0' max='255' defaultValue={this.state.valueG} onClick={this.colorSlider} onChange={this.colorSlider} />
        </p>
        <p>
            {/* <label for="blue">Blue</label> */}
            <input id="blue" name="blue" type="range" min='0' max='255' defaultValue={this.state.valueB} onClick={this.colorSlider} onChange={this.colorSlider}  />
        </p>
    </div>
    <div>
    <button id="addNewColor" onClick={this.addNewColor.bind(this)} >Add Color </button>
    </div>

</div>

)}


</div>


<div>
    <button id="revealColorSelect" onClick={this.revealChangeStrokeBox} >changeStroke </button>
    { this.state.open2 && (
        <div id="colorSelect" style ={{height:'60px'}}>
        <span id="" style={{marginLeft:'30px', marginRight:'56px',fontSize:'30px'}}>#{this.state.defaultStroke}</span>
            <input id="" name="" type="range" min='0' max='45' defaultValue={this.state.defaultStroke}  onChange={this.strokeSlider} step="1" />
        </div>
    )
    }
</div>


<button id="revealColorSelect" onClick={this.clear} >reset </button>


            </div>
        );
    }
}




export default DrawingApp;
















