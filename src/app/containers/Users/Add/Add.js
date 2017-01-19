import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import UserAdd from 'components/UserAdd/UserAdd';
import AppActions from 'actions/AppActions';

class Add extends React.Component {
    static contextTypes = {
        router: PropTypes.object,
        muiTheme: PropTypes.object
    };

    static propTypes = {
        actions: PropTypes.object
    };

    render() {
        console.log(this.test);
        return (
            <UserAdd
                back={this.context.router.goBack}
                theme={this.context.muiTheme}
                onSubmit={this.props.actions.addUser}
            />
        );
    }

}

/**
 * Map Redux store state to Component props
 *
 * @param  {Object} state Redux store state
 *
 * @return {Object}
 */
/* function mapStateToProps(state) {
    const { users } = state;
    return {
        errors: users.validationMessages
    };
} */


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

export default connect(null, mapDispatchToProps)(Add);
