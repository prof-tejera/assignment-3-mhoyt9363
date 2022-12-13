import convertSeconds from "../../utils/convertSeconds";
import ElapsedTime from "../generic/ElapsedTime";
import PropTypes from 'prop-types';

//----------------------------------------------
// This timer will start at 0 and time an event.
// There is a definable time cap when it will
// stop.
//----------------------------------------------

const durationStyle = {
  textAlign: "center",
  horzontalAlign: "center",
  fontSize: 18,
}

const Stopwatch = ({ duration, progress }) => {

  Stopwatch.propTypes = {
    duration: PropTypes.number,
    progress: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    }

  return (
    <div>
        <ElapsedTime label="Progress: " seconds={progress} />
        <div style={durationStyle}>Duration: {convertSeconds({ seconds: duration })}</div>
    </div>
  );
};

export default Stopwatch;
