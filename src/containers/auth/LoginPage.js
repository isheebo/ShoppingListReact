import React from 'react';
import PropTypes from 'prop-types';
import Validator from 'validator';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LoginForm from '../../components/auth/LoginForm';
import Header from '../../components/Header/Header';
import { loginUser } from '../../actions/authActions';

/**
 * A controller class that acts as a main entry point
 * into the application
 */
export class LoginPage extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            validationErrors: {},
        };
        this.onFieldChange = this.onFieldChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    componentWillMount = () => {
        if (this.props.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    };

    /**
     *  Handles validation of user
     * input as it is fed into the
     * form input boxes
     */
    onFieldChange(event) {
        this.setState({ [event.target.name]: event.target.value });
        const fieldType = event.target.type;
        const field = event.target.value;

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
        default:
            break;
        }
    }

    /**
     * handles the API call, for logging in a user.
     * On Success, redirects to the dashboard
     * On Failure, stays on the same page
     */
    onFormSubmit(event) {
        event.preventDefault();
        const { email, password } = this.state;
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        this.props.loginUser(formData, this.props.history);
    }

    render() {
        const { email, password, validationErrors } = this.state;
        return (
            <div>
                <Header title="ShoppingLister" />
                <LoginForm
                    credentials={{ email, password }}
                    validationErrors={validationErrors}
                    isFetching={this.props.isFetching}
                    onFieldChange={this.onFieldChange}
                    onFormSubmit={this.onFormSubmit}
                />
            </div>
        );
    }
}

LoginPage.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    loginUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
};

const mapStateToProps = state => ({
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
    loginUser: bindActionCreators(loginUser, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
