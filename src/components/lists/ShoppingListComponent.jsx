import React from 'react';
import { PropTypes } from 'prop-types';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import Moment from 'moment';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';

const ShoppingListComponent = ({ shoppinglist, onExecuteAction }) => {
    const handleClick = (action) => {
        onExecuteAction(shoppinglist, action);
    };

    return (
        <div>
            <TableRow>
                <TableRowColumn>
                    <FlatButton
                        onClick={() => handleClick({ type: 'view shoppinglist' })}
                    >
                        {shoppinglist.name}
                    </FlatButton>
                </TableRowColumn>

                <TableRowColumn>
                    {Moment(shoppinglist.notifyDate).format('MMMM Do YYYY, h:mm:ss a')}
                </TableRowColumn>

                <TableRowColumn>
                    {Moment(shoppinglist.dateCreated).format('MMMM Do YYYY, h:mm:ss a')}
                </TableRowColumn>

                <TableRowColumn>
                    {Moment(shoppinglist.dateModified).format('MMMM Do YYYY, h:mm:ss a')}
                </TableRowColumn>
                <TableRowColumn>
                    <IconButton
                        iconStyle={{ color: '#00bcd4' }}
                        onClick={() => handleClick({ type: 'add item' })}
                    >
                        <FontIcon
                            className="material-icons"
                            style={{
                                marginRight: 24,
                                color: '#00bcd4',
                                padding: 5,
                            }}
                        >
                            <i className="material-icons">add_circle</i>
                        </FontIcon>
                    </IconButton>

                    <IconButton
                        iconStyle={{ color: '#00bcd4' }}
                        onClick={() => handleClick({ type: 'edit shoppinglist' })}
                    >
                        <FontIcon
                            className="material-icons"
                            style={{ marginRight: 24, color: '#00bcd4', padding: 5 }}
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
                </TableRowColumn>
            </TableRow>
        </div>
    );
};

ShoppingListComponent.propTypes = {
    shoppinglist: PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        notifyDate: PropTypes.string.isRequired,
        dateCreated: PropTypes.string.isRequired,
        dateModified: PropTypes.string.isRequired,
    }).isRequired,
    onExecuteAction: PropTypes.func.isRequired,
};

export default ShoppingListComponent;
