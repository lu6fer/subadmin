import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import { TextField, DatePicker } from 'redux-form-material-ui';
import areIntlLocalesSupported from 'intl-locales-supported';
// import moment from 'moment';


const UserTab = ({ style }) => { // eslint-disable-line no-unused-vars
    let DateTimeFormat;
    if (areIntlLocalesSupported(['fr'])) {
        DateTimeFormat = global.Intl.DateTimeFormat;
    } else {
        const IntlPolyfill = require('intl');
        DateTimeFormat = IntlPolyfill.DateTimeFormat;
        require('intl/locale-data/jsonp/fr');
    }

    const validation = {
        address: value => (
            value &&
            !/^[\w*\s*\-,']+$/i.test(value) ?
            'Adresse invalide' :
            undefined
        ),
        phone: value => (
            value &&
            !/^0[1-7]{1}(([0-9]{2}){4})|((\s[0-9]{2}){4})|((-[0-9]{2}){4})$/i.test(value) ?
            'Numéro de téléphone invalide' :
            undefined
        ),
        alphaDash: value => (
            value &&
            !/^[\w.\-\s]+$/i.test(value) ?
            'Champ invalide' :
            undefined
        ),
        email: value => (
            value &&
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
            'Adresse email invalide' :
            undefined
        ),
        required: value => (
            value == null ? 'Champ obligatoire' : undefined
        ),
        zipCode: value => (
            value &&
            !/^[\d]{5}$/.test(value) ?
            'code postae invalide' :
            undefined
        )
    };

    return (
        <div>
            <div className={style.useredit__fields}>
                <div className={style.useredit__fieldstitle}>
                    Utilisateur
                </div>
                <Field
                    name="name"
                    component={TextField}
                    validate={[validation.required, validation.alphaDash]}
                    hintText="Nom"
                    floatingLabelText="Nom"
                    fullWidth={true}
                />
                <Field
                    name="first_name"
                    component={TextField}
                    validate={[validation.required, validation.alphaDash]}
                    hintText="Prénom"
                    floatingLabelText="Prénom"
                    fullWidth={true}
                />

                <Field
                    name="email"
                    component={TextField}
                    validate={[validation.required, validation.email]}
                    hintText="Email"
                    floatingLabelText="Adresse email"
                    fullWidth={true}
                />
            </div>
            <div className={style.useredit__fields}>
                <div className={style.useredit__fieldstitle}>
                    Naissance
                </div>
                <Field
                    name="birthday"
                    component={DatePicker}
                    validate={validation.required}
                    locale="fr"
                    okLabel="OK"
                    cancelLabel="Annuler"
                    hintText="Date de naissance"
                    fullWidth={true}
                    DateTimeFormat={DateTimeFormat}
                    format={value => (new Date(value))}
                />
                <Field
                    name="birth_city"
                    component={TextField}
                    validate={[validation.required, validation.alphaDash]}
                    hintText="Ville"
                    floatingLabelText="Ville de naissance"
                    fullWidth={true}
                />
                <Field
                    name="birth_country"
                    component={TextField}
                    validate={[validation.required, validation.alphaDash]}
                    hintText="Pays"
                    floatingLabelText="Pays de naissance"
                    fullWidth={true}
                />
            </div>

            <div className={style.useredit__fields}>
                <div className={style.useredit__fieldstitle}>
                    Address
                </div>
                <Field
                    name="street"
                    component={TextField}
                    validate={[validation.required, validation.address]}
                    hintText="Addresse"
                    floatingLabelText="Addresse"
                    fullWidth={true}
                />
                <Field
                    name="zip_code"
                    component={TextField}
                    validate={[validation.required, validation.zipCode]}
                    hintText="Code postal"
                    floatingLabelText="Code postal"
                    fullWidth={true}
                />
                <Field
                    name="city"
                    component={TextField}
                    validate={[validation.required, validation.alphaDash]}
                    hintText="Ville"
                    floatingLabelText="Ville"
                    fullWidth={true}
                />
            </div>
            <div className={style.useredit__fields}>
                <div className={style.useredit__fieldstitle}>
                    Téléphone
                </div>
                <Field
                    name="phone_number"
                    component={TextField}
                    hintText="Téléphone"
                    validate={validation.phone}
                    floatingLabelText="Téléphone"
                    fullWidth={true}
                />
                <Field
                    name="mobile_phone"
                    component={TextField}
                    validate={validation.phone}
                    hintText="Téléphone portable"
                    floatingLabelText="Téléphone portable"
                    fullWidth={true}
                />
                <Field
                    name="pro_phone"
                    component={TextField}
                    validate={validation.phone}
                    hintText="Téléphone professionel"
                    floatingLabelText="Téléphone professionel"
                    fullWidth={true}
                />
            </div>
        </div>
    );
};

UserTab.propTypes = {
    style: PropTypes.object
};

export default UserTab;
