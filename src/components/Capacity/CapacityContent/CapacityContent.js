import React from 'react';

class CapacityContent extends React.Component{
    render(){
        return(
            <table>
                    <thead>
                      <tr>                        
                        {Object.keys(this.props.capacityDetails[0]).map((value,index)=>{
                            return(
                                <th key={index}>{value} <i className="fas fa-info-circle" title={value}></i></th>
                            )
                        })}
                      </tr>
                    </thead>
                    <tbody>                        
                        {this.props.capacityDetails.map((value, index)=>{
                            return(
                                <tr key={index}>
                                    <td>{value.day}</td>    
                                    <td>
                                        <input type="number" min="0" 
                                               value={value.capacity}                                                
                                               name="capacity"                                               
                                               onChange={(e)=>{this.props.inputChangeHandler(e,index)}}  
                                        />
                                    </td>
                                    <td>
                                        <input type="number" 
                                               min="0" 
                                               value={value.preAssigned} 
                                               name="preAssigned"                                                
                                               onChange={(e)=>{this.props.inputChangeHandler(e,index)}} 
                                        />
                                    </td>
                                    <td>
                                        <input type="number" 
                                               min="0" 
                                               value={value.buffer} 
                                               name="buffer"                                                
                                               onChange={(e)=>{this.props.inputChangeHandler(e,index)}}
                                        />
                                    </td>
                                    <td>{value.available}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
        )
    }
}

export default CapacityContent;