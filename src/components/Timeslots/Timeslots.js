import React from 'react';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import { connect } from 'react-redux';
import {    
    updateobjStore    
  } from '../redux/actions';

import './Timeslots.css';
import 'rc-time-picker/assets/index.css';

class Timeslots extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            startTime : moment(),
            endTime : moment(moment()).add(1,'hours'),
            timeSlots : [],
            errorMsge : ""
        }        
    }

    addTime = ()=>{
        let { objStore, selectedIndex } = this.props.objStore;
        let timeSlots = objStore[selectedIndex]['timeSlots'];
        let {startTime, endTime} = this.state;       
        let duration = moment.duration(endTime.diff(startTime));        
        let errorMsge = "";
        duration = duration.asHours();        
        if(startTime.isBefore(endTime) && duration>=1 ){
            let count = 0;
            var obj = {
                startTime : moment(startTime).format("hh:mma"),
                endTime : moment(endTime).format("hh:mma")           
            }
            timeSlots.forEach((val)=>{
                if(val.startTime.toString()===obj.startTime.toString() &&
                    val.endTime.toString()===obj.endTime.toString()){
                    count++;
                }
            })
            if(count===0){            
                timeSlots.push(obj);                                            
                objStore[selectedIndex]['timeSlots'] = timeSlots;
                errorMsge = "";
            }
            else{
                errorMsge = "Time Range already exists";
            }                        
        }    
        else{
            errorMsge = "End Time must be 1 hour greater than starting time";
        }              
        this.props.updateobjStore(objStore);
        this.setState({errorMsge})
    }

    removeTime = (e,index)=>{
        let { objStore, selectedIndex } = this.props.objStore;
        let timeSlots = objStore[selectedIndex]['timeSlots'];        
        timeSlots = timeSlots.slice(0,index).concat(timeSlots.slice(index+1,timeSlots.length));
        objStore[selectedIndex]['timeSlots'] = timeSlots;
        this.props.updateobjStore(objStore);
        this.setState({timeSlots})
    }

    render(){
        const demotext = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
                      +"Donec ornare sit amet lacus quis ornare. Nulla ut leo quam." 
                      +"Curabitur luctus fermentum velit eu condimentum." 
                      +"Etiam in lacus lobortis, iaculis tellus ut, laoreet risus...";    
        return(
            <div className="time-slots">
                <h3 className="time-head"><b>TIME SLOTS</b></h3>
                <p>{demotext}</p>                                
                <div className="holiday-time">                           
                    <div className="time-start">
                        <TimePicker className="time-picker" 
                                    defaultValue={this.state.startTime} 
                                    onChange={startTime=>this.setState({startTime})}
                                    use12Hours
                                    showSecond={false}
                        />
                        <i className="fas fa-clock"></i>
                    </div>         
                    <span><b>TO</b></span>
                    <div className="time-end">
                        <TimePicker className="time-picker" 
                                    defaultValue={this.state.endTime} 
                                    onChange={endTime=>this.setState({endTime})}
                                    use12Hours
                                    showSecond={false}
                        />        
                        <i className="fas fa-clock"></i>            
                    </div>
                    <button className="add-btn" onClick={this.addTime}>Add</button>                            
                </div>
                {this.state.errorMsge!==""?
                    <div className="time-error">
                        {this.state.errorMsge}
                    </div>:""
                }
                <div className="holiday-content-times">
                        {this.props.objStore.objStore[this.props.objStore.selectedIndex].timeSlots.map((val,index)=>{
                            return(
                                <div className="content-time" key={index}>
                                    {val.startTime} To {val.endTime}
                                    <i className="fas fa-times" onClick={(e)=>{this.removeTime(e,index)}}></i>                                    
                                </div>                                                                  
                            )
                        })}
                </div> 
            </div>
        )
    }
}


const mapStateToProps = (state)=>{
    return{
      objStore : state
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return{      
      updateobjStore : (capacityObject)=>{
        dispatch(updateobjStore(capacityObject))
      }
    }
  }
  
export default connect(mapStateToProps,mapDispatchToProps)(Timeslots);
