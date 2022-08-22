import React from 'react';
const List=(props)=> {
    const {items,textProperty,valueProperty,onItemSelect,selectedItem}=props;
        return (
        <ul className="list-group">
            {items.map(item=>(
                <li onClick={()=>onItemSelect(item)} 
                    className={item===selectedItem ?"list-group-item active" : "list-group-item"} 
                    key={item[valueProperty]}>{item[textProperty]}
                </li>
            ))}      
      </ul>); 
}
List.defaultProps={
    valueProperty:'_id',
    textProperty:'name'
 };
export default List;