import React, {useState, useEffect} from 'react'

function Simple({returnToTimeLine}){

	let [num, setNum] = useState(0)

	useEffect(() => {
		console.log('useEffect')
		console.log(num)
		returnToTimeLine(num)
	}, [num]) 

	return (<div className='simple' onClick={()=>{setNum(num++)}}>{num}</div>)  
																								 
}

export default Simple