import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Items from '../../components/items/Items';
import ItemDialog from '../../components/items/ItemDialog';
import * as itemActions from '../../actions/itemActions';
import Header from '../../components/Header/Header';
import SearchBar from '../../components/SearchBar';

const initialState = {
    open: false,
    item: {
        name: '',
        price: '',
        quantity: '',
    },
};

class ItemsContainer extends React.Component {
    state = {
        ...initialState,
        dialogTitle: '',
        buttonLabel: '',
        searchQuery: '',
        checked: false, // representing whether an item has been bought
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

    onUpdateCheck = () => {
        this.setState(prevState => ({
            checked: !prevState.checked,
        }));
    };

    onQueryChange = (event) => {
        this.setState({ searchQuery: event.target.value });
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

    reset = () => {
        this.setState({ ...initialState });
    };

    loadItems = () => {
        this.props.actions.viewAllItemsInList(this.props.match.params.id);
    };

    createItem = () => {
        const { item, checked } = this.state;
        const formData = new FormData();
        formData.set('name', item.name);
        formData.set('price', item.price);
        formData.set('quantity', item.quantity);
        formData.set('status', checked);
        this.props.actions.createNewItem(this.props.match.params.id, formData);
        this.reset();
        this.loadItems();
    };

    editItem = (item) => {
        const { checked } = this.state;
        const formData = new FormData();
        formData.set('name', item.name);
        formData.set('price', item.price);
        formData.set('quantity', item.quantity);
        formData.set('status', checked);
        this.props.actions.editItem(this.props.match.params.id, item.id, formData);
        this.reset();
        this.loadItems();
    };

    deleteItem = (item) => {
        this.props.actions.deleteItem(this.props.match.params.id, item.id);
        this.reset();
        this.loadItems();
    };

    logout = () => {
        this.props.actions.logoutUser(this.props.history);
    };

    render() {
        const { checked, searchQuery } = this.state;
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
                    checked={checked}
                    onCheck={this.onUpdateCheck}
                />

                <Items
                    onExecuteAction={this.handleOpen}
                    listItems={this.props.items}
                    searchQuery={searchQuery}
                    isFetching={this.props.isFetching}
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
    actions: bindActionCreators({ ...itemActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemsContainer);
