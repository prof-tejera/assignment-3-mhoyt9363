import PropTypes from 'prop-types';

//--------------------------------------------------
// Converts seconds to a display friendly format
// for minutes and seconds
//--------------------------------------------------
const convertSeconds = ({ seconds }) => {

    convertSeconds.propTypes = {
        seconds: PropTypes.number,
      };

    const min = Math.trunc(seconds/60);
    const sec = seconds % 60;
    let time = '';

    if (isNaN(sec) || (isNaN(min))) {
        time = '';
    }
    else {
        if (min < 10) {
            time = "0" + min + ":"
        } else {
            time = min + ":"
        };
        if (sec < 10) {
            time = time + "0" + sec
        } else {
            time = time + sec
        };
    }

    return(time);
}

export default convertSeconds;