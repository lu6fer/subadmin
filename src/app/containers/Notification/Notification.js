import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import style from './Notification.scss';
import AppActions from '../../actions/AppActions';
import Error from '../../components/Notification/Error';
import Success from '../../components/Notification/Success';


/* class Error extends React.Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
        status: PropTypes.bool,
        messages: PropTypes.array
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            errorOpen: false
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            errorOpen: nextProps.status
        });
    }


    render() {
        const errorClass = [style.error, style.error_hidden];
        if (this.state.errorOpen) {
            errorClass.pop();
        }

        return (
            <div className={errorClass.join(' ')}>
                <Snackbar
                    open={this.props.status}
                    message={
                        <ul>
                            {this.props.messages.map((message, id) => (
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
                    onRequestClose={this.props.actions.hideError}
                />
            </div>
        );
    }
} */

class Notification extends React.Component {
    static propTypes = {
        open: PropTypes.bool,
        type: PropTypes.string,
        messages: PropTypes.array,
        actions: PropTypes.object
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            notificationOpen: this.props.open
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            notificationOpen: nextProps.open
        });
    }

    render() {
        let notifComponent = (
            <Error
                messages={this.props.messages}
                action={this.props.actions.hideNotification}
                open={this.state.notificationOpen}
            />
        );

        if (this.props.type === 'success') {
            notifComponent = (
                <Success
                    messages={this.props.messages}
                    action={this.props.actions.hideNotification}
                    open={this.state.notificationOpen}
                />
            );
        }

        const notificationClassName = [style.notification, style.notification_hidden];
        if (this.state.notificationOpen) {
            notificationClassName.pop();
        }

        return (
            <div className={notificationClassName.join(' ')}>
                { notifComponent }
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
    const { notification } = state;
    return {
        open: notification.open,
        type: notification.type,
        messages: notification.messages
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

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
