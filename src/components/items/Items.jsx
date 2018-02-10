import React from 'react';
import PropTypes from 'prop-types';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
} from 'material-ui/Table';
import Item from './Item';

const Items = ({ items, onExecuteAction }) => (
    <div>
        {items &&
            items.length > 0 && (
                <Table>
                    <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn> Name </TableHeaderColumn>
                            <TableHeaderColumn> Price </TableHeaderColumn>
                            <TableHeaderColumn> Quantity </TableHeaderColumn>
                            <TableHeaderColumn> Bought </TableHeaderColumn>
                            <TableHeaderColumn> Date Created </TableHeaderColumn>
                            <TableHeaderColumn> Date Modified </TableHeaderColumn>
                            <TableHeaderColumn> Actions </TableHeaderColumn>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {items.map(item => (
                            <Item
                                key={item.id}
                                item={item}
                                onExecuteAction={onExecuteAction}
                            />
                        ))}
                    </TableBody>
                </Table>
            )}
    </div>
);

Items.defaultProps = {
    items: [],
};

Items.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        quantity: PropTypes.string.isRequired,
        has_been_bought: PropTypes.bool.isRequired,
        date_created: PropTypes.string.isRequired,
        date_modified: PropTypes.string.isRequired,
    }.isRequired)),
    onExecuteAction: PropTypes.func.isRequired,
};

export default Items;
