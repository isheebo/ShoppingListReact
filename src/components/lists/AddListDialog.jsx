import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';

const AddListDialog = props => (
    <div>
        <Dialog
            modal={false}
            onRequestClose={props.onCloseDialog}
            title={props.dialogTitle}
            open={props.isOpen}
            actions={[
                <FlatButton label="Cancel" primary onClick={props.onCloseDialog} />,
                <FlatButton
                    label={props.buttonLabel}
                    primary
                    onClick={props.onDataSubmit}
                />,
            ]}
        >
            <div>
                <TextField
                    name="name"
                    floatingLabelText="Name"
                    onChange={props.onNameChange}
                    value={props.shoppingList.name}
                />
            </div>
            <div>
                <DatePicker
                    autoOk
                    minDate={new Date(Date.now())}
                    maxDate={new Date(2100, 1, 1)}
                    name="notifyDate"
                    floatingLabelText="Notify Date"
                    // onChange={props.onDateChange}
                />
            </div>
        </Dialog>
    </div>
);

AddListDialog.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    dialogTitle: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    shoppingList: PropTypes.shape({
        name: PropTypes.string.isRequired,
        notifyDate: PropTypes.string.isRequired,
    }).isRequired,
    onNameChange: PropTypes.func.isRequired,
    // onDateChange: PropTypes.func.isRequired,
    onCloseDialog: PropTypes.func.isRequired,
    onDataSubmit: PropTypes.func.isRequired,
};

export default AddListDialog;
