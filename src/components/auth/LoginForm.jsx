import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, CardActions, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import ValidationError from './ValidationError';

/**
 * Represents a form that is used for Login
 * Takes in as props, the email and password of a user
 */
const LoginForm = props => (
    <div style={{ marginLeft: 500, marginTop: 240, marginRight: 400 }}>
        <h2> Login</h2>
        <Card style={{ textAlign: 'center', height: 320, width: 350 }} zDepth={5}>
            <CardText>
                <div>
                    <TextField
                        floatingLabelText="Email"
                        name="email"
                        type="email"
                        onChange={props.onFieldChange}
                        value={props.credentials.email}
                    />
                    <span>
                        <br />
                        <ValidationError
                            error={
                                props.validationErrors.email &&
                                props.validationErrors.email
                            }
                        />
                    </span>
                </div>

                {/* I am thinking I should leverage on errorText to display
                form errors rather than having my own span */}

                <div>
                    <TextField
                        floatingLabelText="Password"
                        name="password"
                        type="password"
                        onChange={props.onFieldChange}
                        value={props.credentials.password}
                    />

                    <span>
                        <br />
                        <ValidationError
                            error={
                                props.validationErrors.password &&
                                props.validationErrors.password
                            }
                        />
                    </span>
                </div>
            </CardText>

            {props.isFetching ? (
                <CircularProgress />
            ) : (
                <CardActions>
                    <RaisedButton
                        disabled={
                            !props.credentials.email || !props.credentials.password
                        }
                        label="login"
                        onClick={props.onFormSubmit}
                        primary
                    />

                    <div>
                        <br />
                        Not registered?
                        <Link to="signup" style={{ textDecoration: 'none' }}>
                            &nbsp; Register here
                        </Link>
                    </div>
                </CardActions>
            )}
        </Card>
    </div>
);

LoginForm.defaultProps = {
    validationErrors: {},
};

LoginForm.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    credentials: PropTypes.shape({
        email: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
    }).isRequired,
    validationErrors: PropTypes.shape({
        password: PropTypes.string,
        email: PropTypes.string,
    }),
    onFormSubmit: PropTypes.func.isRequired,
    onFieldChange: PropTypes.func.isRequired,
};

export default LoginForm;
