import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
// import { bindActionCreators } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LoginPage from '../containers/auth/LoginPage';
import SignUpPage from '../containers/auth/SignUpPage';
import SnackBar from '../containers/utils/SnackBar';
import ResetPasswordPage from '../containers/auth/ResetPasswordPage';
import ListDashboardContainer from '../containers/lists/ListDashboardContainer';
// import { logoutUser } from '../actions/authActions';

// Add all other containers here

const Routes = () => (
    <MuiThemeProvider>
        <div>
            <Switch>
                {/*
                What happens if someone enters an unknown route.
                e.g. localhost:3000/shoppinglists/item/100
                In other words we need to form the 404 Handler
                */}
                <Route exact path="/" component={LoginPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/signup" component={SignUpPage} />
                <Route path="/reset-password" component={ResetPasswordPage} />
                <Route path="/dashboard" component={ListDashboardContainer} />
                <Route path="/logout" />
            </Switch>
            <SnackBar />
        </div>
    </MuiThemeProvider>
);

const mapStateToProps = state => ({
    state,
});

// const mapDispatchtoProps = dispatch => ({
//     logoutUser: bindActionCreators(logoutUser, dispatch),
// });

export default connect(mapStateToProps)(Routes);
