import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';

class Header extends React.Component {
    render() {
        const { title, iconElementRight } = this.props;

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
                    iconElementRight={iconElementRight}
                />
            </div>
        );
    }
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    iconElementRight: PropTypes.element.isRequired,
};

export default Header;
