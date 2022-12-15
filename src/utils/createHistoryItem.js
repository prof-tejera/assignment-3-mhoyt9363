
import convertSeconds from "./convertSeconds";
import getTotTime from "./getTotTime";
import PropTypes from 'prop-types';

//--------------------------------------------------
// Logs a historical item for later display
//--------------------------------------------------

const createHistoryItem = ({ queueToTansform }) => {

    createHistoryItem.propTypes = {
        queueToTansform: PropTypes.array,
    };

    // set initial return value, process the workout if there are timers (>0)
    let displayItem = 'Oops, the workout doesn\'t have any timers!';
    if (queueToTansform.length > 0) {
        displayItem = `Total Time: ${convertSeconds({
            seconds: getTotTime({queueToTotal: queueToTansform})
            })}\n`;

        queueToTansform.forEach(item => {
            displayItem += `   ${item.type} (${convertSeconds({seconds: item.duration})}) - `;
            displayItem += `${item.notes} \n`;
        })
    }
return(displayItem);

}

export default createHistoryItem;