/** @format */
import PropTypes from 'prop-types';
function Button({ children, version, type, isDIabled }) {
  return (
    <button type={type} disabled={isDIabled} className={`btn btn-${version}`}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  version: 'primary',
  type: 'button',
  isDIabled: false,
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  version: PropTypes.string,
  type: PropTypes.string,
  isDIabled: PropTypes.bool,
};

export default Button;
