import React, { PropTypes } from 'react';
import Snackbar from 'material-ui/Snackbar';
import { red500 } from 'material-ui/styles/colors';

import style from './Error.scss';

const Error = ({ messages, action, open }) => (
    <Snackbar
        open={open}
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
            backgroundColor: red500
        }}
        onRequestClose={action}
    />
);

Error.propTypes = {
    messages: PropTypes.array,
    action: PropTypes.func,
    open: PropTypes.bool
};

export default Error;
