import React from 'react';
import PropTypes from 'prop-types';
import Validator from 'validator';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header';
import ResetPasswordForm from '../../components/auth/ResetPasswordForm';
import { resetUserPassword } from '../../actions/authActions';

/**
 * Feeds data from the user into the reset password
 * form. Acts as a controller for the ResetPasswordForm
 */
export class ResetPasswordPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            confirmPassword: '',
            validationErrors: {},
        };
        this.onFieldChange = this.onFieldChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    componentWillMount = () => {
        if (!this.props.isAuthenticated) {
            this.props.history.push('/');
        }
    };

    /**
     * Validates new passwords instantly as the
     * user provides them
     */
    onFieldChange(event) {
        this.setState({ [event.target.name]: event.target.value });
        const fieldType = event.target.type;
        const field = event.target.value;
        const fieldName = event.target.name;
        switch (fieldType) {
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
                } else if (field && field.length < 6) {
                    this.setState({
                        validationErrors: {
                            password:
                                    'Password must contain a minimum of 6 characters', // eslint-disable-line
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

    /**
     * On Success, redirect to the lists dashboard
     */
    onFormSubmit(event) {
        event.preventDefault();
        const { confirmPassword, password } = this.state;
        const formData = new FormData();
        formData.append('password', password);
        formData.append('confirm password', confirmPassword);
        this.props.resetUserPassword(formData, this.props.history);
    }

    render() {
        const { password, confirmPassword, validationErrors } = this.state;
        return (
            <div>
                <Header title="Reset" />
                <ResetPasswordForm
                    isFetching={this.props.isFetching}
                    credentials={{ password, confirmPassword }}
                    validationErrors={validationErrors}
                    onFormSubmit={this.onFormSubmit}
                    onFieldChange={this.onFieldChange}
                />
            </div>
        );
    }
}

ResetPasswordPage.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    resetUserPassword: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
};

const mapStateToProps = state => ({
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
    resetUserPassword: bindActionCreators(resetUserPassword, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage);
