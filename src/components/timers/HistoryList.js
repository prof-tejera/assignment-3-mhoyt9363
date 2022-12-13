import styled from 'styled-components';
import PropTypes from 'prop-types';

const HistoricalWorkoutContainer = styled.div`
  border: 1px solid black;
  padding: 10px;
  margin: 10px;
  width: 80%;
  font-size: 1.1rem;
`;

const HistoryTitle = styled.div`
  font-size: 1.2rem;
  text-align: center;
`;
const HistoryItem = styled.div`
  font-size: 1rem;
  text-align: left;
  white-space: pre-wrap;
`;
//----------------------------------------------
// This component will dispaly the historical 
// workouts completed.
//----------------------------------------------

const HistoryList = ({ item, index }) => {

  HistoryList.propTypes = {
    item: PropTypes.string,
    index: PropTypes.number,
  }

  return(
      <HistoricalWorkoutContainer>
        <HistoryTitle>Historical Workout {index + 1}</HistoryTitle>
        <HistoryItem>{item}</HistoryItem>
      </HistoricalWorkoutContainer>
  );

};

export default HistoryList;