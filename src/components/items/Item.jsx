import React from 'react';
import { PropTypes } from 'prop-types';
import Moment from 'moment';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

const iconStyles = {
    marginRight: 24,
    color: '#00bcd4',
    padding: 5,
};
const columnStyle = {
    color: 'rgba(127,127,127,1)',
};

const Item = ({ item, onExecuteAction }) => {
    const handleClick = (action) => {
        onExecuteAction(item, action);
    };
    return (
        <TableRow>
            <TableRowColumn style={columnStyle}>{item.name}</TableRowColumn>
            <TableRowColumn style={columnStyle}>{item.price}</TableRowColumn>
            <TableRowColumn style={columnStyle}>{item.quantity}</TableRowColumn>
            <TableRowColumn style={columnStyle}>
                {item.has_been_bought}
            </TableRowColumn>
            <TableRowColumn style={columnStyle}>
                {Moment(item.date_created).format('lll')}
            </TableRowColumn>
            <TableRowColumn style={columnStyle}>
                {Moment(item.date_modified).format('lll')}
            </TableRowColumn>
            <TableRowColumn>
                <IconButton
                    iconStyle={{ color: '#00bcd4' }}
                    onClick={() => handleClick({ type: 'edit item' })}
                >
                    <FontIcon className="material-icons" style={{ color: '' }}>
                        <i className="material-icons">mode_edit</i>
                    </FontIcon>
                </IconButton>

                <IconButton
                    iconStyle={{ color: 'red' }}
                    onClick={() => handleClick({ type: 'delete item' })}
                >
                    <FontIcon
                        className="material-icons"
                        style={{ ...iconStyles, color: 'red' }}
                    >
                        <i className="material-icons">delete</i>
                    </FontIcon>
                </IconButton>
            </TableRowColumn>
        </TableRow>
    );
};

Item.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        quantity: PropTypes.string.isRequired,
        has_been_bought: PropTypes.bool.isRequired,
        date_created: PropTypes.string.isRequired,
        date_modified: PropTypes.string.isRequired,
    }).isRequired,
    onExecuteAction: PropTypes.func.isRequired,
};

export default Item;
