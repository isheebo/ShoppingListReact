import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';

/**
 * A modal that is used universally for the adding, editing
 * and deleting of shoppinglists
 */
const ListDialog = ({
    state,
    handleClose,
    onTextChange,
    onDateChange,
    doAction,
}) => {
    const {
        dialogTitle, open, buttonLabel, shoppinglist,
    } = state;

    const actions = [
        <FlatButton label="Cancel" primary onClick={handleClose} />,
        <FlatButton
            label={buttonLabel}
            primary
            onClick={doAction}
            disabled={
                !shoppinglist.name ||
                !shoppinglist.notify_date ||
                shoppinglist.name.length === 0
            }
        />,
    ];

    return (
        <Dialog
            title={dialogTitle}
            actions={actions}
            modal={false}
            contentStyle={{
                maxWidth: '40%',
            }}
            open={open}
            onRequestClose={handleClose}
        >
            {buttonLabel === 'DELETE' && (
                <p>Are you sure that you want to delete this list?</p>
            )}

            {buttonLabel !== 'DELETE' && (
                <TextField
                    name="name"
                    floatingLabelText="Name"
                    value={shoppinglist.name}
                    onChange={onTextChange}
                    fullWidth
                />
            )}

            {buttonLabel !== 'DELETE' && (
                <DatePicker
                    autoOk
                    value={
                        shoppinglist.notify_date &&
                        new Date(shoppinglist.notify_date)
                    }
                    minDate={new Date(Date.now())}
                    onChange={(event, date) => {
                        onDateChange(date);
                    }}
                    style={{ width: '100%' }}
                    textFieldStyle={{
                        width: '100%',
                        fontWeight: '500',
                        marginTop: 20,
                        marginBottom: 5,
                    }}
                    floatingLabelText="Notify Date"
                />
            )}
        </Dialog>
    );
};

ListDialog.propTypes = {
    state: PropTypes.shape({
        dialogTitle: PropTypes.string.isRequired,
        buttonLabel: PropTypes.string.isRequired,
        open: PropTypes.bool.isRequired,
        shoppinglist: PropTypes.shape({
            name: PropTypes.string.isRequired,
            notify_date: PropTypes.string,
        }).isRequired,
    }).isRequired,

    handleClose: PropTypes.func.isRequired,
    onTextChange: PropTypes.func.isRequired,
    onDateChange: PropTypes.func.isRequired,
    doAction: PropTypes.func.isRequired,
};

export default ListDialog;
