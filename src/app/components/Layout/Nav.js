import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import SocialPeople from 'material-ui/svg-icons/social/people';

import style from './Nav.scss';

const Nav = ({ expanded }) => {
    const navClassName = [style.nav];
    const itemClassName = [style.nav__item];
    const textClassName = [style.nav__text];
    const iconClassName = [style.nav__icon];
    if (expanded) {
        navClassName.push(style.nav_expanded);
        itemClassName.push(style.nav__item_expanded);
        textClassName.push(style.nav__text_expanded);
        iconClassName.push(style.nav__icon_expanded);
    }

    return (
        <div className={navClassName.join(' ')}>
            <ul>
                <li>
                    <Link
                        to={'/users'}
                        activeClassName={style.nav__item_active}
                        className={itemClassName.join(' ')}
                    >
                        <div className={style.nav__icon_background}>
                            <SocialPeople className={iconClassName.join(' ')} />
                        </div>
                    </Link>
                    <span className={textClassName.join(' ')}>Utilisateurs</span>
                </li>
            </ul>
        </div>
    );
};

Nav.propTypes = {
    expanded: PropTypes.bool.isRequired
};


export default Nav;
