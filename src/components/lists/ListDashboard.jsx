import React from 'react';
import PropTypes from 'prop-types';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
} from 'material-ui/Table';
import { Card, CardText } from 'material-ui/Card';
import ShoppingListComponent from './ShoppingListComponent';

const noStyle = {
    top: '20px',
    height: '100',
    width: '70%',
    margin: '0px auto',
    textAlign: 'center',
    color: '#A4A4A4',
    padding: '20px',
};

const ListDashboard = ({
    shoppinglists,
    onExecuteAction,
    searchQuery,
    // isFetching,
    handleOpenItemsView,
    history,
}) => {
    // eslint-disable-next-line
    const shoppingLists = shoppinglists.filter(
        shoppingList => shoppingList.name.indexOf(searchQuery) !== -1);
    return (
        <Card
            style={{
                float: 'center',
                padding: '10px',
                marginTop: '20px',
                marginLeft: '220px',
                marginBottom: '20px',
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
        >
            <CardText>
                {shoppingLists.length > 0 && (
                    <Table>
                        <TableHeader
                            displaySelectAll={false}
                            adjustForCheckbox={false}
                        >
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
                                    history={history}
                                    handleOpenItemsView={handleOpenItemsView}
                                />
                            ))}
                        </TableBody>
                    </Table>
                )}

                {shoppingLists.length === 0 &&
                    (searchQuery ? (
                        <h3 style={noStyle}> No shoppinglist found!</h3>
                    ) : (
                        <h3 style={noStyle}>
                            {' '}
                            Get Started by creating a shopping list
                        </h3>
                    ))}
            </CardText>
        </Card>
    );
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
    handleOpenItemsView: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,

    // isFetching: PropTypes.bool.isRequired,
};

export default ListDashboard;
