import React from 'react';
import { SingleDatePicker } from 'react-dates'; 
import moment from 'moment';
import { connect } from 'react-redux';
import {    
    updateobjStore    
  } from '../redux/actions';
import './Holiday.css';

class Holiday extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            date : moment(),            
            focused : false,            
            errorMsge : ""        
        }        
    }

    addDate = ()=>{
        let { objStore, selectedIndex } = this.props.objStore;        
        let holidayDates = objStore[selectedIndex].holidayLists;        
        let date = this.state.date.format("D MMM YYYY");         
        let {errorMsge} = this.state;       
        if(holidayDates.indexOf(date)===-1){
            holidayDates.push(date);               
            objStore[selectedIndex]['holidayLists'] = holidayDates;
            errorMsge = "";
        }             
        else{
            errorMsge = date +" already exist";
        }
        this.props.updateobjStore(objStore);
        this.setState({errorMsge})
    }

    removeDate = (e,val)=>{
        let { objStore, selectedIndex } = this.props.objStore;
        let holidayDates = objStore[selectedIndex].holidayLists;        
        holidayDates = holidayDates.filter((value)=>{
            return value!==val
        })                        
        objStore[selectedIndex]['holidayLists'] = holidayDates;
        this.props.updateobjStore(objStore);        
    }
    

    render(){
        const demotext = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
                      +"Donec ornare sit amet lacus quis ornare. Nulla ut leo quam." 
                      +"Curabitur luctus fermentum velit eu condimentum." 
                      +"Etiam in lacus lobortis, iaculis tellus ut, laoreet risus...";    
        return(
            <div className="holiday">                        
                <div className="holiday-head">
                    <span><b>HOLIDAY LIST:</b></span>                    
                    <p>{demotext}</p>
                </div>                                
                <div className="holiday-content">                
                    <SingleDatePicker
                        date={this.state.date} 
                        onDateChange={date => this.setState({ date })}
                        focused={this.state.focused}
                        onFocusChange={({ focused }) => this.setState({ focused })} 
                        numberOfMonths ={1}
                        showDefaultInputIcon
                        inputIconPosition="after"  
                        hideKeyboardShortcutsPanel
                        displayFormat="D MMM YYYY"
                    />
                    <button className="add-btn" onClick={this.addDate}>Add</button>
                    {this.state.errorMsge!==""?
                        <div className="day-error">
                            {this.state.errorMsge}
                        </div>:""
                    }
                    <div className="holiday-content-dates">
                        {this.props.objStore.objStore[this.props.objStore.selectedIndex].holidayLists.map((val,index)=>{
                            return(
                                <div className="content-date" key={index}>
                                    {val}
                                    <i className="fas fa-times" onClick={(e)=>{this.removeDate(e,val)}}></i>
                                </div>
                            )
                        })}
                    </div>                                        
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
  
export default connect(mapStateToProps,mapDispatchToProps)(Holiday);
