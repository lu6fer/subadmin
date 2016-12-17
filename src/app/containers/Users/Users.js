import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';
import { red500 } from 'material-ui/styles/colors';
import SocialSentimentVeryDissatisfied from 'material-ui/svg-icons/social/sentiment-very-dissatisfied';
// import NavigationArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward';
// import NavigationArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward';
// import ContentSort from 'material-ui/svg-icons/content/sort';

import style from './Users.scss';
import AppActions from '../../actions/AppActions';
import UserTable from '../UsersTable/UsersTable';
// import Error from '../../components/Error/Error';

class Users extends React.Component {

    static propTypes = {
        users: PropTypes.array,
        filter: PropTypes.object,
        sort: PropTypes.object,
        error: PropTypes.object,
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
                        users={this.props.users}
                        filterAction={this.props.actions.filterUsers}
                        filterData={this.props.filter}
                        sortAction={this.props.actions.sortUsers}
                        sortData={this.props.sort}
                    />
                </div>
                <div className={errorClass.join(' ')}>
                    <SocialSentimentVeryDissatisfied
                        className={style.error__background}
                    />
                    <Snackbar
                        open={this.props.error.status}
                        message={
                            <ul>
                                {this.props.error.messages.map((message, id) => (
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
 * Filter and sort users
 *
 * @param usersObject
 *
 * @returns {*}
 */
function filterSortUsers(usersObject) {
    const { users, filter, sort } = usersObject;
    if (users.length > 0) {
        return users
            .filter((user) => {
                if (user[filter.field]) {
                    return user[filter.field].match(
                        new RegExp(`^${filter.text}`, 'i')
                    );
                }
                return true;
            })
            .sort((a, b) => {
                if (a[sort.field] && b[sort.field]) {
                    const valA = a[sort.field].toLowerCase();
                    const valB = b[sort.field].toLowerCase();
                    if (sort.direction === 'asc') {
                        if (valA > valB) {
                            return 1;
                        }
                        if (valA < valB) {
                            return -1;
                        }
                        return 0;
                    }
                    if (valA < valB) {
                        return 1;
                    }
                    if (valA > valB) {
                        return -1;
                    }
                    return 0;
                }
                return 0;
            });
    }

    return users;
}


/**
 * Map Redux store state to Component props
 *
 * @param  {Object} state Redux store state
 *
 * @return {Object}
 */
function mapStateToProps(state) {
    const { users } = state;
    return {
        users: filterSortUsers(users),
        sort: users.sort,
        filter: users.filter,
        error: users.error
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
