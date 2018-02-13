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
import Divider from 'material-ui/Divider';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import ShoppingListComponent from './ShoppingListComponent';
import Pagination from '../pagination/Pagination';

const noStyle = {
    top: '20px',
    height: '100',
    width: '70%',
    margin: '0px auto',
    textAlign: 'center',
    color: '#A4A4A4',
    padding: '20px',
};

/**
 * A view of all shoppinglists added/owned by the logged in user
 */

const ListDashboard = ({
    shoppinglists,
    onExecuteAction,
    searchQuery,
    isFetching,
    handleOpenItemsView,
    history,
    onUpdateRows,
    numberOfListsPerPage,
    page,
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
                {isFetching && (
                    <RefreshIndicator
                        size={50}
                        left={70}
                        top={0}
                        loadingColor="#FF9800"
                        status="loading"
                        style={{ display: 'inline-block', position: 'relative' }}
                    />
                )}
                {!isFetching &&
                    shoppingLists.length > 0 && (
                        <div>
                            <Table>
                                <TableHeader
                                    displaySelectAll={false}
                                    adjustForCheckbox={false}
                                >
                                    <TableRow>
                                        <TableHeaderColumn>Name</TableHeaderColumn>
                                        <TableHeaderColumn>
                                            Notify Date
                                        </TableHeaderColumn>
                                        <TableHeaderColumn>
                                            Date Created
                                        </TableHeaderColumn>
                                        <TableHeaderColumn>
                                            Date Modified
                                        </TableHeaderColumn>
                                        <TableHeaderColumn>
                                            Actions
                                        </TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {shoppingLists
                                        .slice(
                                            page * numberOfListsPerPage -
                                                numberOfListsPerPage,
                                            page * numberOfListsPerPage,
                                        )

                                        .map(shoppingList => (
                                            <ShoppingListComponent
                                                key={shoppingList.id}
                                                shoppinglist={shoppingList}
                                                onExecuteAction={onExecuteAction}
                                                history={history}
                                                handleOpenItemsView={
                                                    handleOpenItemsView
                                                }
                                            />
                                        ))}
                                </TableBody>
                            </Table>
                            <Divider />
                            <Pagination
                                total={shoppingLists.length}
                                page={page}
                                numberOfRows={numberOfListsPerPage}
                                rowsPerPage={[5, 10, 15]}
                                updateRows={onUpdateRows}
                                rowsPerPageTitle="Lists Per Page:"
                            />
                        </div>
                    )}

                {!isFetching &&
                    shoppingLists.length === 0 &&
                    (searchQuery ? (
                        <h3 style={noStyle}> No shoppinglist found!</h3>
                    ) : (
                        <h3 style={noStyle}>
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
    page: PropTypes.number.isRequired,
    numberOfListsPerPage: PropTypes.number.isRequired,
    onExecuteAction: PropTypes.func.isRequired,
    handleOpenItemsView: PropTypes.func.isRequired,
    onUpdateRows: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
};

export default ListDashboard;
