import React from 'react';
import { PropTypes } from 'prop-types';
import Moment from 'moment';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton/FlatButton';

/**
 * Represents a view of one shoppinglist
 */
const ShoppingListComponent = ({
    shoppinglist,
    onExecuteAction,
    handleOpenItemsView,
}) => {
    const handleClick = (action) => {
        onExecuteAction(shoppinglist, action);
    };

    return (
        <TableRow>
            <TableRowColumn>
                <FlatButton
                    onClick={() => handleOpenItemsView(shoppinglist.id)}
                    style={{ color: '#000', textDecoration: 'none' }}
                >
                    {shoppinglist.name}
                </FlatButton>
            </TableRowColumn>

            <TableRowColumn style={{ color: 'rgba(127,127,127,1)' }}>
                {shoppinglist.notify_date}
            </TableRowColumn>

            <TableRowColumn style={{ color: 'rgba(127,127,127,1)' }}>
                {Moment(shoppinglist.date_created).format('lll')}
            </TableRowColumn>

            <TableRowColumn style={{ color: 'rgba(127,127,127,1)' }}>
                {Moment(shoppinglist.date_modified).format('lll')}
            </TableRowColumn>
            <TableRowColumn>
                <IconButton
                    iconStyle={{ color: 'grey' }}
                    onClick={() => handleClick({ type: 'edit shoppinglist' })}
                >
                    <FontIcon
                        className="material-icons"
                        style={{ marginRight: 24, padding: 5 }}
                    >
                        <i className="material-icons">mode_edit</i>
                    </FontIcon>
                </IconButton>

                <IconButton
                    iconStyle={{ color: 'red' }}
                    onClick={() => handleClick({ type: 'delete shoppinglist' })}
                >
                    <FontIcon
                        className="material-icons"
                        style={{ marginRight: 24, padding: 5, color: 'red' }}
                    >
                        <i className="material-icons">delete</i>
                    </FontIcon>
                </IconButton>

                <IconButton
                    iconStyle={{ color: 'grey' }}
                    onClick={() => handleOpenItemsView(shoppinglist.id)}
                >
                    <FontIcon
                        className="material-icons"
                        style={{ marginRight: 24, padding: 5 }}
                    >
                        <i className="material-icons">view_list</i>
                    </FontIcon>
                </IconButton>
            </TableRowColumn>
        </TableRow>
    );
};

ShoppingListComponent.propTypes = {
    shoppinglist: PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        notify_date: PropTypes.string.isRequired,
        date_created: PropTypes.string.isRequired,
        date_modified: PropTypes.string.isRequired,
    }).isRequired,
    handleOpenItemsView: PropTypes.func.isRequired,
    onExecuteAction: PropTypes.func.isRequired,
    // history: PropTypes.object.isRequired,
};

export default ShoppingListComponent;
