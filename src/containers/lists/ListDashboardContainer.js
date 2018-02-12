import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ListDashboard from '../../components/lists/ListDashboard';
import ListDialog from '../../components/lists/ListDialog';
import * as listActions from '../../actions/listActions';
import formatDate from '../../utils/formatDate';
import { logoutUser } from '../../actions/authActions';
import { viewAllItemsInList } from '../../actions/itemActions';
import Header from '../../components/Header/Header';
import SearchBar from '../../components/SearchBar';

const initialState = {
    open: false,
    shoppinglist: {
        name: '',
        notify_date: null,
    },
};

class ListDashboardContainer extends React.Component {
    state = {
        ...initialState,
        searchQuery: '',
        dialogTitle: '',
        buttonLabel: '',
    };

    componentWillMount = () => {
        if (!this.props.isAuthenticated) {
            this.props.history.push('/');
        }
        // try calling viewAllItemsInList().
        // If it fails, redirect to login page
    };

    componentDidMount = () => {
        this.loadShoppingLists();
    };

    /**
     * Can we use componentWillUpdate / DidUpdate to control the update process
     * i have a feeling it may be more efficient than fetching lists from
     * the server per transaction
     */

    onTextChange = (event) => {
        const shoppinglist = { ...this.state.shoppinglist };
        shoppinglist[event.target.name] = event.target.value;
        this.setState({ shoppinglist });
    };

    /**
     * Listens for any changes with in the date picker component
     */
    onDateChange = (date) => {
        const shoppinglist = { ...this.state.shoppinglist };
        shoppinglist.notify_date = formatDate(date);
        this.setState({ shoppinglist });
    };

    /**
     * Is used to control the lists displayed,
     * once a user types in the search bar
     */
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

    /**
     * We open the dialog when we want to add a shoppinglist,
     * edit it or delete it.
     * All the other shoppinglist information is displayed on the table.
     */
    handleOpen = (shoppinglist = this.state.shoppinglist, action) => {
        this.setState({
            dialogTitle: this.toTitleCase(action.type),
            open: true,
            shoppinglist: { ...shoppinglist },
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
     * Handles opening of items view from the shoppinglists table
     */
    handleOpenItemsView = (listID) => {
        const { history } = this.props;
        this.props.actions.viewAllItemsInList(listID, history);
    };

    /**
     * controls the action to be performed
     * depending on its type
     */
    doAction = () => {
        const { dialogTitle, shoppinglist } = this.state;

        switch (dialogTitle) {
        case 'Delete Shoppinglist':
            this.deleteShoppinglist(shoppinglist);
            break;

        case 'Edit Shoppinglist':
            this.editshoppinglist(shoppinglist);
            break;

        case 'Add Shoppinglist':
            this.createShoppinglist();
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

    loadShoppingLists = () => {
        this.props.actions.viewAllLists();
    };

    createShoppinglist = () => {
        const { shoppinglist } = this.state;
        const formData = new FormData();
        formData.set('name', shoppinglist.name);
        formData.set('notify_date', shoppinglist.notify_date);

        this.props.actions.createShoppingList(formData);
        this.reset();
        this.loadShoppingLists();
    };

    editshoppinglist = (shoppinglist) => {
        const formData = new FormData();
        formData.set('name', shoppinglist.name);
        formData.set('notify_date', shoppinglist.notify_date);
        this.props.actions.editShoppingList(shoppinglist.id, formData);
        this.reset();
        this.loadShoppingLists();
    };

    deleteShoppinglist = (shoppinglist) => {
        this.props.actions.deleteShoppingList(shoppinglist.id);
        this.reset();
        this.loadShoppingLists();
    };

    logout = () => {
        this.props.history.push('/login');
        this.props.actions.logoutUser();
    };

    render() {
        const { searchQuery } = this.state;

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
                        this.handleOpen(initialState.shoppinglist, {
                            type: 'add shoppinglist',
                        })
                    }
                >
                    <ContentAdd />
                </FloatingActionButton>

                <Header
                    title="Lists"
                    iconElementRight={
                        <SearchBar
                            onQueryChange={this.onQueryChange}
                            logout={this.logout}
                        />
                    }
                />

                <ListDialog
                    state={{ ...this.state }}
                    handleClose={this.handleClose}
                    onTextChange={this.onTextChange}
                    onDateChange={this.onDateChange}
                    doAction={this.doAction}
                />

                <ListDashboard
                    searchQuery={searchQuery}
                    shoppinglists={this.props.shoppinglists}
                    onExecuteAction={this.handleOpen}
                    isFetching={this.props.isFetching}
                    history={this.props.history}
                    handleOpenItemsView={this.handleOpenItemsView}
                />
            </div>

            // Add the pagination component here inside the div
        );
    }
}

ListDashboardContainer.defaultProps = {
    shoppinglists: [],
};

ListDashboardContainer.propTypes = {
    actions: PropTypes.shape({
        viewAllItemsInList: PropTypes.func.isRequired,
        viewAllLists: PropTypes.func.isRequired,
        editShoppingList: PropTypes.func.isRequired,
        createShoppingList: PropTypes.func.isRequired,
        deleteShoppingList: PropTypes.func.isRequired,
        logoutUser: PropTypes.func.isRequired,
    }).isRequired,

    shoppinglists: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        notify_date: PropTypes.string,
        date_created: PropTypes.string,
        date_modified: PropTypes.string,
    })),
    isFetching: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
};

ListDashboardContainer.contextTypes = {
    router: PropTypes.object,
};

const mapStateToProps = state => ({
    shoppinglists: state.lists.shoppinglists,
    isFetching: state.lists.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(
        { ...listActions, logoutUser, viewAllItemsInList },
        dispatch,
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListDashboardContainer);
