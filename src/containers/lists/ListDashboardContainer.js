import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ListDashboard from '../../components/lists/ListDashboard';
import ListDialog from '../../components/lists/ListDialog';
import * as listActions from '../../actions/listActions';
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
        shoppinglist.notifyDate = date.toDateString(); // this needs revision
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

    doAction = (dialogTitle = this.state.dialogTitle) => {
        const { shoppinglist } = this.state;

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
        this.props.actions.createShoppingList(shoppinglist);
        this.reset();
    };

    deleteShoppinglist = (shoppinglist) => {
        this.props.actions.deleteShoppingList(shoppinglist);
        this.reset();
    };

    editshoppinglist = (shoppinglist) => {
        this.props.actions.editshoppingList(shoppinglist);
        this.reset();
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
        editshoppingList: PropTypes.func.isRequired,
        createShoppingList: PropTypes.func.isRequired,
        deleteShoppingList: PropTypes.func.isRequired,
        logoutUser: PropTypes.func.isRequired,
    }).isRequired,

    shoppinglists: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.number,
        dateCreated: PropTypes.string,
        dateModified: PropTypes.string,
        notifyDate: PropTypes.string,
    })),
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
};

ListDashboardContainer.contextTypes = {
    router: PropTypes.object,
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ ...listActions, logoutUser }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListDashboardContainer);