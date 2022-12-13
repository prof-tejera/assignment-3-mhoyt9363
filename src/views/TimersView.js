import React, {useContext} from "react";
import { AppContext } from "../components/generic/Context";
import TimerPrep from "../components/timers/TimerPrep";
import styled from "styled-components";
import ProgressBar from "../components/timers/ProgressBar";
import updateURL from "../utils/useUpdateURL";

//------------------------------------------
// This view is the page that will display
// the sequence of timers (i.e. the workout)
// and will track work effort
//------------------------------------------
const Container = styled.div`
  margin: 30px;
  display: inline;
  padding: 10px;
  width: fit-content;
`;

const ButtonStyle = styled.button`
padding: 5px;
margin: 2px;
display: inline;
border: 1px solid black;
text-align: center;
font-size: 13px;
background-color: lightgray;
`;


const TimersView = () => {
  const { queue, url, time, totTime, paused, togglePaused, reset } = useContext(AppContext);

  // update url 
  updateURL(url, queue);

  if (queue.length === 0) {
    return <Container>Add a timer to start building a workout!</Container>
  }

  return (
    <div>
      <Container >
        <ButtonStyle 
          onClick={() => {
            togglePaused();
          }}
        >
          {paused ? 'Run' : 'Pause'}
        </ButtonStyle>
        <ButtonStyle onClick={reset}>Reset</ButtonStyle>

        <ProgressBar finalTotTime={totTime} time = {time} />

      </Container>

      <div>
        {queue.map((t, i) => (
          <TimerPrep key={i} index={i} duration={t.duration} />
        ))}
      </div>

    </div>
  );
};

export default TimersView;
