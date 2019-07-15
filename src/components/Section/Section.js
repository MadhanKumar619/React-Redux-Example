import React from 'react';
import MenuContent from '../MenuContent/MenuContent';
import SectionContent from '../SectionContent/SectionContent';
import { connect } from 'react-redux';
import {
  createCity,
  changeSelectedCity,
  updateobjStore,
  changeSelectedIndex
} from '../redux/actions';

import './Section.css';

class Section extends React.Component{
    constructor(props) {
        super(props);
        this.state = {           
            activeMenu : '',
            selectedCity : '',
            isExpanded : false,
            menuList : []
        };        
    }  

    componentDidMount = ()=>{        
        let { objStore } = this.props;
        this.setState({
            activeMenu : objStore.menuList[0],
            selectedCity : objStore.selectedCity,
            menuList : objStore.menuList         
        })
    }

    componentWillReceiveProps = (props)=>{
        this.setState({
            menuList : props.objStore.menuList
        })
    }

    toggleActive = (activeMenu)=>{
        this.setState({activeMenu});
    }
    
    toggleNavbar = ()=>{    
        this.setState({isExpanded:!this.state.isExpanded});
    }

    render(){                      
        return(
            <div className="section">                   
                    <div className={(this.state.isExpanded?"section-nav-expand":"section-nav")}>
                        <div className="section-nav-content">
                            <i className={"fas " + (this.state.isExpanded?"fa-times expand":"fa-bars")} 
                               onClick={()=>{this.toggleNavbar()}}></i>
                            <div className="nav-content-menus">
                                <MenuContent menuList = {this.state.menuList}
                                             toggleActive={this.toggleActive}
                                             activeMenu = {this.state.activeMenu}
                                />
                            </div>
                        </div>                                     
                    </div>    
                    <div className="section-main-content"> 
                        <SectionContent activeItem={this.state.activeMenu}/>
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
  
export default connect(mapStateToProps,mapDispatchToProps)(Section);