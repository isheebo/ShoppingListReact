import React from 'react';
import PropTypes from 'prop-types';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
} from 'material-ui/Table';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import { Card, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Item from './Item';
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
 * A table view of items on a user's specified shopping list
 */
const Items = ({
    listItems,
    onExecuteAction,
    searchQuery,
    isFetching,
    numberOfItemsPerPage,
    onUpdateRows,
    page,
}) => {
    const items = listItems.filter(item => item.name.indexOf(searchQuery) !== -1);
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
                    items &&
                    items.length > 0 && (
                        <div>
                            <Table>
                                <TableHeader
                                    adjustForCheckbox={false}
                                    displaySelectAll={false}
                                >
                                    <TableRow>
                                        <TableHeaderColumn> Name </TableHeaderColumn>
                                        <TableHeaderColumn>Price</TableHeaderColumn>
                                        <TableHeaderColumn>
                                            Quantity
                                        </TableHeaderColumn>
                                        <TableHeaderColumn>Bought</TableHeaderColumn>
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
                                    {items
                                        .slice(
                                            page * numberOfItemsPerPage -
                                                numberOfItemsPerPage,
                                            page * numberOfItemsPerPage,
                                        )
                                        .map(item => (
                                            <Item
                                                key={item.id}
                                                item={item}
                                                onExecuteAction={onExecuteAction}
                                            />
                                        ))}
                                </TableBody>
                            </Table>
                            <Divider />
                            <Pagination
                                total={items.length}
                                page={page}
                                numberOfRows={numberOfItemsPerPage}
                                rowsPerPage={[5, 10, 15]}
                                updateRows={onUpdateRows}
                                rowsPerPageTitle="Items Per Page:"
                            />
                        </div>
                    )}
                {!isFetching &&
                    items.length === 0 &&
                    (searchQuery ? (
                        <h3 style={noStyle}>No items found! </h3>
                    ) : (
                        <h3 style={noStyle}>No items have been added yet</h3>
                    ))}
            </CardText>
        </Card>
    );
};

Items.defaultProps = {
    listItems: [],
};

Items.propTypes = {
    listItems: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        quantity: PropTypes.string.isRequired,
        has_been_bought: PropTypes.bool.isRequired,
        date_created: PropTypes.string.isRequired,
        date_modified: PropTypes.string.isRequired,
    }.isRequired)),
    page: PropTypes.number.isRequired,
    numberOfItemsPerPage: PropTypes.number.isRequired,
    searchQuery: PropTypes.string.isRequired,
    onUpdateRows: PropTypes.func.isRequired,
    onExecuteAction: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
};

export default Items;
