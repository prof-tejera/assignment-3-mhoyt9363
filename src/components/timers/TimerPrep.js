import { useContext } from 'react';
import { AppContext } from '../generic/Context';
import { Link } from 'react-router-dom';
import { PATHS } from '../../utils/constants';
import Stopwatch from './Stopwatch';
import Countdown from './Countdown';
import XY from './XY';
import Tabata from './Tabata';
import styled from 'styled-components';
import TimerButton from '../generic/TimerButton';
import PropTypes from 'prop-types';

const TimerContainer = styled.div`
  border: 1px solid black;
  padding: 20px;
  margin: 10px;
  height: 125px;
  width: 250px;
  text-align: center;
`;

const TitleStyle = styled.div`
text-align: center;
padding-bottom: 3px;
font-size: 1.5rem;
`;

const NotesStyle = styled.div`
text-align: left;
padding-bottom: 3px;
font-size: 0.8rem;
`;
//----------------------------------------------
// This component figures out the position of the 
// workout relative to the timer sequence and
// then renders the appropriate timer type.
//----------------------------------------------

const TimerPrep = ({ index }) => {
  const { time, queue, removeItem, fastForward, paused, moveTimerUp, moveTimerDown} = useContext(AppContext);

  TimerPrep.propTypes = {
    index: PropTypes.number,
  }

  // Calculate total duration from timers before this one
  const timeBefore = queue.reduce((acc, curr, i) => {
    if (i < index) {
      return curr.duration + acc;
    } else {
      return acc;
    }
  }, 0);
  
  // This timer is active if the current time is between the sum of
  // all previous and the duration of this one
  const active = time >= timeBefore && time < timeBefore + queue[index].duration;

  // determine which type of timer component to use and setup parameters
  let timer='';
  switch (queue[index].type) {
    case 'Tabata':
      timer=<Tabata index={index} rounds = {queue[index].rounds} work = { queue[index].work } rest = { queue[index].rest } progress={active &&  time - timeBefore }/>
      break;
    case 'Stopwatch':
      timer=<Stopwatch index={index} duration={queue[index].duration} progress={active && time - timeBefore} />;
      break;
    case 'Countdown':
      timer=<Countdown index={index} duration={queue[index].duration} progress={active &&  (queue[index].duration + timeBefore) - time}/> ;
      break;
    case 'XY':
      timer=<XY index={index} rounds = {queue[index].rounds} work = { queue[index].work } progress={active &&  time - timeBefore }/> ;
      break;
    default:
      console.log(`Error with timer input ${queue[index].type}`);
    }

  // determine which buttons to use based on position in the queue
  let timerButtons='';
  if (queue.length === 1) {               // only one timer
    timerButtons = <div>
    <TimerButton index={index} clkAction={removeItem} label="Remove"/>
    <TimerButton index={index} clkAction={fastForward} label="FF"/>
    </div>      
  } else {
    switch (index) {
      case 0:                             // first timer
        timerButtons = <div>
        <TimerButton index={index} clkAction={removeItem} label="Remove"/>
        <TimerButton index={index} clkAction={fastForward} label="FF"/>
        <TimerButton index={index} clkAction={moveTimerDown} label="Down"/>
        </div>      
        break;
      case queue.length - 1:              // last timer
        timerButtons = <div>
        <TimerButton index={index} clkAction={removeItem} label="Remove"/>
        <TimerButton index={index} clkAction={fastForward} label="FF"/>
        <TimerButton index={index} clkAction={moveTimerUp} label="Up"/>
        </div>
        break;
      default:                            // middle timers
        timerButtons = <div>
        <TimerButton index={index} clkAction={removeItem} label="Remove"/>
        <TimerButton index={index} clkAction={fastForward} label="FF"/>
        <TimerButton index={index} clkAction={moveTimerUp} label="Up"/>
        <TimerButton index={index} clkAction={moveTimerDown} label="Down"/>
        </div>
      }
  }

  return (
    <TimerContainer
      style={{
        backgroundColor: active ? 'lightgreen' : 'white',
        color: (active && paused) ? 'yellow' : '',
      }}
    >
      <TitleStyle>
        <Link to={PATHS.EDITTIMER({index: index})}>{ queue[index].type }</Link>
      </TitleStyle>
      {timer}
      <NotesStyle>
        {(active ? queue[index].notes : '')}
      </NotesStyle>
      {timerButtons}
    </TimerContainer>
  );
};

export default TimerPrep;