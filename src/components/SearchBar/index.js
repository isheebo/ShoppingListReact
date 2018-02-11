import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField/TextField';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const SearchBar = ({ onQueryChange }) => (
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
            onKeyPress={(event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                }
            }}
            underlineShow={false}
        />
        <div>
            <IconMenu
                iconButtonElement={
                    <IconButton>
                        <MoreVertIcon color="#fff" />
                    </IconButton>
                }
                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
                <MenuItem primaryText="Reset Password" />
                <MenuItem primaryText="Sign out" />
            </IconMenu>
        </div>
    </div>
);

SearchBar.propTypes = {
    onQueryChange: PropTypes.func.isRequired,
};

export default SearchBar;
