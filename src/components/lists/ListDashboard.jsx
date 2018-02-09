import React from 'react';
import PropTypes from 'prop-types';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
} from 'material-ui/Table';
import { Card } from 'material-ui/Card';
import ShoppingListComponent from './ShoppingListComponent';

const ListDashboard = ({
    shoppinglists,
    onExecuteAction,
    searchQuery,
    isFetching,
}) => {
    // eslint-disable-next-line
    const shoppingLists = shoppinglists.filter(
        shoppingList => shoppingList.name.indexOf(searchQuery) !== -1);
    return (
        <Card>
            {/* Check if we are fetching data from the server  */}
            {isFetching}
            <Table>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn> Notify Date </TableHeaderColumn>
                        <TableHeaderColumn>Date Created</TableHeaderColumn>
                        <TableHeaderColumn>Date Modified</TableHeaderColumn>
                        <TableHeaderColumn>Actions</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {shoppingLists.map(shoppingList => (
                        <ShoppingListComponent
                            key={shoppingList.id}
                            shoppinglist={shoppingList}
                            onExecuteAction={onExecuteAction}
                        />
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
    // Do something if length of shoppinglists == 0
    // both incases where we are searching and when we are getting all the
    // output as we normally would
};

ListDashboard.defaultProps = {
    shoppinglists: [],
};

ListDashboard.propTypes = {
    shoppinglists: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.number,
        notifyDate: PropTypes.string,
        dateCreated: PropTypes.string,
        dateModified: PropTypes.string,
    })),
    searchQuery: PropTypes.string.isRequired,
    onExecuteAction: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
};

export default ListDashboard;
