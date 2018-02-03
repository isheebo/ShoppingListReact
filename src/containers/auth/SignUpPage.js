import React from 'react';
import PropTypes from 'prop-types';
// import createHistory from 'history/createBrowserHistory';
import Validator from 'validator';
import { connect } from 'react-redux';
import SignUpForm from '../../components/auth/SignUpForm';
import { signupUser } from '../../actions/authActions';

// const history = createHistory();

// Establish new ways of checking for the validity of submitted data
// The test for validity is still failing
class SignUpPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            validationErrors: {},
        };
        this.onFieldChange = this.onFieldChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFieldChange(event) {
        this.setState({ [event.target.name]: event.target.value });
        const fieldType = event.target.type;
        const field = event.target.value;
        const fieldName = event.target.name;

        switch (fieldType) {
        case 'email':
            if (!field) {
                this.setState({
                    validationErrors: { email: 'This field is required' },
                });
            } else if (field && !Validator.isEmail(field)) {
                this.setState({
                    validationErrors: { email: 'The given email is invalid' },
                });
            } else {
                this.setState({
                    validationErrors: { email: '' },
                });
            }
            break;

        case 'password':
            if (Validator.equals(fieldName, 'password')) {
                if (Validator.isEmpty(field)) {
                    this.setState({
                        validationErrors: { password: 'This field is required' },
                    });
                } else if (field && field.length < 6) {
                    this.setState({
                        validationErrors: {
                            password:
                                    'Password must contain a minimum of 6 characters', // eslint-disable-line
                        },
                    });
                } else {
                    this.setState({
                        validationErrors: { password: '' },
                    });
                }
            }

            if (Validator.equals(fieldName, 'confirmPassword')) {
                if (Validator.isEmpty(field)) {
                    this.setState({
                        validationErrors: {
                            confirmPassword: 'This field is required',
                        },
                    });
                } else if (
                    field &&
                        !Validator.equals(field, this.state.password)
                ) {
                    this.setState({
                        validationErrors: {
                            confirmPassword: 'The given passwords don\'t match',
                        },
                    });
                } else {
                    this.setState({
                        validationErrors: { confirmPassword: '' },
                    });
                }
            }

            break;
        default:
            break;
        }
    }

    onFormSubmit(event) {
        event.preventDefault();
        const { email, password } = this.state;
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        this.props.signupUser(formData);
        // .then(() => {
        //     history.push('/login');
        //     console.log('We are here');
        // })
        // .catch();
    }

    render() {
        const {
            email, password, confirmPassword, validationErrors,
        } = this.state;
        return (
            <div>
                <SignUpForm
                    credentials={{ email, password, confirmPassword }}
                    isFetching={this.props.isFetching}
                    validationErrors={validationErrors}
                    onFormSubmit={this.onFormSubmit}
                    onFieldChange={this.onFieldChange}
                    onFieldValidate={this.onFieldValidate}
                />
            </div>
        );
    }
}

SignUpPage.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    signupUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    isFetching: state.auth.isFetching,
});

export default connect(mapStateToProps, { signupUser })(SignUpPage);
