import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { Tabs, Tab } from 'material-ui/Tabs';
import classNames from 'classname';
import areIntlLocalesSupported from 'intl-locales-supported';
import Formsy from 'formsy-react';

import UserEditTemplate from 'components/UserEdit/UserEditTemplate';
import UserTab from 'components/UserEdit/Tabs/UserTab';
import MemberhsipTab from 'components/UserEdit/Tabs/MembershipTab';
import DiveTab from 'components/UserEdit/Tabs/DiveTab';
import BoatTab from 'components/UserEdit/Tabs/BoatTab';
import GroupTab from 'components/UserEdit/Tabs/GroupTab';

import style from './UserEdit.scss';

const UserEdit = ({ user, back, theme, save, errors, labels }) => {
    const cancelClass = classNames(
        [style.useredit__button],
        [style.useredit__button_cancel]
    );
    const saveClass = classNames(
        [style.useredit__boutton],
        [style.useredit__button_save]
    );

    let DateTimeFormat;
    if (areIntlLocalesSupported(['fr'])) {
        DateTimeFormat = global.Intl.DateTimeFormat;
    } else {
        const IntlPolyfill = require('intl');
        DateTimeFormat = IntlPolyfill.DateTimeFormat;
        require('intl/locale-data/jsonp/fr');
    }

    Formsy.addValidationRule('alpha_dash', (values, value) => (
        value ? /^[\S.\-\s]+$/.test(value) : true
    ));

    Formsy.addValidationRule('address', (values, value) => (
        value ? /^[\w*\s*\-,']+$/.test(value) : true
    ));

    Formsy.addValidationRule('phone', (values, value) => (
        value ? /^0[1-6]{1}(([0-9]{2}){4})|((\s[0-9]{2}){4})|((-[0-9]{2}){4})$/.test(value) : true
    ));

    return (
        <Paper
            zDepth={5}
            className={style.useredit}
        >
            <div
                className={style.useredit__title}
                style={{
                    backgroundColor: theme.palette.canvasColor,
                    color: theme.palette.primary1Color,
                    boxShadow: theme.paper.zDepthShadows[0]
                }}
            >
                &Eacute;dition
            </div>
            <Formsy.Form
                className={style.useredit__form}
                onSubmit={save}
                validationErrors={errors}
            >
                <Tabs
                    className={style.useredit__tabs}
                    contentContainerClassName={style.useredit__tabscontent}
                    style={{
                        flex: '1 1 100%',
                        minHeight: 0,
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                    contentContainerStyle={{
                        flex: '1 1 100%',
                        display: 'flex',
                        flexDirection: 'column',
                        overflowY: 'auto'
                    }}
                    tabTemplate={UserEditTemplate}
                >
                    <Tab
                        label="Utilisateur"
                        className="useredit__user"
                    >
                        <UserTab
                            user={user}
                            style={style}
                            dateFormat={DateTimeFormat}
                        />
                    </Tab>
                    <Tab
                        label="inscription"
                        className="useredit__membership"
                    >
                        <MemberhsipTab
                            subscriptions={user.subscriptions}
                        />
                    </Tab>
                    <Tab
                        label="Plongée"
                    >
                        <DiveTab
                            dives={user.dive}
                            labels={labels}
                            dateFormat={DateTimeFormat}
                        />
                    </Tab>
                    <Tab
                        label="Bateau"
                        className="useredit__boat"
                    >
                        <BoatTab
                            boats={user.boat}
                        />
                    </Tab>
                    <Tab
                        label="Groupes"
                        className="useredit__groups"
                    >
                        <GroupTab
                            groups={user.group}
                        />
                    </Tab>
                </Tabs>
                <div
                    className={style.useredit__controls}
                    style={{
                        // borderTop: `1px solid ${theme.palette.borderColor}`
                        boxShadow: theme.paper.zDepthShadows[2]
                    }}
                >
                    <RaisedButton
                        label="enregister"
                        className={saveClass}
                        type="submit"
                    />
                    <RaisedButton
                        className={cancelClass}
                        label="annuler"
                        secondary={true}
                        onClick={() => {
                            back();
                        }}
                    />
                </div>
            </Formsy.Form>
        </Paper>
    );
};

UserEdit.propTypes = {
    back: PropTypes.func,
    theme: PropTypes.object,
    save: PropTypes.func,
    errors: PropTypes.object,
    user: PropTypes.object,
    labels: PropTypes.object
};

export default UserEdit;
