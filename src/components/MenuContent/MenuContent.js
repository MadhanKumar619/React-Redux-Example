import React from 'react';
import ItemContent from './ItemContent/ItemContent';

import './MenuContent.css';

class MenuContent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            activeMenu : this.props.activeMenu!==undefined?this.props.activeMenu:""
        }        
    }

    componentDidMount(){        
        this.setState({
            activeMenu : this.props.activeMenu
        })
    }

    render(){
        return(
            <div className="menu-content">
                <ul>                
                    {this.props.menuList.length>0?
                            this.props.menuList.map((val,index) =>{
                                return(
                                    <ItemContent activeMenu={this.props.activeMenu}
                                                 title={val}
                                                 val={val}
                                                 index={index}
                                                 toggleActive={(val)=>{this.props.toggleActive(val)}}
                                    />                          
                                )
                            })
                        :""
                    }                
               </ul>
            </div>
        )
    }
}

export default MenuContent;