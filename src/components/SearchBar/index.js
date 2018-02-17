import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField/TextField';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

const SearchBar = ({ onQueryChange, logout }) => (
    <div
        style={{
            display: 'inline-block',
            flexDirection: 'row',
            alignItems: 'center',
            width: '60.5vw',
            padding: '1%',
        }}
    >
        <TextField
            hintText={
                <div style={{ color: '#333' }}>
                    <i
                        style={{
                            verticalAlign: 'middle',
                            color: '#333',
                            marginRight: 10,
                        }}
                        className="material-icons"
                    >
                        search
                    </i>
                    Search...
                </div>
            }
            name="search"
            style={{
                float: 'left',
                backgroundColor: '#F5F5F5',
                borderRadius: 5,
                paddingLeft: 15,
                marginRight: 20,
                width: '90%',
            }}
            inputStyle={{ color: '#333' }}
            onChange={onQueryChange}
            underlineShow={false}
        />
        <div>
            <IconMenu
                iconButtonElement={
                    <IconButton iconStyle={{ color: 'white' }}>
                        <FontIcon
                            className="material-icons"
                            style={{
                                marginRight: 24,
                                padding: 5,
                            }}
                        >
                            <i className="material-icons">account_circle</i>
                        </FontIcon>
                    </IconButton>
                }
            >
                <Link to="/reset-password" style={{ textDecoration: 'none' }}>
                    <MenuItem primaryText="Reset Password" />
                </Link>
                <MenuItem primaryText="Logout" onClick={logout} />
            </IconMenu>
        </div>
    </div>
);

SearchBar.propTypes = {
    logout: PropTypes.func.isRequired,
};

SearchBar.propTypes = {
    onQueryChange: PropTypes.func.isRequired,
};

export default SearchBar;
