import React, { createContext, useState } from 'react'


// create context addResponse
export const addResponseContext=createContext()
export const editResponseContext=createContext()
function ContextShare({children}) {
    const [addUpdate,setAddUpdate]=useState([])
    const [editUpdate,setEditUpdate]=useState([])

  return (
    <>
<addResponseContext.Provider value={{addUpdate,setAddUpdate}}>
  
<editResponseContext.Provider value={{editUpdate,setEditUpdate}}>
      {children}
  
</editResponseContext.Provider></addResponseContext.Provider>
    </>  
  );
}

export default ContextShare