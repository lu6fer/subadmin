import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CircularProgress from 'material-ui/CircularProgress';

import style from './Users.scss';
import AppActions from '../../actions/AppActions';
import UserTable from '../../components/UsersTable/UsersTable';

class Users extends React.Component {

    static propTypes = {
        users: PropTypes.object,
        actions: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.props.actions.fetchUsers();
    }

    render() {
        const progress = !this.props.users.loading ?
            [] :
            [<CircularProgress />];

        return (
            <div className={style.users}>
                {progress}
                <div>
                    <UserTable users={this.props.users.users} />
                </div>
            </div>
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
function mapStateToProps(state) {
    return {
        users: state.users
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

export default connect(mapStateToProps, mapDispatchToProps)(Users);
