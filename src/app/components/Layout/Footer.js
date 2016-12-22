import React from 'react';
import Paper from 'material-ui/Paper';
import style from './Footer.scss';

const Footer = () => (
    <Paper
        className={style.footer}
        rounded={false}
    >
        footer
    </Paper>
);

/*
Footer.propTypes = {
    number: PropTypes.number.isRequired
};
*/

export default Footer;
