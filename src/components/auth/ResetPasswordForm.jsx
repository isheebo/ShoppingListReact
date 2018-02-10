import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { Card, CardActions, CardText } from 'material-ui/Card'; /* CardTitle */
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import ValidationError from './ValidationError';

// user must be logged in
// if they aren't, redirect them to the login page with the `next` URL
// thereafter, we may then reset their password

const ResetPasswordForm = props => (
    <div>
        <div style={{ marginLeft: 500, marginTop: 180, marginRight: 400 }}>
            <h2> Reset Password</h2>
            <Card
                style={{ textAlign: 'center', height: 300, width: 400 }}
                zDepth={5}
            >
                <CardText>
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
                                !props.credentials.password ||
                                !props.credentials.confirmPassword
                            }
                            label="Reset Password"
                            onClick={props.onFormSubmit}
                            primary
                        />
                    </CardActions>
                )}
            </Card>
        </div>
    </div>
);

ResetPasswordForm.defaultProps = {
    validationErrors: {},
};

ResetPasswordForm.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    credentials: PropTypes.shape({
        password: PropTypes.string.isRequired,
        confirmPassword: PropTypes.string.isRequired,
    }).isRequired,
    validationErrors: PropTypes.shape({
        confirmPassword: PropTypes.string,
        password: PropTypes.string,
    }),
    onFormSubmit: PropTypes.func.isRequired,
    onFieldChange: PropTypes.func.isRequired,
};

export default ResetPasswordForm;
