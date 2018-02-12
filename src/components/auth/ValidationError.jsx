import React from 'react';
import PropTypes from 'prop-types';

const errorStyle = {
    fontSize: '0.8em',
    color: 'red',
};
/** Represents the format in which an error will be displayed within the form  */
const ValidationError = props => <span style={errorStyle}>{props.error}</span>;

ValidationError.defaultProps = {
    error: '',
};

ValidationError.propTypes = {
    error: PropTypes.string,
};

export default ValidationError;
