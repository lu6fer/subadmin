import React, { PropTypes } from 'react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import FormsyDate from 'formsy-material-ui/lib/FormsyDate';
import FormsySelect from 'formsy-material-ui/lib/FormsySelect';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import MenuItem from 'material-ui/MenuItem';
import { Card, CardHeader, CardText } from 'material-ui/Card';


const DiveTab = ({ dives, labels, dateFormat }) => {
    const getDiveLevel = id => (
        labels.dive.filter(diveLevel => (
            diveLevel.id === id
        ))
    );

    return (
        <div>
            {dives.slice(0).reverse().map((dive, index) => (
                <Card
                    key={index}
                    initiallyExpanded={dive.archive === 0}
                >
                    <CardHeader
                        title={dive.archive === 0 ?
                               'Niveau de plongée courrant' :
                               `Historique - ${getDiveLevel(dive.level)[0].name}`
                        }
                        actAsExpander={true}
                        showExpandableButton={true}
                    />
                    <CardText
                        expandable={true}
                    >
                        <input type="hidden" name={`dive[${index}].id`} />
                        <FormsyText
                            name={`dive[${index}].licence`}
                            validations="alpha_dash"
                            validationError="Doit etre composé de lettre, d'espaces ou de tiret"
                            required
                            hintText="Licence"
                            floatingLabelText="Licence"
                            fullWidth={true}
                            value={dive.licence}
                            disabled={dive.archive === 1}
                        />
                        <FormsySelect
                            name={`dive[${index}].level`}
                            fullWidth={true}
                            floatingLabelText="Niveau de plongée"
                            value={dive.level}
                            disabled={dive.archive === 1}
                        >
                            {labels.dive.map(diveLevel => (
                                <MenuItem
                                    key={diveLevel.slug}
                                    value={diveLevel.id}
                                    primaryText={diveLevel.name}
                                />
                            ))}
                        </FormsySelect>
                        <FormsyDate
                            name={`dive[${index}].date`}
                            required
                            floatingLabelText="Date d'otention"
                            DateTimeFormat={dateFormat}
                            okLabel="OK"
                            cancelLabel="Annuler"
                            locale="fr"
                            fullWidth={true}
                            value={new Date(dive.date)}
                            disabled={dive.archive === 1}
                        />
                        <FormsyText
                            name={`dive[${index}].instructor`}
                            validations="alpha_dash"
                            validationError="Doit etre composé de lettre, d'espaces ou de tiret"
                            required
                            hintText="Instructeur"
                            floatingLabelText="Instructeur"
                            fullWidth={true}
                            value={dive.instructor}
                            disabled={dive.archive === 1}
                        />
                        <FormsyText
                            name={`dive[${index}].origin`}
                            validations="alpha_dash"
                            validationError="Doit etre composé de lettre, d'espaces ou de tiret"
                            required
                            hintText="Origine"
                            floatingLabelText="Origine"
                            fullWidth={true}
                            value={dive.origin}
                            disabled={dive.archive === 1}
                        />
                        <FormsyText
                            name={`dive[${index}].orign_number`}
                            validations="alpha_dash"
                            validationError="Doit etre composé de lettre, d'espaces ou de tiret"
                            required
                            hintText="N° Origine"
                            floatingLabelText="N° Origine"
                            fullWidth={true}
                            value={dive.origin_number}
                            disabled={dive.archive === 1}
                        />
                    </CardText>
                </Card>
            ))}
            <FloatingActionButton
                secondary={true}
                className="useredit__add useredit__add_dive"
            >
                <ContentAdd />
            </FloatingActionButton>
        </div>
    );
};

DiveTab.propTypes = {
    dives: PropTypes.array,
    labels: PropTypes.object,
    dateFormat: PropTypes.func
};

export default DiveTab;
