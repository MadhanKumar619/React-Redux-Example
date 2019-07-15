import React from 'react';
import CapacityContent from './CapacityContent/CapacityContent';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import {    
    updateobjStore    
  } from '../redux/actions';

import './Capacity.css';

class Capacity extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            capacityObject : {            
                capacityDetails : [
                {day : "Monday",capacity : 0,preAssigned : 0,buffer : 0,available : 0},
                {day : "Tuesday",capacity : 0,preAssigned : 0,buffer : 0,available : 0},
                {day : "Wednesday",capacity : 0,preAssigned : 0,buffer : 0,available : 0},
                {day : "Thursday",capacity : 0,preAssigned : 0,buffer : 0,available : 0},
                {day : "Friday",capacity : 0,preAssigned : 0,buffer : 0,available : 0},
                {day : "Saturday",capacity : 0,preAssigned : 0,buffer : 0,available : 0},
                {day : "Sunday",capacity : 0,preAssigned : 0,buffer : 0,available : 0}
            ]},
            capacityError  : ""   
        }         
    }    

    componentDidMount = ()=>{
        let { objStore, selectedIndex } = this.props.objStore;
        this.setState({
            capacityObject : {
                capacityDetails : objStore[selectedIndex].capacityDetails
            }
        })
    }

    componentWillReceiveProps = (props)=>{
        let { objStore,selectedIndex } = props.objStore;                
        this.setState({
            capacityObject : {
                capacityDetails : objStore[selectedIndex].capacityDetails
            }
        })
    }

    inputChangeHandler = (event, index)=>{                
        let capacityError = "";             
        let { capacityDetails } = this.state.capacityObject;
        let currentVal = parseInt(event.target.value,10);                
        capacityDetails[index][event.target.name] = isNaN(currentVal)||currentVal<0?'':currentVal;        
        let { capacity, preAssigned, buffer } = capacityDetails[index];        
        if(capacity>=preAssigned){
            capacityDetails[index]['available'] = (capacity+buffer) - preAssigned;
            capacityError = "";
        }         
        switch(event.target.name){
            case "capacity":                     
                if(capacity < preAssigned){
                    capacityDetails[index]['preAssigned'] = 0;                        
                    capacityDetails[index]['available'] = capacity + buffer;
                    capacityError = "Capacity must be greater than PreAssigned"
                }
                break;
            case "preAssigned":
                if(preAssigned > capacity){
                    capacityError = capacity===0?"Capacity must be filled":
                                                 "PreAssigned must be lesser than or equal to capacity";
                    capacityDetails[index]['preAssigned'] = 0;
                    capacityDetails[index]['available'] = capacity + buffer;
                }
                break;
            case "buffer":
                capacityDetails[index]['available'] = (capacity+buffer)-preAssigned;
                capacityError = "";
                break;
            default:
                break;
        }                        
        this.setState({capacityObject : {
            capacityDetails
        },capacityError});
    }   
    
    saveCapacity = ()=>{                                        
        let { objStore, selectedIndex } = this.props.objStore;
        objStore[selectedIndex]['capacityDetails'] = this.state.capacityObject.capacityDetails;        
        this.props.updateobjStore(objStore);        
        if(!toast.isActive(this.toastId)){
            this.toastId = toast.success(objStore[selectedIndex].city + " : Capacity data saved");  
        }                
    }

    render(){
        const demotext = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
                      +"Donec ornare sit amet lacus quis ornare. Nulla ut leo quam."
                      +"Curabitur luctus fermentum velit eu condimentum."
                      +"Etiam in lacus lobortis, iaculis tellus ut, laoreet risus...";
        return(
            <div className="capacity">                              
                <div className="capacity-head">
                    <span><b>CAPACITY MANAGEMENT</b></span>                                        
                    <p>{demotext}</p>
                </div>                
                {this.state.capacityError!==""?
                    <div className="capacity-key">
                        * {this.state.capacityError}
                    </div>:
                ""}
                <CapacityContent 
                        capacityDetails={this.props.objStore.objStore[this.props.objStore.selectedIndex]['capacityDetails']}
                        inputChangeHandler={(e,index)=>{this.inputChangeHandler(e,index)}}
                />                
                <button className="save-btn" onClick={()=>{this.saveCapacity()}}>SAVE &gt;</button>           
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
         dispatch(updateobjStore(capacityObject));           
      }
    }
  }

// const updateCapacity = capacityObject => {
//     return (dispatch) => {
//         if(capacityObject!==null){
//             dispatch(updateobjStore(capacityObject));            
//         }
//     }
// }

export default connect(mapStateToProps,mapDispatchToProps)(Capacity);