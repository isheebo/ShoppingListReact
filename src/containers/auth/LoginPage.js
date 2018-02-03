import React from 'react';
import PropTypes from 'prop-types';
import Validator from 'validator';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LoginForm from '../../components/auth/LoginForm';
import { loginUser } from '../../actions/authActions';

class LoginPage extends React.Component {
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

    onFormSubmit(event) {
        event.preventDefault();
        const { email, password } = this.state;
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        this.props.loginUser(formData);
    }

    render() {
        const { email, password, validationErrors } = this.state;
        return (
            <div>
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
};

const mapStateToProps = state => ({
    isFetching: state.auth.isFetching,
});

const mapDispatchToProps = dispatch => ({
    loginUser: bindActionCreators(loginUser, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
