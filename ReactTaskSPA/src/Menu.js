import React from "react";
import MenuItem from "./MenuItem"

function Menu({items, onChg}) {
  return (
    <ul>
        {items.map(item => {
            return <MenuItem item={item} onChg = {onChg} key={item.key}/>
        })}
    </ul>
  )
}

export default Menu;
