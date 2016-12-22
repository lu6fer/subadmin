import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import classNames from 'classname';
import areIntlLocalesSupported from 'intl-locales-supported';
import Formsy from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import FormsyDate from 'formsy-material-ui/lib/FormsyDate';

import style from './UserAdd.scss';

const UserAdd = ({ back, theme }) => {
    const cancelClass = classNames(
        [style.useradd__button],
        [style.useradd__button_cancel]
    );
    const saveClass = classNames(
        [style.useradd__boutton],
        [style.useradd__button_save]
    );

    let DateTimeFormat;
    if (areIntlLocalesSupported(['fr'])) {
        DateTimeFormat = global.Intl.DateTimeFormat;
    } else {
        const IntlPolyfill = require('intl');
        DateTimeFormat = IntlPolyfill.DateTimeFormat;
        require('intl/locale-data/jsonp/fr');
    }

    return (
        <Paper
            zDepth={5}
            className={style.useradd}
        >
            <div
                className={style.useradd__title}
                style={{
                    backgroundColor: theme.palette.primary1Color,
                    color: theme.palette.alternateTextColor,
                    boxShadow: theme.paper.zDepthShadows[0]
                }}
            >
                Ajout d&apos;un utilisateur
            </div>
            <Formsy.Form
                className={style.useradd__form}
            >
                <div className={style.useradd__fields}>
                    <div className={style.useradd__fieldstitle}>
                        Utilisateur
                    </div>
                    <FormsyText
                        name="name"
                        validations="isWords"
                        validationError="Seulement des lettres"
                        required
                        hintText="Nom"
                        floatingLabelText="Nom"
                        fullWidth={true}
                    />
                    <FormsyText
                        name="first_name"
                        validations="isWords"
                        validationError="Seulement des lettres"
                        required
                        hintText="Prénom"
                        floatingLabelText="Prénom"
                        fullWidth={true}
                    />

                    <FormsyText
                        name="email"
                        validations="isEmail"
                        validationError="Ce n'est pas une adresse email valide"
                        required
                        hintText="Email"
                        floatingLabelText="Adresse email"
                        fullWidth={true}
                    />
                </div>
                <div className={style.useradd__fields}>
                    <div className={style.useradd__fieldstitle}>
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
                    />
                    <FormsyText
                        name="birth_city"
                        validations="isWords"
                        validationError="Seulement des lettres"
                        required
                        hintText="Ville"
                        floatingLabelText="Ville de naissance"
                        fullWidth={true}
                    />
                    <FormsyText
                        name="birth_country"
                        validations="isWords"
                        validationError="Seulement des lettres"
                        required
                        hintText="Pays"
                        floatingLabelText="Pays de naissance"
                        fullWidth={true}
                    />
                </div>

                <div className={style.useradd__fields}>
                    <div className={style.useradd__fieldstitle}>
                        Address
                    </div>
                    <FormsyText
                        name="street"
                        validations="isWords"
                        validationError="Seulement des lettres"
                        required
                        hintText="Addresse"
                        floatingLabelText="Addresse"
                        fullWidth={true}
                    />
                    <FormsyText
                        name="zip_code"
                        validations="isNumeric"
                        validationError="Seulement des lettres"
                        required
                        hintText="Code postal"
                        floatingLabelText="Code postal"
                        fullWidth={true}
                    />
                    <FormsyText
                        name="city"
                        validations="isWords"
                        validationError="Seulement des lettres"
                        required
                        hintText="Ville"
                        floatingLabelText="Ville"
                        fullWidth={true}
                    />
                </div>
                <div className={style.useradd__fields}>
                    <div className={style.useradd__fieldstitle}>
                        Téléphone
                    </div>
                    <FormsyText
                        name="phone_number"
                        validations="isWords"
                        validationError="Seulement des lettres"
                        hintText="Téléphone"
                        floatingLabelText="Téléphone"
                        fullWidth={true}
                    />
                    <FormsyText
                        name="mobile_phone"
                        validations="isWords"
                        validationError="Seulement des lettres"
                        hintText="Téléphone portable"
                        floatingLabelText="Téléphone portable"
                        fullWidth={true}
                    />
                    <FormsyText
                        name="pro_phone"
                        validations="isWords"
                        validationError="Seulement des lettres"
                        hintText="Téléphone professionel"
                        floatingLabelText="Téléphone professionel"
                        fullWidth={true}
                    />
                </div>
            </Formsy.Form>
            <div
                className={style.useradd__controls}
                style={{
                    borderTop: `1px solid ${theme.palette.borderColor}`
                }}
            >
                <RaisedButton
                    label="enregister"
                    className={saveClass}
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
        </Paper>
    );
};

UserAdd.propTypes = {
    back: PropTypes.func,
    theme: PropTypes.object
};

export default UserAdd;
