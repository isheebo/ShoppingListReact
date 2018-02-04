import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardActions, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import ValidationError from './ValidationError';

const LoginForm = props => (
    <div style={{ marginLeft: 500, marginTop: 240, marginRight: 400 }}>
        <h2> Login</h2>
        <Card style={{ textAlign: 'center', height: 320, width: 350 }} zDepth={5}>
            {/* Find a way of putting the word Login on the page
             <CardTitle title="Login" /> */}
            <CardText>
                <div>
                    <TextField
                        floatingLabelText="Email"
                        name="email"
                        type="email"
                        // onBlur={props.onFieldValidate}
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

                <div>
                    <TextField
                        floatingLabelText="Password"
                        name="password"
                        type="password"
                        // onBlur={props.onFieldValidate}
                        onChange={props.onFieldChange}
                        value={props.credentials.password}
                    />

                    {/* am thinking I should silence this error👇🏻👇🏿👇🏽. we
                entertain all kinds of passwords. Giving clues on the passwords
                we allow at Login doesn't sound like a good idea. These clues
                are actually needed */}

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
                        // disabled={!props.isValid}
                        label="login"
                        onClick={props.onFormSubmit}
                        primary
                    />

                    <div>
                        <br />
                        Not registered?
                        <a href="/signup"> register here</a>
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
