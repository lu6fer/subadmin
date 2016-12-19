import React, { PropTypes } from 'react';
import Snackbar from 'material-ui/Snackbar';
import { lightGreen500 } from 'material-ui/styles/colors';

import style from './Error.scss';

const Success = ({ messages, action, open }) => (
    <Snackbar
        open={open}
        autoHideDuration={2000}
        message={
            <ul>
                {messages.map((message, id) => (
                    <li key={id}>{message}</li>
                ))}
            </ul>
        }
        className={style.error__message}
        bodyStyle={{
            height: 'auto',
            lineHeight: 'inherit',
            backgroundColor: lightGreen500
        }}
        onRequestClose={action}
    />
);

Success.propTypes = {
    messages: PropTypes.array,
    action: PropTypes.func,
    open: PropTypes.bool
};

export default Success;
