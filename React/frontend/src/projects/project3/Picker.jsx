import React from 'react'

function Picker() {
  return (
    <div>
        <div className="h-[200px]  w-[200px] bg-red-200 border-green" >

        </div>
        <label htmlFor="">Red</label>
        <input type="range" max={255} min={0} defaultValue={0}/>
        <label htmlFor="">Green</label>
        <input type="range" max={255} min={0} defaultValue={0}/>
        <label htmlFor="">blue</label>
        <input type="range" max={255} min={0} defaultValue={0}/>
    </div>
  )
}

export default Picker