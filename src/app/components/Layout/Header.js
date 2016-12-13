import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import style from './Header.scss';

const Header = ({ toggleMenu, expanded }) => (
    <div className={style.header}>
        <AppBar
            title={'Subalcatel - administration'}
            onLeftIconButtonTouchTap={
                () => {
                    toggleMenu(!expanded);
                }
            }
        />
    </div>
);

Header.propTypes = {
    toggleMenu: PropTypes.func.isRequired,
    expanded: PropTypes.bool.isRequired
};

export default Header;
