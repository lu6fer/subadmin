import React, { PropTypes } from 'react';
import { FieldArray, Field } from 'redux-form';
import { TextField, SelectField, DatePicker } from 'redux-form-material-ui';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import areIntlLocalesSupported from 'intl-locales-supported';

const DiveLevel = ({ fields, labels }) => {
    let DateTimeFormat;
    if (areIntlLocalesSupported(['fr'])) {
        DateTimeFormat = global.Intl.DateTimeFormat;
    } else {
        const IntlPolyfill = require('intl');
        DateTimeFormat = IntlPolyfill.DateTimeFormat;
        require('intl/locale-data/jsonp/fr');
    }

    /**
     * Extract level name
     * @param index
     */
    const getDiveLevel = index => (
        labels.filter(diveLevel => (
            diveLevel.id === fields.get(index).level
        ))
    );

    /**
     * Check if dive is archived
     * @param index
     */
    const isArchive = (index) => {
        console.log(fields.get(index));
        if (fields.get(index).archive) {
            return fields.get(index).archive === 0;
        }
        return true;
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column-reverse'
            }}
        >
            {fields.map((dive, index) => (
                <Card
                    key={index}
                    initiallyExpanded={isArchive(index)}
                >
                    <CardHeader
                        title={isArchive(index) ?
                               'Niveau de plongée courrant' :
                               `Historique - ${getDiveLevel(index)[0].name}`
                        }
                        actAsExpander={true}
                        showExpandableButton={true}
                    />
                    <CardText
                        expandable={true}
                    >
                        <Field
                            key={`licence-${index}`}
                            name={`${dive}.licence`}
                            component={TextField}
                            hintText="Licence"
                            floatingLabelText="Licence"
                            fullWidth={true}
                            disabled={!isArchive(index)}
                        />
                        <Field
                            key={`level-${index}`}
                            name={`${dive}.level`}
                            component={SelectField}
                            hintText="Niveau de plongée"
                            floatingLabelText="niveau de plongée"
                            fullWidth={true}
                            disabled={!isArchive(index)}
                        >
                            {labels.map(diveLevel => (
                                <MenuItem
                                    key={diveLevel.slug}
                                    value={diveLevel.id}
                                    primaryText={diveLevel.name}
                                />
                            ))}
                        </Field>
                        <Field
                            key={`date-${index}`}
                            name={`${dive}.date`}
                            component={DatePicker}
                            locale="fr"
                            okLabel="OK"
                            cancelLabel="Annuler"
                            hintText="Date d'otention"
                            fullWidth={true}
                            DateTimeFormat={DateTimeFormat}
                            format={value => (
                                value == null ? new Date() : new Date(value)
                            )}
                        />
                        <Field
                            key={`instructor-${index}`}
                            name={`${dive}.instructor`}
                            component={TextField}
                            hintText="Instructeur"
                            floatingLabelText="Instructeur"
                            fullWidth={true}
                            disabled={!isArchive(index)}
                        />
                        <Field
                            key={`origin-${index}`}
                            name={`${dive}.origin`}
                            component={TextField}
                            hintText="Origine"
                            floatingLabelText="Origine"
                            fullWidth={true}
                            disabled={!isArchive(index)}
                        />
                        <Field
                            key={`originNumber-${index}`}
                            name={`${dive}.origin_number`}
                            component={TextField}
                            hintText="N° origine"
                            floatingLabelText="n° origine"
                            fullWidth={true}
                            disabled={!isArchive(index)}
                        />
                    </CardText>
                </Card>
            ))}
            <FloatingActionButton
                secondary={true}
                onClick={() => {
                    fields.push({});
                }}
            >
                <ContentAdd />
            </FloatingActionButton>
        </div>
    );
};

const DiveTab = ({ labels }) => (
    <FieldArray
        name="dive"
        component={DiveLevel}
        props={{
            labels
        }}
    />
);


DiveLevel.propTypes = {
    fields: PropTypes.object,
    labels: PropTypes.array
};

DiveTab.propTypes = {
    labels: PropTypes.array
};

export default DiveTab;
