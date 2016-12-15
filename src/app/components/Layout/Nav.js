import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import style from './Nav.scss';

const Nav = ({ expanded }) => {
    const className = [style.nav];
    if (expanded) {
        className.push(style.nav_expand);
    }

    return (
        <div className={className.join(' ')}>
            <ul>
                <li><Link to={'/users'}>Users</Link></li>
            </ul>
        </div>
    );
};

Nav.propTypes = {
    expanded: PropTypes.bool.isRequired
};


export default Nav;
