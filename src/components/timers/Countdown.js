import ElapsedTime from "../generic/ElapsedTime";
import convertSeconds from "../../utils/convertSeconds";
import PropTypes from 'prop-types';

//------------------------------------------
// This timer starts from the specified
// number of seconds and counts down to 0.
//------------------------------------------

const durationStyle = {
  textAlign: "center",
  horzontalAlign: "center",
  fontSize: 18,
}

const Countdown = ({ duration, progress })=> {

Countdown.propTypes = {
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

export default Countdown;
