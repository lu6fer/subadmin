import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import cx from 'classname';
import SocialPeople from 'material-ui/svg-icons/social/people';

import style from './Nav.scss';

const Nav = ({ expanded, toggleMenu, block }) => {
    const navClass = cx(style.nav, {
        [style.nav_expanded]: expanded
    });
    const menuClass = style.nav__menu;
    const subMenuClass = cx(style.nav__submenu, {
        [style.nav__submenu_expanded]: expanded
    });
    const itemClass = style.nav__item;
    const subItemClass = cx(style.nav__subitem, {
        [style.nav__subitem_expanded]: expanded
    });
    const iconClass = style.nav__icon;
    const textClass = cx(style.nav__text, {
        [style.nav__text_expanded]: expanded
    });

    const handleMouseOver = () => {
        if (!block) {
            toggleMenu(!expanded);
        }
    };

    const handleMouseOut = () => {
        if (!block) {
            toggleMenu(!expanded);
        }
    };

    return (
        <div
            className={navClass}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
        >
            <ul>
                <li className={menuClass}>
                    <Link
                        to="/utilisateurs"
                        activeClassName={style.nav__item_active}
                        className={itemClass}
                    >
                        <div className={iconClass}>
                            <SocialPeople />
                        </div>
                        <span className={textClass}>Utilisateurs</span>
                    </Link>
                </li>
                <ul>
                    <li className={subMenuClass}>
                        <Link
                            to={'/utilisateurs/ajout'}
                            activeClassName={style.nav__subitem_active}
                            className={subItemClass}
                        >
                            <span className={textClass}>Ajouter</span>
                        </Link>
                    </li>
                </ul>
            </ul>
        </div>
    );
};

Nav.propTypes = {
    expanded: PropTypes.bool.isRequired,
    toggleMenu: PropTypes.func,
    block: PropTypes.bool
};


export default Nav;
