import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Snackbar from 'material-ui/Snackbar';
import { dismissSnackbar } from '../../actions/snackbarActions';

export class SnackBar extends React.Component {
    constructor(props) {
        super(props);
        this.onDismissSnackBar = this.onDismissSnackBar.bind(this);
    }

    /**
     * Dismisses the snack bar after the specified delay or once the user clicks
     * in an active application window.
     */
    onDismissSnackBar() {
        this.props.dismissSnackbar();
    }

    render() {
        return (
            <div>
                <Snackbar
                    autoHideDuration={4000}
                    open={this.props.isSnackBarActive}
                    message={this.props.snackMessage}
                    onRequestClose={this.onDismissSnackBar}
                    action="Dismiss"
                    onActionClick={this.onDismissSnackBar}
                />
            </div>
        );
    }
}

SnackBar.propTypes = {
    isSnackBarActive: PropTypes.bool.isRequired,
    snackMessage: PropTypes.string.isRequired,
    dismissSnackbar: PropTypes.func.isRequired,
};

const mapStatetoProps = state => ({
    isSnackBarActive: state.snacks.isSnackBarActive,
    snackMessage: state.snacks.snackMessage,
});

const mapDispatchtoProps = dispatch => ({
    dismissSnackbar: bindActionCreators(dismissSnackbar, dispatch),
});

/**
 * Instead of using mapDispatchtoProps which returns an object,
 * just replace it with the needed function
 */

export default connect(mapStatetoProps, mapDispatchtoProps)(SnackBar);
