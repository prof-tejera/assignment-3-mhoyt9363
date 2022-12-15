import PropTypes from 'prop-types';

//--------------------------------------------------
// Converts seconds to a display friendly format
// for minutes and seconds
//--------------------------------------------------

const testJSON = ({ testString }) => {

    testJSON.propTypes = {
        testString: PropTypes.string,
      }

    try {
        JSON.parse( testString );
        return true;
    } catch (error) {
        return false;
    }
}

export default testJSON;