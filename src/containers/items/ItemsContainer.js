import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Items from '../../components/items/Items';
import ItemDialog from '../../components/items/ItemDialog';
import * as itemActions from '../../actions/itemActions';
import { logoutUser } from '../../actions/authActions';
import Header from '../../components/Header/Header';
import SearchBar from '../../components/SearchBar';

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
        dialogTitle: '',
        buttonLabel: '',
        searchQuery: '',
        quantityErrorText: '',
        priceErrorText: '',
        page: 1,
        numberOfItemsPerPage: 5,
    };

    componentWillMount = () => {
        if (!this.props.isAuthenticated) {
            this.props.history.push('/');
        }
    };

    componentDidMount = () => {
        this.loadItems();
    };

    onTextChange = (event) => {
        const item = { ...this.state.item };
        item[event.target.name] = event.target.value;
        this.setState({ item });
    };

    /**
     *  A helper function for displaying error messages once
     * an error is encountered while adding an item's price
     */
    onPriceError = (error) => {
        let priceErrorText;
        switch (error) {
        case 'required':
            priceErrorText = 'This field is required';
            break;
        case 'invalidSymbol':
            priceErrorText = 'only numerical input is allowed';
            break;
        case 'incompleteNumber':
            priceErrorText = 'Number is incomplete';
            break;
        case 'singleFloatingPoint':
            priceErrorText = 'There is already a floating point';
            break;
        case 'singleZero':
            priceErrorText = 'Floating point is expected';
            break;
        case 'min':
            priceErrorText = 'The value of price must be greater than 0';
            break;
        case 'max':
            priceErrorText = 'Your input is too large';
            break;
        default:
        }

        this.setState({ priceErrorText });
    };

    /**
     *  A helper function for displaying error messages once
     * an error is encountered while adding an item's quantity
     */
    onQuantityError = (error) => {
        let quantityErrorText;
        switch (error) {
        case 'required':
            quantityErrorText = 'This field is required';
            break;
        case 'invalidSymbol':
            quantityErrorText = 'only numerical input is allowed';
            break;
        case 'incompleteNumber':
            quantityErrorText = 'Number is incomplete';
            break;
        case 'singleFloatingPoint':
            quantityErrorText = 'There is already a floating point';
            break;
        case 'singleZero':
            quantityErrorText = 'Floating point is expected';
            break;
        case 'min':
            quantityErrorText = 'The value of quantity must be greater than 0';
            break;
        case 'max':
            quantityErrorText = 'Your input is too large';
            break;
        default:
        }
        this.setState({ quantityErrorText });
    };

    /**
     * Once the check is updated, it updates the
     * boolean condition of whether an item has
     * been bought or not
     */
    onUpdateCheck = (event) => {
        const item = { ...this.state.item };
        item.has_been_bought = event.target.checked;
        this.setState({ item });
    };

    /**
     * Returns suggestions of prospective items at
     * lightning ⚡️⚡️⚡️😄 speeds
     */
    onQueryChange = (event) => {
        this.setState({ searchQuery: event.target.value });
    };

    onUpdateRows = (updatedState) => {
        this.setState({
            page: updatedState.page,
            numberOfItemsPerPage: updatedState.numberOfRows,
        });
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

    /**
     * Controls the type of dialog that should be opened
     * once, an action has been clicked.
     * e.g. clicking an 'add item' action fires up the 'Add Item'
     * dialog / modal and it is opened
     */
    handleOpen = (item = this.state.item, action) => {
        this.setState({
            open: true,
            dialogTitle: this.toTitleCase(action.type),
            item: { ...item },
            buttonLabel: action.type.split(' ')[0].toUpperCase(),
        });
    };

    /**
     * Controls how dialogs are closed
     */
    handleClose = () => {
        this.setState({
            open: false,
        });
    };

    /**
     * controls the action to be performed
     * depending on its type
     */
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

    /**
     * Reset the state back to its initial form.
     * More like resetting cache
     */
    reset = () => {
        this.setState({ ...initialState });
    };

    /**
     * Imports items from the API server
     */
    loadItems = () => {
        this.props.actions.viewAllItemsInList(this.props.match.params.id);
    };

    /**
     * Handles the creation of a new item
     */
    createItem = () => {
        const { item } = this.state;
        const formData = new FormData();
        formData.set('name', item.name);
        formData.set('price', item.price);
        formData.set('quantity', item.quantity);
        formData.set('status', item.has_been_bought);
        this.props.actions
            .createNewItem(this.props.match.params.id, formData)
            .then(() => {
                this.reset();
                this.loadItems();
            });
    };

    /** Handles the editing/updating of an item */
    editItem = (item) => {
        const formData = new FormData();
        formData.set('name', item.name);
        formData.set('price', item.price);
        formData.set('quantity', item.quantity);
        formData.set('status', item.has_been_bought);
        this.props.actions
            .editItem(this.props.match.params.id, item.id, formData)
            .then(() => {
                this.reset();
                this.loadItems();
            });
    };

    /**
     * Handles the deletion of an item .
     * It takes an item ID and then can delete the item
     */
    deleteItem = (item) => {
        this.props.actions
            .deleteItem(this.props.match.params.id, item.id)
            .then(() => {
                this.reset();
                this.loadItems();
            });
    };

    logout = () => {
        this.props.actions
            .logoutUser()
            .then(() => this.props.history.push('/login'));
    };

    render() {
        const { searchQuery, numberOfItemsPerPage, page } = this.state;

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
                    backgroundColor="#EC4117"
                    onClick={() =>
                        this.handleOpen(initialState.item, {
                            type: 'add item',
                        })
                    }
                >
                    <ContentAdd />
                </FloatingActionButton>

                <Header
                    title="Items"
                    iconElementRight={
                        <SearchBar
                            onQueryChange={this.onQueryChange}
                            logout={this.logout}
                        />
                    }
                />

                <ItemDialog
                    state={{ ...this.state }}
                    handleClose={this.handleClose}
                    onTextChange={this.onTextChange}
                    doAction={this.doAction}
                    onCheck={this.onUpdateCheck}
                    onQuantityError={this.onQuantityError}
                    onPriceError={this.onPriceError}
                />

                <Items
                    onExecuteAction={this.handleOpen}
                    listItems={this.props.items}
                    searchQuery={searchQuery}
                    isFetching={this.props.isFetching}
                    page={page}
                    numberOfItemsPerPage={numberOfItemsPerPage}
                    onUpdateRows={this.onUpdateRows}
                />
            </div>
        );
    }
}

ItemsContainer.defaultProps = {
    items: [],
};

ItemsContainer.propTypes = {
    actions: PropTypes.shape({
        viewAllItemsInList: PropTypes.func.isRequired,
        createNewItem: PropTypes.func.isRequired,
        editItem: PropTypes.func.isRequired,
        deleteItem: PropTypes.func.isRequired,
        logoutUser: PropTypes.func.isRequired,
    }).isRequired,
    match: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        quantity: PropTypes.string.isRequired,
        has_been_bought: PropTypes.bool.isRequired,
        date_created: PropTypes.string.isRequired,
        date_modified: PropTypes.string.isRequired,
    })),
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
};

const mapStateToProps = state => ({
    items: state.items.items,
    isFetching: state.items.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ ...itemActions, logoutUser }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemsContainer);
