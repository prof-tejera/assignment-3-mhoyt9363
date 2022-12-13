import { useContext } from 'react';
import { AppContext } from '../generic/Context';
import styled from 'styled-components';
import ElapsedTime from '../generic/ElapsedTime';
import convertSeconds from '../../utils/convertSeconds';
import PropTypes from 'prop-types';

const ProgressContainer = styled.div`
  border: 1px solid black;
  padding: 5px 20px 3px 20px;
  margin: 10px 10px 0px 10px;
  height: 75px;
  width: 250px;
  font-size: 1rem;
  text-align: center;
`;

const Title = styled.div`
  font-size: 1.1rem;
  text-align: center;
  padding-bottom: 5px;
`;

//----------------------------------------------
// This component displays the overall progress
// of the workout.
//----------------------------------------------

const ProgressBar = ({ finalTotTime, time }) => {
  const { complete } = useContext(AppContext);

  ProgressBar.propTypes = {
    finalTotTime: PropTypes.number,
    time: PropTypes.number,
  }

  return (
    <ProgressContainer
      style={{
        borderColor: complete ? 'red' : 'black',
        backgroundColor: 'white',

      }}
    >
      <Title>Overall Progress</Title>
      <ElapsedTime 
        label= {`Total: ${convertSeconds({ seconds: finalTotTime })} Elapsed: ${convertSeconds({ seconds: time })} Remaining: ${convertSeconds({ seconds: finalTotTime - time })}`}
        style = {{fontSize: 15,
                  backgroundColor: 'lightgrey',
          }}/>    
    </ProgressContainer>
  );
};

export default ProgressBar;