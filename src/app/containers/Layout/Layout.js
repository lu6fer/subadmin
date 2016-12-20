import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import style from './Layout.scss';
import AppActions from '../../actions/AppActions';

import Header from '../../components/Layout/Header';
import Nav from '../../components/Layout/Nav';
import Footer from '../../components/Layout/Footer';

const Layout = ({ children, expanded, actions, block }) => (
    <div className={style.main}>
        <Header
            toggleMenu={actions.toggleMenu}
            expanded={expanded}
            block={block}
        />
        <div className={style.wrapper}>
            <Nav
                expanded={expanded}
                toggleMenu={actions.toggleMenu}
                block={block}
            />
            <div className={style.content}>
                {children}
            </div>
        </div>
        <Footer />
    </div>
);

Layout.propTypes = {
    children: PropTypes.object,
    expanded: PropTypes.bool,
    block: PropTypes.bool,
    actions: PropTypes.object.isRequired
};

/**
 * Map Redux store state to Component props
 *
 * @param  {Object} state Redux store state
 *
 * @return {Object}
 */
function mapStateToProps(state) {
    const { layout } = state;
    return {
        expanded: layout.menuExpanded,
        block: layout.blockExpand
    };
}

/**
 * Bind AppActions to Redux store function and map them to Component props
 *
 * @param  {Function} dispatch Redux store dispatch function
 *
 * @return {Object}
 */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(AppActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
