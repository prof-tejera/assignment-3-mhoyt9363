import PropTypes from 'prop-types';

//------------------------------------------
// A generic button component.
//------------------------------------------

const TimerButton = ({ index, label, clkAction}) => {

  TimerButton.propTypes = {
    index: PropTypes.number,
    label: PropTypes.string,
    clkAction: PropTypes.func,
  };

  return (
    <button onClick= { () => {clkAction(index) }
      } >
       {label}
    </button>
  );
};

export default TimerButton;
