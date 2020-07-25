import React from "react";
 
function Document({doc}) {
  return (  
    doc 
     ? 
       <textarea id="docForm" type="text" defaultValue={doc.text}/>
     : 
     <h2>Выберите и откройте документ или письмо</h2> 
  )
}

export default Document;
