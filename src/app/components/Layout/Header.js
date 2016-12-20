import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import style from './Header.scss';

const Header = ({ toggleMenu, expanded, block }) => (
    <div className={style.header}>
        <AppBar
            title={'administration'}
            onLeftIconButtonTouchTap={
                () => {
                    toggleMenu(!expanded, !block);
                }
            }
        />
    </div>
);

Header.propTypes = {
    toggleMenu: PropTypes.func.isRequired,
    expanded: PropTypes.bool.isRequired,
    block: PropTypes.bool
};

export default Header;
