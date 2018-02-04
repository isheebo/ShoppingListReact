import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AddListDialog from '../../components/lists/AddListDialog';
import { createShoppingList } from '../../actions/listActions';

/**
 * Adapted from
 * https://stackoverflow.com/questions/23593052/format-javascript-date-to-yyyy-mm-dd
 */
const formatDate = (date) => {
    const d = new Date(date);
    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    const year = d.getFullYear();

    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;

    return [year, month, day].join('-');
};

class AddListDialogContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // label: '',
            // title: '',
            // dialogTitle: '',
            name: '',
            notifyDate: new Date(),
            isOpen: false,
        };

        this.onOpenDialog = this.onOpenDialog.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onCloseDialog = this.onCloseDialog.bind(this);
        this.onDataSubmit = this.onDataSubmit.bind(this);
    }

    onOpenDialog() {
        this.setState({ isOpen: true });
    }

    onCloseDialog() {
        this.setState({ isOpen: false });
    }

    onNameChange(event) {
        this.setState({ name: event.target.value });
    }

    /**
     * Do I really need an onChange event handler for the date?
     * I am not seeing it as useful per now
     */
    onDateChange(event) {
        this.setState({ notifyDate: event.target.value });
    }

    onDataSubmit(event) {
        event.preventDefault();
        const { name, notifyDate } = this.state;
        const formData = new FormData();
        formData.append('name', name);
        formData.append('notify date', formatDate(notifyDate));
        this.props.createShoppingList(formData);
    }

    render() {
        const { name, notifyDate } = this.state;
        return (
            <div>
                <FloatingActionButton onClick={this.onOpenDialog}>
                    <ContentAdd />
                </FloatingActionButton>

                <AddListDialog
                    shoppingList={{ name, notifyDate }}
                    dialogTitle="Add"
                    buttonLabel="Add"
                    isOpen={this.state.isOpen}
                    onNameChange={this.onNameChange}
                    // onDateChange={this.onDateChange}
                    onCloseDialog={this.onCloseDialog}
                    onDataSubmit={this.onDataSubmit}
                />
            </div>
        );
    }
}

AddListDialogContainer.propTypes = {
    createShoppingList: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
    isFetching: state.lists.isFetching,
});

// eslint-disable-next-line
export default connect(mapStateToProps, { createShoppingList })(
    AddListDialogContainer);
