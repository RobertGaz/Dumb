import React from "react";
 
function MenuItem({item, onChg}) {

    return (
        <li className="tree">
                <button onClick={() => onChg(item.key)}>
                    {item.label}
                </button>
        </li>
    )
}

export default MenuItem