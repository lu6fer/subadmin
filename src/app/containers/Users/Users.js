import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CircularProgress from 'material-ui/CircularProgress';
import cx from 'classname';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import style from './Users.scss';
import AppActions from '../../actions/AppActions';
import UserTable from './UsersTable/UsersTable';
import Notification from '../Notification/Notification';

class Users extends React.Component {

    static propTypes = {
        children: PropTypes.object,
        users: PropTypes.array,
        filter: PropTypes.object,
        sort: PropTypes.object,
        loading: PropTypes.bool,
        deleting: PropTypes.object,
        actions: PropTypes.object.isRequired
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            modalOpen: false
        };
    }

    componentDidMount() {
        this.props.actions.fetchUsers();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            modalOpen: (!!nextProps.deleting.slug && !nextProps.notification.open)
        });
    }

    handleModalClose(deleteConfirmed) {
        if (deleteConfirmed) {
            this.props.actions.deleteUser(this.props.deleting);
        } else {
            this.props.actions.deleteUserCanceled();
        }
        this.setState({
            modalOpen: false
        });
    }

    render() {
        const progressClass = cx(style.progress, {
            [style.progress_hidden]: !this.props.loading
        });
        const usersClass = cx(style.users, {
            [style.users_hidden]: this.props.loading
        });
        const childrenClass = cx(style.users__children, {
            [style.users__children_hidden]: (this.props.children === null)
        });

        const modalAcions = [
            <FlatButton
                label="Annuler"
                secondary={true}
                onTouchTap={() => { this.handleModalClose(false); }}
            />,
            <FlatButton
                label="Supprimer"
                primary={true}
                onTouchTap={() => { this.handleModalClose(true); }}
            />
        ];

        return (
            <div>
                {/* Progress */}
                <CircularProgress className={progressClass} />
                {/* Users */}
                <div className={usersClass}>
                    <UserTable
                        users={this.props.users}
                        actions={{
                            filter: this.props.actions.filterUsers,
                            sort: this.props.actions.sortUsers,
                            delete: this.props.actions.deleteUserRequested
                        }}
                        filter={this.props.filter}
                        sort={this.props.sort}
                        deleting={this.props.deleting}
                    />
                </div>
                {/* Confirm */}
                <div>
                    <Dialog
                        title="Confirmation de la suppression"
                        open={this.state.modalOpen}
                        modal={true}
                        actions={modalAcions}
                    >
                        Etes-vous certain de vouloir supprimer le compte de
                        <strong>
                            {`${this.props.deleting.first_name} ${this.props.deleting.name}`}
                        </strong>
                    </Dialog>
                </div>
                <Notification />
                <div className={childrenClass}>
                    {this.props.children}
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
    const { users, notification } = state;
    return {
        users: filterSortUsers(users),
        sort: users.sort,
        filter: users.filter,
        loading: users.loading,
        deleting: users.deleting,
        notification
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
