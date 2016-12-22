import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import muiThemeable from 'material-ui/styles/muiThemeable';

import style from './Layout.scss';
import AppActions from '../../actions/AppActions';

import Header from '../../components/Layout/Header';
import Nav from '../../components/Layout/Nav';
import Footer from '../../components/Layout/Footer';

const Layout = ({ children, expanded, actions, block, router, muiTheme }) => (
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
                router={router}
                theme={muiTheme}
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
    actions: PropTypes.object.isRequired,
    router: PropTypes.object,
    muiTheme: PropTypes.object
};


/**
 * Map Redux store state to Component props
 *
 * @param  {Object} state Redux store state
 *
 * @return {Object}
 */
function mapStateToProps(state, context) {
    const { layout } = state;
    return {
        expanded: layout.menuExpanded,
        block: layout.blockExpand,
        router: context.router
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

export default connect(mapStateToProps, mapDispatchToProps)(
    muiThemeable()(Layout)
);
