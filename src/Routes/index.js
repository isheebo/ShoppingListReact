import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
// import { bindActionCreators } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LoginPage from '../containers/auth/LoginPage';
import SignUpPage from '../containers/auth/SignUpPage';
import SnackBar from '../containers/utils/SnackBar';
import ResetPasswordPage from '../containers/auth/ResetPasswordPage';
import ListDashboardContainer from '../containers/lists/ListDashboardContainer';
import ItemsContainer from '../containers/items/ItemsContainer';
// import { logoutUser } from '../actions/authActions';

// Add all other containers here

const Routes = () => (
    <MuiThemeProvider>
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={LoginPage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/signup" component={SignUpPage} />
                    <Route path="/reset-password" component={ResetPasswordPage} />
                    <Route path="/dashboard" component={ListDashboardContainer} />
                    <Route path="/items/:id" component={ItemsContainer} />
                    <Route path="/logout" />
                </Switch>
            </BrowserRouter>
            <SnackBar />
        </div>
    </MuiThemeProvider>
);

const mapStateToProps = state => ({
    state,
});

export default connect(mapStateToProps)(Routes);
