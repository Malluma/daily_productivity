import React, {useState} from 'react'

const Intervals = () => {

    const [intervalsList, setIntervalsList] = useState('');

    function getData() {
        fetch(
        'http://localhost:3001/intervals',
        { method: 'GET' }
        )
        .then( response => response.json() )
        .then( json => setIntervalsList(json.map(interval => <div key='interval.id_'>{`user ${interval.user_id} [${interval.from_}-${interval.to_}]: ${interval.value_}`}</div>)))
        .catch( error => console.error('error', error) );
        
    }
    
    return (<div className='intervals'>
            <button className ='get' onClick={getData}>Get data</button>
            <div className='IntervalsTable'>{intervalsList}</div>
          </div>)

}

export default Intervals