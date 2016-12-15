import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CircularProgress from 'material-ui/CircularProgress';
// import _ from 'lodash';

import style from './Users.scss';
import AppActions from '../../actions/AppActions';
import UserTable from '../UsersTable/UsersTable';

class Users extends React.Component {

    static propTypes = {
        users: PropTypes.object,
        // filteredUser: PropTypes.object,
        actions: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.props.actions.fetchUsers();
    }

    render() {
        const progressClass = [style.progress];
        const usersClass = [style.users, style.users_hidden];
        if (!this.props.users.loading) {
            progressClass.push(style.progress_hidden);
            usersClass.pop();
        }

        return (
            <div>
                <CircularProgress className={progressClass.join(' ')} />
                <div className={usersClass.join(' ')}>
                    <UserTable
                        users={this.props.users.users}
                        filter={this.props.actions.filterUsers}
                        filterField={this.props.users.filter.field}
                        filterText={this.props.users.filter.text}
                    />
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
