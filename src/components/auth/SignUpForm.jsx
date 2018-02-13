import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, CardActions, CardText } from 'material-ui/Card'; /* CardTitle */
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import ValidationError from './ValidationError';

/**
 *  Allows for the registration of users
 * A user enters their email, password and the confirm password
 */
const SignUpForm = props => (
    <div>
        <div style={{ marginLeft: 500, marginTop: 180, marginRight: 400 }}>
            <h2>Sign Up </h2>
            <Card
                style={{ textAlign: 'center', height: 400, width: 400 }}
                zDepth={5}
            >
                <CardText>
                    <div>
                        <TextField
                            floatingLabelText="Email"
                            name="email"
                            type="email"
                            onChange={props.onFieldChange}
                            value={props.credentials.email}
                        />
                        <br />
                        <span>
                            <ValidationError
                                error={
                                    props.validationErrors.email &&
                                    props.validationErrors.email
                                }
                            />
                        </span>
                    </div>

                    <div>
                        <TextField
                            floatingLabelText="Password"
                            name="password"
                            type="password"
                            onChange={props.onFieldChange}
                            value={props.credentials.password}
                        />
                        <br />
                        <span>
                            <ValidationError
                                error={
                                    props.validationErrors.password &&
                                    props.validationErrors.password
                                }
                            />
                        </span>
                    </div>

                    <div>
                        <TextField
                            floatingLabelText="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            onChange={props.onFieldChange}
                            value={props.credentials.confirmPassword}
                        />
                        <br />
                        <span>
                            <ValidationError
                                error={
                                    props.validationErrors.confirmPassword &&
                                    props.validationErrors.confirmPassword
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
                                !props.credentials.email ||
                                !props.credentials.password ||
                                !props.credentials.confirmPassword ||
                                props.validationErrors.email ||
                                props.validationErrors.password ||
                                props.validationErrors.confirmPassword
                            }
                            label="SignUp"
                            onClick={props.onFormSubmit}
                            primary
                        />

                        <div>
                            <br />
                            Already Registered?
                            <Link to="login" style={{ textDecoration: 'none' }}>
                                &nbsp; Login
                            </Link>
                        </div>
                    </CardActions>
                )}
            </Card>
        </div>
    </div>
);

SignUpForm.defaultProps = {
    validationErrors: {},
};

SignUpForm.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    credentials: PropTypes.shape({
        email: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        confirmPassword: PropTypes.string.isRequired,
    }).isRequired,
    validationErrors: PropTypes.shape({
        confirmPassword: PropTypes.string,
        password: PropTypes.string,
        email: PropTypes.string,
    }),
    onFormSubmit: PropTypes.func.isRequired,
    onFieldChange: PropTypes.func.isRequired,
};

export default SignUpForm;
