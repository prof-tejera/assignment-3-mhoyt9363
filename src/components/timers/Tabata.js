import ElapsedTime from "../generic/ElapsedTime";
import convertSeconds from "../../utils/convertSeconds";
import PropTypes from 'prop-types';

//------------------------------------------
// This tabata timer will track work effort
// then rest time for a specified number
// of rounds.
//------------------------------------------
  
  const durationStyle = {
    textAlign: "center",
    horzontalAlign: "center",
    fontSize: 18,
  }

const Tabata = ({ rounds, work, rest, progress }) => {

  Tabata.propTypes = {
    rounds: PropTypes.number,
    work: PropTypes.number,
    rest: PropTypes.number,
    progress: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    }

    const currRd = Math.trunc(progress / (work + rest)) + 1;  // find the current round
    const currSec = progress % (work + rest);                 // find the num secs prog in this rd
    let currWk = 0;
    let currRest = 0;

    // determine split between work and rest
    if (currSec > work) {                                     
        currWk = work;
        currRest = currSec - work;
    }
    else {
        currWk = currSec;
        currRest = 0;
    }
  
    return <div>
      <ElapsedTime label= {`Rds: ${currRd} Work: ${convertSeconds({ seconds: currWk })} Rest: ${convertSeconds({ seconds: currRest })}`}/>
      <div style={durationStyle}>{`Rds: ${rounds} Work: ${convertSeconds({ seconds: work })} Rest: ${convertSeconds({ seconds: rest })}`}</div>  
      </div>
  }
    
export default Tabata;
