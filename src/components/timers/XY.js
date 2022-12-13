import ElapsedTime from "../generic/ElapsedTime";
import convertSeconds from "../../utils/convertSeconds";
import PropTypes from 'prop-types';

//------------------------------------------
// This timer is similar to a lap timer
// where it will track the number of laps(x)
// and the number of min:sec for each lap (y).
//------------------------------------------

const durationStyle = {
  textAlign: "center",
  horzontalAlign: "center",
  fontSize: 18,
}

const XY = ({ rounds, work, progress }) => {

  XY.propTypes = {
    duration: PropTypes.number,
    progress: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    rounds: PropTypes.number,
  }

  const currRd = Math.trunc(progress / work) + 1; // find the current round
  const currSec = progress % work;                // find the num of sec elapsed in curr rd

  return <div>
    <ElapsedTime label={`Rd:  ${currRd} Work: `} seconds={currSec} />
    <div style={durationStyle}>{`Rds: ${rounds} Work: ${convertSeconds({ seconds: work })}`}</div>  
    </div>
}

export default XY;
