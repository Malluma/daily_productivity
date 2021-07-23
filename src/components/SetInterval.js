import React from 'react';

function SetInterval(props) {

  function createNewInterval() {

    const body = JSON.stringify({
      value_: 'work',
      from_: '2021-07-15%10:00:00',
      to_: '2021-07-15%10:30:00',
      user_id: '000001'
    })

    console.log('BODY!!!!')
    console.log(body)

    fetch('http://localhost:3001/intervals',
      {
        method: 'POST',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }),
        body: body
      })
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(error => console.error('error', error))

  }

  return (
    <div className='setInterval'>
      <div className='title'>Daily Productivity</div>
      <div className='datetime'>21.08.2020   11:30 - 12:00</div>
      <button className='btn btnActions work' onClick={createNewInterval}>WORK</button>
      <button className='btn btnActions mentorship'>MENTORSHIP</button>
      <button className='btn btnActions study'>STUDY</button>
      <button className='btn btnActions eat'>EAT</button>
      <button className='btn btnActions routine'>ROUTINE</button>
      <button className='btn btnActions idle'>IDLE</button>
      <button className='btn btnActions games-series'>GAMES, SERIES</button>
      <button className='btn btnActions hobby'>HOBBY</button>
      <button className='btn btnActions sport'>SPORT</button>
      <button className='btn btnActions walk'>WALK</button>
      <button className='btn btnActions communicate'>COMMUNICATE</button>
      <button className='btn btnActions sleep'>SLEEP</button>
    </div>
  );
}

export default SetInterval;