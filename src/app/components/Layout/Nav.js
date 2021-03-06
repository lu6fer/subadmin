/* eslint-disable no-nested-ternary */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import cx from 'classname';
import SocialPeople from 'material-ui/svg-icons/social/people';
import Paper from 'material-ui/Paper';

import style from './Nav.scss';

const Nav = ({ expanded, toggleMenu, block, router, theme }) => {
    const isActive = (path, strict) => (
        router.isActive(path, strict)
    );

    const navClass = cx(style.nav, {
        [style.nav_expanded]: expanded
    });
    const menuClass = style.nav__menu;
    const itemClass = style.nav__item;

    const subMenuClass = (path, strict = false) => (
        cx(style.nav__submenu, {
            [style.nav__submenu_expanded]: expanded,
            [style.nav__submenu_active]: isActive(path, strict)
        })
    );


    const textClass = (path, strict = false) => (
        cx(style.nav__text, {
            [style.nav__text_active]: isActive(path, strict),
            [style.nav__text_expanded]: expanded
        })
     );

    const iconClass = (path, strict = false) => (
        cx(style.nav__icon, {
            [style.nav__icon_active]: isActive(path, strict),
            [style.nav__icon_expanded]: expanded
        })
    );

    const subItemClass = (path, strict = false) => (
        cx(style.nav__subitem, {
            [style.nav__subitem_expanded]: expanded,
            [style.nav__subitem_active]: isActive(path, strict)
        })
    );

    const handleMouseEnter = () => {
        if (!block) {
            toggleMenu(!expanded);
        }
    };

    const handleMouseLeave = () => {
        if (!block) {
            toggleMenu(!expanded);
        }
    };

    return (
        <Paper
            className={navClass}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            rounded={false}
        >
            <ul>
                <li className={menuClass}>
                    <Link
                        to="/utilisateurs"
                        className={itemClass}
                    >
                        <div
                            className={iconClass('/utilisateurs')}
                            style={{
                                color: isActive('/utilisateurs') ?
                                    theme.floatingActionButton.secondaryIconColor :
                                    theme.floatingActionButton.disabledTextColor,
                                backgroundColor: isActive('/utilisateurs') ?
                                    theme.floatingActionButton.secondaryColor :
                                    theme.floatingActionButton.disabledColor,
                                boxShadow: theme.paper.zDepthShadows[1]
                            }}
                        >
                            <SocialPeople />
                        </div>
                        <span
                            className={textClass('/utilisateurs')}
                            style={{
                                color: isActive('/utilisateurs', true) ?
                                    theme.floatingActionButton.secondaryColor :
                                    theme.floatingActionButton.disabledColor
                            }}
                        >
                            Utilisateurs
                        </span>
                    </Link>
                </li>
                <ul>
                    <li
                        className={style.nav__submenu_before}
                        style={{
                            borderLeft: isActive('/utilisateurs/ajout', true) ?
                                `1px dashed ${theme.floatingActionButton.secondaryColor}` :
                                `1px dashed ${theme.floatingActionButton.disabledColor}`
                        }}
                    >
                        <div className={subMenuClass('/utilisateurs/ajout', true)}>
                            <div
                                className={style.nav__subitem_before}
                                style={{
                                    borderBottom: expanded ?
                                        isActive('/utilisateurs/ajout', true) ?
                                            `1px dashed ${theme.floatingActionButton.secondaryColor}` :
                                            `1px dashed ${theme.floatingActionButton.disabledColor}`
                                        : 'none'
                                }}
                            >
                                <Link
                                    to={'/utilisateurs/ajout'}
                                    className={subItemClass('/utilisateurs/ajout', true)}
                                >
                                    <span
                                        className={textClass('/utilisateurs/ajout', true)}
                                        style={{
                                            color: isActive('/utilisateurs/ajout', true) ?
                                                theme.floatingActionButton.secondaryColor :
                                                theme.floatingActionButton.disabledColor
                                        }}
                                    >
                                        Ajouter
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </li>
                </ul>
            </ul>
        </Paper>
    );
};

Nav.propTypes = {
    expanded: PropTypes.bool.isRequired,
    toggleMenu: PropTypes.func,
    block: PropTypes.bool,
    router: PropTypes.object,
    theme: PropTypes.object
};


export default Nav;
/* eslint-enable no-nested-ternary */
