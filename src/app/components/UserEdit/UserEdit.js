/* eslint-disable no-unused-vars */
import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import classNames from 'classname';
import areIntlLocalesSupported from 'intl-locales-supported';
import { Field, reduxForm, propTypes } from 'redux-form';
import { TextField, DatePicker } from 'redux-form-material-ui';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

import BoatTab from 'components/UserEdit/Tabs/BoatTab';
import DiveTab from 'components/UserEdit/Tabs/DiveTab';
import GroupTab from 'components/UserEdit/Tabs/GroupTab';
import MembershipTab from 'components/UserEdit/Tabs/MembershipTab';
import UserTab from 'components/UserEdit/Tabs/UserTab';


import style from './UserEdit.scss';

class UserEdit extends React.Component {
    static propTypes = {
        theme: PropTypes.object,
        back: PropTypes.func,
        labels: PropTypes.object,
        ...propTypes
    };

    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0
        };

        this.class = {
            cancel: classNames(
                [style.useredit__button],
                [style.useredit__button_cancel]
            ),
            save: classNames(
                [style.useredit__boutton],
                [style.useredit__button_save]
            )
        };
    }

    /* handleChange = (value) => {
        this.setState({
            slideIndex: value
        });
    }; */

    handleChange = (value) => {
        this.setState({ slideIndex: value }); // eslint-disable-line no-invalid-this
    };

    render() {
        return (
            <Paper
                zDepth={5}
                className={style.useredit}
            >
                <form
                    className={style.useredit__form}
                    onSubmit={this.props.handleSubmit}
                >
                    <div
                        className={style.useredit__title}
                        style={{
                            backgroundColor: this.props.theme.palette.canvasColor,
                            color: this.props.theme.palette.primary1Color,
                            boxShadow: this.props.theme.paper.zDepthShadows[0]
                        }}
                    >
                        &Eacute;dition
                    </div>
                    <div
                        className={style.useredit__content}
                    >
                        <Tabs
                            onChange={this.handleChange}
                            value={this.state.slideIndex}
                        >
                            <Tab label={'Utilisateur'} value={0} />
                            <Tab label={'Adhésion'} value={1} />
                            <Tab label={'Groupe'} value={2} />
                            <Tab label={'Plongée'} value={3} />
                            <Tab label={'Bateau'} value={4} />
                        </Tabs>
                        <SwipeableViews
                            index={this.state.slideIndex}
                            onChangeIndex={this.handleChange}
                            slideStyle={{
                                overflow: 'hidden'
                            }}
                        >
                            <UserTab style={style} />
                            <MembershipTab />
                            <GroupTab />
                            <DiveTab style={style} labels={this.props.labels.dive} />
                            <BoatTab />
                        </SwipeableViews>
                    </div>
                    <div
                        className={style.useredit__controls}
                        style={{
                            boxShadow: this.props.theme.paper.zDepthShadows[2],
                            backgroundColor: this.props.theme.palette.canvasColor
                        }}
                    >
                        <RaisedButton
                            label="enregister"
                            className={this.class.save}
                            type="submit"
                        />
                        <RaisedButton
                            className={this.class.cancel}
                            label="annuler"
                            secondary={true}
                            onClick={() => {
                                this.props.back();
                            }}
                        />
                    </div>
                </form>
            </Paper>
        );
    }
}
/* const UserEdit = ({ theme, back, handleSubmit }) => {
    const cancelClass = classNames(
        [style.useredit__button],
        [style.useredit__button_cancel]
    );
    const saveClass = classNames(
        [style.useredit__boutton],
        [style.useredit__button_save]
    );

    return (
        <Paper
            zDepth={5}
            className={style.useredit}
        >
            <form
                className={style.useredit__form}
                onSubmit={handleSubmit}
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
                <div
                    className={style.useredit__content}
                >
                    <Tabs>
                        <Tab
                            label={'Utilisateur'}
                        >
                            <UserTab
                                style={style}
                            />
                        </Tab>
                        <Tab
                            label={'Plongée'}
                        >
                            Dive
                        </Tab>
                    </Tabs>
                </div>
                <div
                    className={style.useredit__controls}
                    style={{
                        boxShadow: theme.paper.zDepthShadows[2],
                        backgroundColor: theme.palette.canvasColor
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
            </form>
        </Paper>
    );
}; */

export default reduxForm({
    form: 'userEdit'
})(UserEdit);
