import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../components/generic/Context";
import styled from "styled-components";

//------------------------------------------
// This component will 
//------------------------------------------

const EditTimerContainer = styled.div`
  border: 1px solid black;
  padding: 20px;
  margin: 10px;
  height: 400px;
  width: 250px;
  font-size: 1rem;
  text-align: center;
`;

const RadioStyle = styled.div`
  text-align: center;
  display: inline;
`;

const InnerEditTimerView = ({ index, timer }) => {
  const { updateItem } = useContext(AppContext);

  //keep the state of user input fields until they're done
  const [timerType, setTimerType] = useState(timer.type);
  const [work, setWork] = useState(timer.work);
  const [rounds, setRounds] = useState(timer.rounds);
  const [rest, setRest] = useState(timer.rest);
  const [notes, setNotes] = useState(timer.notes);

  // setup the input field options between a) work seconds b) num of rounds
  // and c) rest seconds

  let timerInputs = "";

  const workInput = (
    <div>
      <label for="work">Work (sec 1-999): </label>
      <input
        type="number"
        id="work"
        name="work"
        min={1}
        max={999}
        value={work}
        onChange={(e) => setWork(parseInt(e.target.value))}
      />
      <div>
        <label for="notes">Enter notes: </label>
        <textarea
          id="notes"
          name="notes"
          rows="2"
          cols="30"
          maxLength={99}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
    </div>
  );
  const roundInput = (
    <div>
      <label for="work">Work (sec 1-999): </label>
      <input
        type="number"
        id="work"
        name="work"
        min={1}
        max={999}
        value={work}
        onChange={(e) => setWork(parseInt(e.target.value))}
      />
      <div>
        <label for="rd">Rounds (1-99): </label>
        <input
          type="number"
          id="rd"
          name="rd"
          min="1"
          max="99"
          value={rounds}
          onChange={(e) => setRounds(parseInt(e.target.value))}
        />
      </div>
      <div>
        <label for="notes">Enter notes: </label>
        <textarea
          id="notes"
          name="notes"
          rows="2"
          cols="30"
          maxLength={99}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
    </div>
  );
  const restInput = (
    <div>
      <div>
        <label for="work">Work (sec 1-999): </label>
        <input
          type="number"
          id="work"
          name="work"
          min="1"
          max="999"
          value={work}
          onChange={(e) => setWork(parseInt(e.target.value))}
        />
      </div>
      <div>
        <label for="rest">Rest (sec 1-999): </label>
        <input
          type="number"
          id="rest"
          name="rest"
          min="1"
          max="999"
          value={rest}
          onChange={(e) => setRest(parseInt(e.target.value))}
        />
      </div>
      <div>
        <label for="rd">Rounds (1-99): </label>
        <input
          type="number"
          id="rd"
          name="rd"
          min="1"
          max="99"
          value={rounds}
          onChange={(e) => setRounds(parseInt(e.target.value))}
        />
      </div>
      <div>
        <label for="notes">Enter notes: </label>
        <textarea
          id="notes"
          name="notes"
          rows="2"
          cols="30"
          maxLength={99}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
    </div>
  );

  // determine what input fields to display
  if (timerType === "Stopwatch" || timerType === "Countdown") {
    timerInputs = workInput;
  } else if (timerType === "XY") {
    timerInputs = roundInput;
  } else if (timerType === "Tabata") {
    timerInputs = restInput;
  } else timerInputs = <div>Please start editing</div>;

  return (
    <EditTimerContainer>
      <h4>Edit Timer</h4>
      <fieldset>
        <legend> What type? </legend>

        <RadioStyle>
          <input
            type="radio"
            id="Stopwatch"
            name="newtimer"
            value="Stopwatch"
            checked={timerType === "Stopwatch"}
            onChange={(e) => setTimerType(e.target.value)}
          />
          <label for="Stopwatch">Stopwatch</label>

          <input
            type="radio"
            id="Countdown"
            name="newtimer"
            value="Countdown"
            checked={timerType === "Countdown"}
            onChange={(e) => setTimerType(e.target.value)}
          />
          <label for="Countdown">Countdown</label>

          <input
            type="radio"
            id="XY"
            name="newtimer"
            value="XY"
            checked={timerType === "XY"}
            onChange={(e) => setTimerType(e.target.value)}
          />
          <label for="XY">XY</label>

          <input
            type="radio"
            id="Tabata"
            name="newtimer"
            value="Tabata"
            checked={timerType === "Tabata"}
            onChange={(e) => setTimerType(e.target.value)}
          />
          <label for="Tabata">Tabata</label>
        </RadioStyle>
      </fieldset>

      {timerInputs}

      <button
        onClick={() => {
          let item = {};
          let timeDuration = 0;

          if (timerType === "Stopwatch" || timerType === "Countdown") {
            item = { 
              type: timerType, 
              work: work, 
              duration: work, 
              notes: notes,
            };
          } else if (timerType === "XY") {
            timeDuration = work * rounds;
            item = {
              type: timerType,
              work: work,
              rounds: rounds,
              duration: timeDuration,
              notes: notes,
            };
          } else if (timerType === "Tabata") {
            timeDuration = (work + rest) * rounds;
            item = {
              type: timerType,
              work: work,
              rest: rest,
              rounds: rounds,
              duration: timeDuration,
              notes: notes,
            };
          }

          
          updateItem(item, Number(index));
          // setTimerType("");
        }}
      >
        Save
      </button>
    </EditTimerContainer>
  );
};

const EditTimerView = () => {
  const { index } = useParams();
  const { queue } = useContext(AppContext);

  const timerToEdit = queue[index];
  return (
  <div>
  <InnerEditTimerView index = {index} timer = {timerToEdit}/>
  </div>
  );
}
export default EditTimerView;
