import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import Section from './components/Section/Section';
import { ToastContainer } from 'react-toastify';
import { connect } from 'react-redux';

// Redux Actions
import {
  createCity,
  changeSelectedCity,
  updateobjStore,
  changeSelectedIndex
} from './components/redux/actions';

import 'react-dates/lib/css/_datepicker.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
       selectedCity : '',
       cities : [],
       objStore : []
    };            
  }
  
  componentDidMount(){                 
    this.setState({
      cities : this.props.objStore.cities,
      selectedCity : this.props.objStore.cities[0]
    })    
    this.checkCityExist(this.props.objStore.cities[0]);
  }

  componentWillReceiveProps = (props)=>{        
    this.setState({
        objStore : props.objStore.objStore
    })    
  }

  // Check City Exist Or Not In Store
  checkCityExist = (cityName)=>{                   
    let { objStore } = this.props.objStore;    
    var obj = {
        city : cityName,
        capacityDetails : [
            {day : "Monday",capacity : 0,preAssigned : 0,buffer : 0,available : 0},
            {day : "Tuesday",capacity : 0,preAssigned : 0,buffer : 0,available : 0},
            {day : "Wednesday",capacity : 0,preAssigned : 0,buffer : 0,available : 0},
            {day : "Thursday",capacity : 0,preAssigned : 0,buffer : 0,available : 0},
            {day : "Friday",capacity : 0,preAssigned : 0,buffer : 0,available : 0},
            {day : "Saturday",capacity : 0,preAssigned : 0,buffer : 0,available : 0},
            {day : "Sunday",capacity : 0,preAssigned : 0,buffer : 0,available : 0}
        ],
        holidayLists : [],
        timeSlots : []
    }   
    if(objStore.length===0){     
      this.props.createCity(obj);       
    }
    else{
      let index = this.getStoreIndex(cityName);         
      if(index===-1){        
        this.props.createCity(obj);  
      }      
      else{        
        this.props.changeSelectedIndex(index);     
        this.props.changeSelectedCity(cityName)        
      }
    }
  }

  // Getting Index of city
  getStoreIndex = (cityName)=>{                
      let { objStore} = this.state;           
      let index = -1;
      objStore.forEach((element,i)=>{          
          if(element.city === cityName){
              index = i;
          }
      })      
      return index;
  }

  // Changing selected City
  setSelectedCity = (event)=>{                    
    this.setState({selectedCity : event.target.value})    
    this.checkCityExist(event.target.value);    
  }

  render() {          
    return(      
      <div className="app">
          <ToastContainer
            autoClose={1500}            
          />          
          <div className="nav">                      
              <b className="nav-text" >View Settings For </b>
              <select onChange={this.setSelectedCity} value={this.state.selectedCity}>
                {this.state.cities.map(val=>{
                  return( 
                    <option value={val}>{val}</option>
                  )
                })}
              </select>                          
          </div>                    
            <Section/>
      </div>
    );
  }
}

const mapStateToProps = (state)=>{    
  return{
    objStore : state
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    createCity : (capacityDetails)=>{
      dispatch(createCity(capacityDetails))
    },
    updateobjStore : (capacityObject)=>{
      dispatch(updateobjStore(capacityObject))
    },
    changeSelectedCity : (cityName)=>{
      dispatch(changeSelectedCity(cityName))
    },
    changeSelectedIndex : (index)=>{
      dispatch(changeSelectedIndex(index))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(hot(App));