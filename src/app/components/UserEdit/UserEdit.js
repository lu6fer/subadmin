import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { Tabs, Tab } from 'material-ui/Tabs';
import classNames from 'classname';
import areIntlLocalesSupported from 'intl-locales-supported';
import Formsy from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import FormsyDate from 'formsy-material-ui/lib/FormsyDate';

import style from './UserEdit.scss';

const UserEdit = ({ user, back, theme, save, errors }) => {
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
                <Tabs>
                    <Tab label="Utilisateur">
                        <div className={style.useredit__fields}>
                            <div className={style.useredit__fieldstitle}>
                                Utilisateur
                            </div>
                            <FormsyText
                                name="name"
                                validations="alpha_dash"
                                validationError="Doit etre composé de lettre, d'espaces ou de tiret"
                                required
                                hintText="Nom"
                                floatingLabelText="Nom"
                                fullWidth={true}
                                value={user.name}
                            />
                            <FormsyText
                                name="first_name"
                                validations="alpha_dash"
                                validationError="Doit etre composé de lettre, d'espaces ou de tiret"
                                required
                                hintText="Prénom"
                                floatingLabelText="Prénom"
                                fullWidth={true}
                                value={user.first_name}
                            />

                            <FormsyText
                                name="email"
                                validations="isEmail"
                                validationError="Ce n'est pas une adresse email valide"
                                required
                                hintText="Email"
                                floatingLabelText="Adresse email"
                                fullWidth={true}
                                value={user.email}
                            />
                        </div>
                        <div className={style.useredit__fields}>
                            <div className={style.useredit__fieldstitle}>
                                Naissance
                            </div>
                            <FormsyDate
                                name="birthday"
                                required
                                floatingLabelText="Date de naissance"
                                DateTimeFormat={DateTimeFormat}
                                okLabel="OK"
                                cancelLabel="Annuler"
                                locale="fr"
                                fullWidth={true}
                                value={new Date(user.birthday)}
                            />
                            <FormsyText
                                name="birth_city"
                                validations="alpha_dash"
                                validationError="Doit etre composé de lettre, d'espaces ou de tiret"
                                required
                                hintText="Ville"
                                floatingLabelText="Ville de naissance"
                                fullWidth={true}
                                value={user.birth_city}
                            />
                            <FormsyText
                                name="birth_country"
                                validations="alpha_dash"
                                validationError="Doit etre composé de lettre, d'espaces ou de tiret"
                                required
                                hintText="Pays"
                                floatingLabelText="Pays de naissance"
                                fullWidth={true}
                                value={user.birth_country}
                            />
                        </div>

                        <div className={style.useredit__fields}>
                            <div className={style.useredit__fieldstitle}>
                                Address
                            </div>
                            <FormsyText
                                name="street"
                                validations="address"
                                validationError="Doit etre composé de lettre, de chiffres, d'espaces, de tiret, de souligner ou d'apostrophe"
                                required
                                hintText="Addresse"
                                floatingLabelText="Addresse"
                                fullWidth={true}
                                value={user.street}
                            />
                            <FormsyText
                                name="zip_code"
                                validations="isNumeric,isLength:5"
                                validationError="Ce n'est pas un code postal valide, 5 chiffres"
                                required
                                hintText="Code postal"
                                floatingLabelText="Code postal"
                                fullWidth={true}
                                value={user.zip_code}
                            />
                            <FormsyText
                                name="city"
                                validations="alpha_dash"
                                validationError="Doit etre composé de lettre, d'espaces ou de tiret"
                                required
                                hintText="Ville"
                                floatingLabelText="Ville"
                                fullWidth={true}
                                value={user.city}
                            />
                        </div>
                        <div className={style.useredit__fields}>
                            <div className={style.useredit__fieldstitle}>
                                Téléphone
                            </div>
                            <FormsyText
                                name="phone_number"
                                validations="phone"
                                validationError="Ce n'est pas un numéro de téléphone valide"
                                hintText="Téléphone"
                                floatingLabelText="Téléphone"
                                fullWidth={true}
                                value={user.phone_number}
                            />
                            <FormsyText
                                name="mobile_phone"
                                validations="phone"
                                validationError="Ce n'est pas un numéro de téléphone valide"
                                hintText="Téléphone portable"
                                floatingLabelText="Téléphone portable"
                                fullWidth={true}
                                value={user.mobile_phone}
                            />
                            <FormsyText
                                name="pro_phone"
                                validations="phone"
                                validationError="Ce n'est pas un numéro de téléphone valide"
                                hintText="Téléphone professionel"
                                floatingLabelText="Téléphone professionel"
                                fullWidth={true}
                                value={user.pro_phone}
                            />
                        </div>
                    </Tab>
                    <Tab label="inscription">
                        <pre>{JSON.stringify(user.subscriptions)}</pre>
                    </Tab>
                    <Tab label="Plongée">
                        <pre>{JSON.stringify(user.dive)}</pre>
                    </Tab>
                    <Tab label="Bateau">
                        <pre>{JSON.stringify(user.boat)}</pre>
                    </Tab>
                    <Tab label="Groupes">
                        <pre>{JSON.stringify(user.groups)}</pre>
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
    user: PropTypes.object
};

export default UserEdit;
