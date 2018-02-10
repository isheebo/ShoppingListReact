import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Items from '../../components/items/Items';
import ItemDialog from '../../components/items/ItemDialog';
import * as itemActions from '../../actions/listActions';

const initialState = {
    open: false,
    item: {
        name: '',
        price: '',
        quantity: '',
        has_been_bought: false,
    },
};

class ItemsContainer extends React.Component {
    state = {
        ...initialState,
        items: this.props.items, // from the items reducer
        dialogTitle: '',
        buttonLabel: '',
        // isFetching: this.props.isFetching,
        // are we loading items from the server
    };

    componentWillReceiveProps = (nextProps) => {
        const { items } = nextProps;
        this.setState({ items });
    };

    onTextChange = (event) => {
        const item = { ...this.state.item };
        item[event.target.name] = event.target.value;
        this.setState({ item });
    };

    toggleBoughtStatus = () => {
        const { item } = this.state;
        item.has_been_bought = !item.has_been_bought;
        this.setState({ item });
    };
    /**
     * Convert the action type to title case
     * and display it as the dialog title
     */
    toTitleCase = actionType =>
        actionType.replace(
            /\w\S*/g,
            txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
        );

    handleOpen = (item = this.state.item, action) => {
        this.setState({
            open: true,
            dialogTitle: this.toTitleCase(action.type),
            item: { ...item },
            buttonLabel: action.type.split(' ')[0],
        });
    };

    handleClose = () => {
        this.setState({
            open: false,
        });
    };

    doAction = () => {
        const { dialogTitle, item } = this.state;

        switch (dialogTitle) {
        case 'Delete Item':
            this.deleteItem(item);
            break;
        case 'Edit Item':
            this.editItem(item);
            break;
        case 'Add Item':
            this.createItem();
            break;
        default:
            break;
        }
    };

    createItem = () => {
        const { item } = this.state;
        const formData = new FormData();
        formData.set('name', item.name);
        formData.set('price', item.price);
        formData.set('quantity', item.quantity);
        formData.set('status', item.has_been_bought);
        this.props.actions.createNewItem(this.props.listID, formData);
    };

    editItem = (item) => {
        const formData = new FormData();
        formData.set('name', item.name);
        formData.set('price', item.price);
        formData.set('quantity', item.quantity);
        formData.set('status', item.has_been_bought);
        this.props.actions.editItem(this.props.listID, item.id, formData);
    };

    deleteItem = (item) => {
        this.props.actions.deleteItem(this.props.listID, item.id);
    };

    render() {
        const { items } = this.state;
        return (
            <div>
                <FloatingActionButton
                    style={{
                        margin: 0,
                        top: 'auto',
                        right: '16%',
                        bottom: '6.5vh',
                        left: 'auto',
                        position: 'fixed',
                        zIndex: 1000000,
                    }}
                    onClick={() =>
                        this.handleOpen(initialState.shoppinglist, {
                            type: 'add shoppinglist',
                        })
                    }
                >
                    <ContentAdd />
                </FloatingActionButton>

                <ItemDialog
                    state={{ ...this.state }}
                    handleClose={this.handleClose}
                    onTextChange={this.onTextChange}
                    doAction={this.doAction}
                />

                <Items onExecuteAction={this.handleOpen} items={items} />
            </div>
        );
    }
}

ItemsContainer.defaultProps = {
    items: [],
};

ItemsContainer.propTypes = {
    actions: PropTypes.shape({
        createNewItem: PropTypes.func.isRequired,
        editItem: PropTypes.func.isRequired,
        deleteItem: PropTypes.func.isRequired,
    }).isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        quantity: PropTypes.string.isRequired,
        has_been_bought: PropTypes.bool.isRequired,
        date_created: PropTypes.string.isRequired,
        date_modified: PropTypes.string.isRequired,
    })),
    listID: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
    items: state.items.items,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ ...itemActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemsContainer);
