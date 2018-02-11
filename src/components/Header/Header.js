import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import SearchBar from './SearchBar';

class Header extends React.Component {
    componentWillMount = () => {
        this.props.actions.viewAllLists();
    };

    render() {
        const { onQueryChange, actions, title } = this.props;

        return (
            <div>
                <AppBar
                    title={title}
                    titleStyle={{
                        color: '#f5f5f5',
                        fontSize: 20,
                        display: 'flex',
                    }}
                    style={{
                        backgroundColor: '#000',
                        paddingLeft: '15%',
                        paddingRight: '15%',
                    }}
                    iconElementRight={
                        <SearchBar
                            onQueryChange={onQueryChange}
                            viewAllLists={actions.viewAllLists}
                        />
                    }
                />
            </div>
        );
    }
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    onQueryChange: PropTypes.isRequired,
    actions: PropTypes.shape({
        viewAllLists: PropTypes.func.isRequired,
    }).isRequired,
};

export default Header;
