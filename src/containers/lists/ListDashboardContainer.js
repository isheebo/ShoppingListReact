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

const initialState = {
    open: false,
    shoppinglist: {
        name: '',
        notifyDate: null,
    },
};

class ListDashboardContainer extends React.Component {
    state = {
        ...initialState,
        shoppinglists: this.props.shoppinglists,
        searchQuery: '',
        dialogTitle: '',
        buttonLabel: 'ADD',
        floatingLabelText: '',
        isFetching: true, // make it false
    };

    componentDidMount = () => {
        // You've got to handle errors for unauthorised users
        // like if users are not authorised, they should be
        // redirected to the login page
        this.loadShoppingLists();
    };

    componentWillReceiveProps = (nextProps) => {
        const { shoppinglists } = nextProps;
        this.setState({ shoppinglists });
    };

    onTextChange = (event) => {
        const shoppinglist = { ...this.state.shoppinglist };
        shoppinglist[event.target.name] = event.target.value;
        this.setState({ shoppinglist });
    };

    onDateChange = (date) => {
        const shoppinglist = { ...this.state.shoppinglist };
        shoppinglist.notifyDate = formatDate(date);
        this.setState({ shoppinglist });
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
            isFetching: false,
        });

        switch (action.type) {
        case 'delete shoppinglist':
            this.setState({
                buttonLabel: 'DELETE',
            });
            break;

        case 'edit shoppinglist':
            this.setState({
                buttonLabel: 'EDIT',
                floatingLabelText: 'Name',
            });
            break;

        case 'add shoppinglist':
            this.setState({
                buttonLabel: 'ADD',
                floatingLabelText: 'Name',
            });
            break;

        default:
            break;
        }
    };

    handleClose = () => {
        this.setState({
            open: false,
        });
    };

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

    reset = () => {
        this.setState({ ...initialState });
    };

    loadShoppingLists = () => {
        // return all shoppinglists
        this.props.actions.viewAllLists();
    };

    createShoppinglist = () => {
        const { shoppinglist } = this.state;
        const formData = new FormData();
        formData.set('name', shoppinglist.name);
        formData.set('notify_date', shoppinglist.notifyDate);

        this.props.actions.createShoppingList(formData);
        this.reset();
        this.loadShoppingLists();
    };

    deleteShoppinglist = (shoppinglist) => {
        this.props.actions.deleteShoppingList(shoppinglist.id);
        this.reset();
        this.loadShoppingLists();
    };

    editshoppinglist = (shoppinglist) => {
        const formData = new FormData();
        formData.set('name', shoppinglist.name);
        formData.set('notify_date', shoppinglist.notifyDate);

        // BUG! If I change the notify date, I am not able to edit the list.
        //  error: the acceptable date format is 'yyyy-mm-dd'
        this.props.actions.editShoppingList(shoppinglist.id, formData);

        this.reset();
        this.loadShoppingLists();
    };

    logout = () => {
        this.props.history.push('/login');
        this.props.actions.logoutUser();
    };

    render() {
        const { searchQuery, shoppinglists, isFetching } = this.state;

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

                <ListDialog
                    state={{ ...this.state }}
                    handleOpen={this.handleOpen}
                    handleClose={this.handleClose}
                    onTextChange={this.onTextChange}
                    onDateChange={this.onDateChange}
                    doAction={this.doAction}
                />

                <ListDashboard
                    searchQuery={searchQuery}
                    shoppinglists={shoppinglists}
                    onExecuteAction={this.handleOpen}
                    isFetching={isFetching}
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
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
};

ListDashboardContainer.contextTypes = {
    router: PropTypes.object,
};

const mapStateToProps = state => ({
    shoppinglists: state.lists.shoppinglists,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ ...listActions, logoutUser }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListDashboardContainer);
