import PropTypes from 'prop-types';

//--------------------------------------------------
// Finds the total workout time from the timer queue
//--------------------------------------------------
const getTotTime = ({ queueToTotal }) => {
    getTotTime.propTypes = {
        queueToTotal: PropTypes.array,
      }

    return(queueToTotal.reduce((acc, curr) => curr.duration + acc, 0));

}

export default getTotTime;