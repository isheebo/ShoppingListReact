import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';

const StrToDate = dateString =>
    dateString.substr(0, 10).replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3');

const ListDialog = ({
    state,
    handleClose,
    onTextChange,
    onDateChange,
    doAction,
}) => {
    const {
        dialogTitle,
        open,
        buttonLabel,
        shoppinglist,
        floatingLabelText,
    } = state;

    const actions = [
        <FlatButton label="Cancel" primary onClick={handleClose} />,
        <FlatButton
            label={buttonLabel}
            primary
            onClick={doAction}
            disabled={
                !shoppinglist.name ||
                (shoppinglist.name && shoppinglist.name.length === 0)
            }
        />,
    ];

    return (
        <Dialog
            title={dialogTitle}
            actions={actions}
            modal={false}
            contentStyle={{
                maxWidth: '30%',
                top: '0vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                zIndex: 1000000,
            }}
            open={open}
            onRequestClose={handleClose}
        >
            {buttonLabel === 'DELETE' && (
                <p>Are you sure you want to delete this list? </p>
            )}

            {buttonLabel !== 'DELETE' && (
                <TextField
                    name="name"
                    floatingLabelText={floatingLabelText}
                    value={shoppinglist.name}
                    onChange={onTextChange}
                    style={{ width: '100%' }}
                />
            )}

            {buttonLabel !== 'DELETE' && (
                <DatePicker
                    autoOk
                    defaultDate={
                        shoppinglist.notifyDate
                            ? new Date(StrToDate(shoppinglist.notifyDate))
                            : new Date(Date.now())
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
                />
            )}
        </Dialog>
    );
};

ListDialog.propTypes = {
    state: PropTypes.shape({
        dialogTitle: PropTypes.string.isRequired,
        buttonLabel: PropTypes.string.isRequired,
        floatingLabelText: PropTypes.string.isRequired,
        open: PropTypes.bool.isRequired,
        shoppingList: PropTypes.shape({
            name: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired,
            notifyDate: PropTypes.string.isRequired,
            dateCreated: PropTypes.string.isRequired,
            dateModified: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,

    handleClose: PropTypes.func.isRequired,
    onTextChange: PropTypes.func.isRequired,
    onDateChange: PropTypes.func.isRequired,
    doAction: PropTypes.func.isRequired,
};

export default ListDialog;
