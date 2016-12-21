import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import classNames from 'classname';
import areIntlLocalesSupported from 'intl-locales-supported';
import Formsy from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import FormsyDate from 'formsy-material-ui/lib/FormsyDate';

import style from './UserAdd.scss';

class UsersAdd extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.test = null;
    }

    render() {
        console.log(this.test);
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
            require('intl/locale-data/jsonp/fa-IR');
        }

        return (
            <Paper
                zDepth={5}
                className={style.useradd}
            >
                <div className={style.useradd__title}>
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
                        />
                        <FormsyText
                            name="first_name"
                            validations="isWords"
                            validationError="Seulement des lettres"
                            required
                            hintText="Prénom"
                            floatingLabelText="Prénom"
                        />

                        <FormsyText
                            name="email"
                            validations="isEmail"
                            validationError="Ce n'est pas une adresse email valide"
                            required
                            hintText="Email"
                            floatingLabelText="Adresse email"
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
                        />
                        <FormsyText
                            name="birth_city"
                            validations="isWords"
                            validationError="Seulement des lettres"
                            required
                            hintText="Ville"
                            floatingLabelText="Ville de naissance"
                        />
                        <FormsyText
                            name="birth_country"
                            validations="isWords"
                            validationError="Seulement des lettres"
                            required
                            hintText="Pays"
                            floatingLabelText="Pays de naissance"
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
                        />
                        <FormsyText
                            name="zip_code"
                            validations="isNumeric"
                            validationError="Seulement des lettres"
                            required
                            hintText="Code postal"
                            floatingLabelText="Code postal"
                        />
                        <FormsyText
                            name="city"
                            validations="isWords"
                            validationError="Seulement des lettres"
                            required
                            hintText="Ville"
                            floatingLabelText="Ville"
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
                        />
                        <FormsyText
                            name="mobile_phone"
                            validations="isWords"
                            validationError="Seulement des lettres"
                            hintText="Téléphone portable"
                            floatingLabelText="Téléphone portable"
                        />
                        <FormsyText
                            name="pro_phone"
                            validations="isWords"
                            validationError="Seulement des lettres"
                            hintText="Téléphone professionel"
                            floatingLabelText="Téléphone professionel"
                        />
                    </div>
                </Formsy.Form>
                <div className={style.useradd__controls}>
                    <RaisedButton
                        label="enregister"
                        className={saveClass}
                    />
                    <RaisedButton
                        className={cancelClass}
                        label="annuler"
                        secondary={true}
                    />
                </div>
            </Paper>
        );
    }

}

export default UsersAdd;
