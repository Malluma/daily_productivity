import React from 'react';
import { getDateStr } from '../utils/utils.js'
import { useSelector, useDispatch } from 'react-redux'
import { clearMarkedIntervals, addUpdatedIntervalsToState } from '../store/actions';
import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';

function SetInterval() {

	let intervalsForUpdate = useSelector(state => state.markedIntervals)
	const dispatch = useDispatch()

	function createNewInterval(activityType) {

		let body = [];
		for (let day in intervalsForUpdate) {

			intervalsForUpdate[day].forEach((i) => {
				const minutesFrom = (i - 1) * 30;
				body.push({
					value_: activityType,
					from_: getDateStr(day, minutesFrom),
					to_: getDateStr(day, minutesFrom + 30),
					user_id: '000001',
				})
			})
		}

		fetch('http://localhost:3001/intervals', {
			method: 'POST',
			headers: new Headers({
				Accept: 'application/json',
				'Content-Type': 'application/json',
			}),
			body: JSON.stringify(body),
		})
			.then((response) => response.json())
			.then((json) => console.log(json))
			.catch((error) => console.error('error', error));
		
		//dispatch(addUpdatedIntervalsToState())
		dispatch(clearMarkedIntervals())
	}

	return (
		<div className="setInterval">
			<div className="title">Daily Productivity</div>
			<div className="datetime">21.08.2020 11:30 - 12:00</div>
			<button className="btn btnActions work" onClick={() => createNewInterval('work')}>
				WORK
			</button>
			<button className="btn btnActions mentorship" onClick={() => createNewInterval('mentorship')}>MENTORSHIP</button>
			<button className="btn btnActions study" onClick={() => createNewInterval('study')}>STUDY</button>
			<button className="btn btnActions eat" onClick={() => createNewInterval('eat')}>EAT</button>
			<button className="btn btnActions routine" onClick={() => createNewInterval('routine')}>ROUTINE</button>
			<button className="btn btnActions idle" onClick={() => createNewInterval('idle')}>IDLE</button>
			<button className="btn btnActions games-series" onClick={() => createNewInterval('games-series')}>GAMES, SERIES</button>
			<button className="btn btnActions hobby" onClick={() => createNewInterval('hobby')}>HOBBY</button>
			<button className="btn btnActions sport" onClick={() => createNewInterval('sport')}>SPORT</button>
			<button className="btn btnActions walk" onClick={() => createNewInterval('walk')}>WALK</button>
			<button className="btn btnActions communicate" onClick={() => createNewInterval('communicate')}>COMMUNICATE</button>
			<button className="btn btnActions sleep" onClick={() => createNewInterval('sleep')}>SLEEP</button>
		</div>
	);
}

export default SetInterval;
