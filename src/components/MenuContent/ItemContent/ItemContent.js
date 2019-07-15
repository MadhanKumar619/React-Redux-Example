import React from 'react';

class ItemContent extends React.Component{
    render(){
        return(
            <li className={this.props.activeMenu===this.props.val?"active":""} 
                title={this.props.val} 
                key={this.props.index} 
                onClick={()=>{this.props.toggleActive(this.props.val)}}
            >
                <span className="nav-menu-text">{this.props.title}</span>
                <i className={"fas " + 
                             (this.props.title==="Capacity"?"fa-warehouse":
                              this.props.title==="HolidayList"?"fa-snowman":
                              this.props.title==="TimeSlots"?"fa-user-clock":"")
                              +" fa-lg"}
                ></i>                                        
            </li>
        )
    }
}

export default ItemContent;