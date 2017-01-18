import React, { PropTypes } from 'react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import FormsyDate from 'formsy-material-ui/lib/FormsyDate';


const UserTab = ({ user, style, dateFormat }) => (
    <div>
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
                DateTimeFormat={dateFormat}
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
    </div>
);

UserTab.propTypes = {
    user: PropTypes.object,
    style: PropTypes.object,
    dateFormat: PropTypes.func
};

export default UserTab;
