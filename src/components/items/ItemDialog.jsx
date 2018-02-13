import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import NumberInput from 'material-ui-number-input';

/**
 * A universal modal / dialog used for adding, editing and
 *  deleting items from a shoppinglist
 */

const ItemDialog = ({
    state,
    handleClose,
    onTextChange,
    doAction,
    checked,
    onCheck,
    onPriceError,
    onQuantityError,
}) => {
    const {
        buttonLabel,
        dialogTitle,
        item,
        open,
        priceErrorText,
        quantityErrorText,
    } = state;

    const actions = [
        <FlatButton label="cancel" primary onClick={handleClose} />,
        <FlatButton
            label={buttonLabel}
            primary
            onClick={doAction}
            disabled={
                !item.name ||
                !item.price ||
                !item.quantity ||
                priceErrorText ||
                quantityErrorText ||
                item.name.length === 0
            }
        />,
    ];

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
                <NumberInput
                    name="price"
                    value={item.price}
                    required
                    floatingLabelText="Price"
                    min={1}
                    max={100000000}
                    errorText={priceErrorText}
                    onChange={onTextChange}
                    onError={onPriceError}
                    fullWidth
                />
            )}

            {buttonLabel !== 'DELETE' && (
                <NumberInput
                    name="quantity"
                    value={item.quantity}
                    required
                    floatingLabelText="Quantity"
                    min={1}
                    max={10000}
                    errorText={quantityErrorText}
                    onChange={onTextChange}
                    onError={onQuantityError}
                    fullWidth
                />
            )}

            {buttonLabel !== 'DELETE' && (
                <Checkbox label="Bought" onCheck={onCheck} checked={checked} />
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
    checked: PropTypes.bool.isRequired,
    onCheck: PropTypes.func.isRequired,
    onPriceError: PropTypes.func.isRequired,
    onQuantityError: PropTypes.func.isRequired,
};

export default ItemDialog;
