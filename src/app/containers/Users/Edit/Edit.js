import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CircularProgress from 'material-ui/CircularProgress';

import AppActions from 'actions/AppActions';
import UserEdit from 'components/UserEdit/UserEdit';

import style from './Edit.scss';

class Edit extends React.Component {
    static propTypes = {
        actions: PropTypes.object,
        user: PropTypes.object,
        errors: PropTypes.object,
        labels: PropTypes.object
    };

    static contextTypes = {
        router: PropTypes.object,
        muiTheme: PropTypes.object
    };

    componentDidMount() {
        this.props.actions.fetchUser(this.context.router.params.userSlug);
    }

    render() {
        const content = !this.props.user.slug ?
            <CircularProgress className={style.edit__progress} /> :
            (<UserEdit
                back={this.context.router.goBack}
                user={this.props.user}
                theme={this.context.muiTheme}
                errors={this.props.errors}
                labels={this.props.labels}
                save={(data) => {
                    console.log(data);
                }}
            />);
        return (
            <div>
                { content }
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
    const { users, notification, labels } = state;
    return {
        user: users.user,
        loading: users.loading,
        errors: users.validationMessages,
        labels,
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

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
