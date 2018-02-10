import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

const ItemDialog = ({
    state, handleClose, onTextChange, doAction,
}) => {
    const {
        buttonLabel, dialogTitle, item, open,
    } = state;
    const actions = [
        <FlatButton label="cancel" primary onClick={handleClose} />,
        <FlatButton
            label={buttonLabel}
            primary
            onClick={doAction}
            disabled={
                (!item.name && !item.price && !item.quantity) ||
                item.name.length === 0
            }
        />,
    ];
    /**
     *  Should I add a checkbox to indicate the bought status🤔
     * We will get backa to this soon!
     */

    return (
        <Dialog
            title={dialogTitle}
            actions={actions}
            modal={false}
            contentStyle={{ width: '40%', margin: '0 auto' }}
            onRequestClose={handleClose}
            open={open}
        >
            {buttonLabel === 'DELETE' && (
                <p>Are you sure that you want to delete this item?</p>
            )}

            {buttonLabel !== 'DELETE' && (
                <TextField
                    name="name"
                    floatingLabelText="Name"
                    value={item.name}
                    onChange={onTextChange}
                    fullWidth
                />
            )}

            {buttonLabel !== 'DELETE' && (
                <TextField
                    name="price"
                    floatingLabelText="Price"
                    type="number" // assuming numerical input only
                    value={item.price}
                    onChange={onTextChange}
                    fullWidth
                />
            )}

            {buttonLabel !== 'DELETE' && (
                <TextField
                    name="quantity"
                    floatingLabelText="Quantity"
                    type="number"
                    value={item.quantity}
                    onChange={onTextChange}
                    fullWidth
                />
            )}
        </Dialog>
    );
};

ItemDialog.propTypes = {
    state: PropTypes.shape({
        dialogTitle: PropTypes.string.isRequired,
        buttonLabel: PropTypes.string.isRequired,
        open: PropTypes.bool.isRequired,
        item: PropTypes.shape({
            name: PropTypes.string.isRequired,
            price: PropTypes.string.isRequired,
            quantity: PropTypes.string.isRequired,
            has_been_bought: PropTypes.bool.isRequired,
            date_created: PropTypes.string.isRequired,
            date_modified: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    doAction: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    onTextChange: PropTypes.func.isRequired,
};

export default ItemDialog;
