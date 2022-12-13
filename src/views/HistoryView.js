import { useContext } from "react";
import { AppContext } from "../components/generic/Context";
import HistoryList from '../components/timers/HistoryList'
import styled from "styled-components";
// import { Link } from 'react-router-dom';

//------------------------------------------
// This component will display a page that
// shows the user's workout history.
//------------------------------------------

const HistoricalWorkoutContainer = styled.div`
  border: 1px solid black;
  width: 80%;
  font-size: 1.0rem;
  text-align: center;
  display: flex;
  justify-content: center;
`;

const HistoryView = () => {
  const { wkoutHistory } = useContext(AppContext);

  if(wkoutHistory.length > 0) {
      return(<div>
        {wkoutHistory.map((t, i) => (
          <HistoryList key={i} index={i} item={t} />
        ))}
      </div>)
    } else {
      return(<HistoricalWorkoutContainer>No Workouts in History</HistoricalWorkoutContainer>)  
      }
};

export default HistoryView;
