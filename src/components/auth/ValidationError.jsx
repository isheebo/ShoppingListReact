import React from 'react';
import PropTypes from 'prop-types';

const errorStyle = {
    fontSize: '0.8em',
    color: 'red',
};

const ValidationError = props => <span style={errorStyle}>{props.error}</span>;

ValidationError.defaultProps = {
    error: '',
};

ValidationError.propTypes = {
    error: PropTypes.string,
};

export default ValidationError;
