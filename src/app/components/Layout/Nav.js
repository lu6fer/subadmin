import React, { PropTypes } from 'react';
import style from './Nav.scss';

const Nav = ({ expanded }) => {
    const className = [style.nav];
    if (expanded) {
        className.push(style.expand);
    }

    return (
        <div className={className.join(' ')}>
            nav
        </div>
    );
};

Nav.propTypes = {
    expanded: PropTypes.bool.isRequired
};


export default Nav;
