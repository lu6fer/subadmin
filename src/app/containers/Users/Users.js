import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';
import { red500 } from 'material-ui/styles/colors';
import SocialSentimentVeryDissatisfied from 'material-ui/svg-icons/social/sentiment-very-dissatisfied';
// import _ from 'lodash';

import style from './Users.scss';
import AppActions from '../../actions/AppActions';
import UserTable from '../UsersTable/UsersTable';
// import Error from '../../components/Error/Error';

class Users extends React.Component {

    static propTypes = {
        users: PropTypes.object,
        actions: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.props.actions.fetchUsers();
    }

    render() {
        const progressClass = [style.progress];
        const usersClass = [style.users, style.users_hidden];
        const errorClass = [style.error, style.error_hidden];
        if (!this.props.users.loading) {
            progressClass.push([style.progress_hidden]);
            if (!this.props.users.error) {
                usersClass.pop();
            } else {
                errorClass.pop();
            }
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
                        sort={this.props.actions.sortUsers}
                        sortDirection={this.props.users.sort.direction}
                        sortField={this.props.users.sort.field}
                    />
                </div>
                <div className={errorClass.join(' ')}>
                    <SocialSentimentVeryDissatisfied
                        className={style.error__background}
                    />
                    <Snackbar
                        open={this.props.users.error}
                        message={
                            <ul>
                                {this.props.users.errorMessages.map((message, id) => (
                                    <li key={id}>{message}</li>
                                ))}
                            </ul>
                        }
                        className={style.error__message}
                        bodyStyle={{
                            height: 'auto',
                            lineHeight: 'inherit',
                            backgroundColor: red500
                        }}
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
