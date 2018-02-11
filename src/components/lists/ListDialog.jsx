import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import ItemsContainer from '../../containers/items/ItemsContainer';

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
        viewItems,
    } = state;

    const actions = [
        <FlatButton
            label={viewItems ? 'Close' : 'Cancel'}
            primary
            onClick={handleClose}
        />,
        <FlatButton
            label={buttonLabel}
            primary
            onClick={doAction}
            disabled={
                (!shoppinglist.name && !shoppinglist.notify_date) ||
                (shoppinglist.name && shoppinglist.name.length === 0)
            }
        />,
    ];

    return (
        <Dialog
            title={dialogTitle}
            actions={viewItems ? [actions[0]] : actions}
            modal={false}
            contentStyle={{
                maxWidth: '40%',
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
            {buttonLabel === 'DELETE' &&
                !viewItems && <p>Are you sure that you want to delete this list?</p>}

            {buttonLabel !== 'DELETE' &&
                !viewItems && (
                    <TextField
                        name="name"
                        floatingLabelText={floatingLabelText}
                        value={shoppinglist.name}
                        onChange={onTextChange}
                        fullWidth
                    />
                )}

            {viewItems && <ItemsContainer listID={shoppinglist.id} />}

            {buttonLabel !== 'DELETE' &&
                !viewItems && (
                    <DatePicker
                        autoOk
                        defaultDate={
                            shoppinglist.notify_date
                                ? new Date(shoppinglist.notify_date)
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
        floatingLabelText: PropTypes.string.isRequired,
        open: PropTypes.bool.isRequired,
        shoppinglist: PropTypes.shape({
            name: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired,
            notify_date: PropTypes.string.isRequired,
            date_created: PropTypes.string.isRequired,
            date_modified: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,

    handleClose: PropTypes.func.isRequired,
    onTextChange: PropTypes.func.isRequired,
    onDateChange: PropTypes.func.isRequired,
    doAction: PropTypes.func.isRequired,
};

export default ListDialog;
