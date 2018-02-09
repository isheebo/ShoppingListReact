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

const noStyle = {
    top: '20px',
    height: '100',
    width: '70%',
    margin: '0px auto',
    textAlign: 'center',
    color: '#00bcd4',
    padding: '20px',
};

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
        <Card
            style={{
                float: 'center',
                padding: '10px',
                margin: '0 auto',
                backgroundColor: '#fff',
                width: '70%',
                height: '89vh',
                botton: 10,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'stretch',
                borderRadius: '0px 0px 3px 3px',
                overflow: 'scroll',
            }}
            // className="card"
        >
            {/* Check if we are fetching data from the server  */}
            {isFetching}
            {shoppingLists.length > 0 && (
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
            )}

            {shoppingLists.length === 0 &&
                (searchQuery ? (
                    <h3 style={noStyle}> No shoppinglist found!</h3>
                ) : (
                    <h3 style={noStyle}> Get Started by creating a shopping list</h3>
                ))}
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
        notify_date: PropTypes.string,
        date_created: PropTypes.string,
        date_modified: PropTypes.string,
    })),
    searchQuery: PropTypes.string.isRequired,
    onExecuteAction: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
};

export default ListDashboard;
