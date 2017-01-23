import React, { PropTypes } from 'react';
import { FieldArray, Field } from 'redux-form';
import { TextField, SelectField, DatePicker } from 'redux-form-material-ui';
import { Card, CardText, CardActions, CardTitle } from 'material-ui/Card';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import AddIcon from 'material-ui/svg-icons/content/add';
// import ContentAdd from 'material-ui/!svg-icons/content/add';
import areIntlLocalesSupported from 'intl-locales-supported';
// import classNames from 'classnames';

class DiveLevel extends React.Component {
    static propTypes = {
        fields: PropTypes.object,
        labels: PropTypes.array
    };

    constructor(state, props) {
        super(state, props);
        this.isArchive = this.isArchive.bind(this);
        this.getDiveLevel = this.getDiveLevel.bind(this);
        this.generateTitle = this.generateTitle.bind(this);
    }

    componentWillMount() {
        if (this.props.fields.length === 0) {
            this.props.fields.push();
        }
    }

    /* eslint-disable no-invalid-this */
    /**
     * Extract level name
     * @param index
     */
    getDiveLevel = index => (
        this.props.labels.filter(diveLevel => (
            diveLevel.id === this.props.fields.get(index).level
        ))
    );

    /**
     * Check if level is archived
     * @param index
     * @returns {boolean}
     */
    isArchive = index => (
        !!this.props.fields.get(index) &&
        this.props.fields.get(index).archive === 1
    );

    /**
     * Check if it's a new level
     * @param index
     * @returns {boolean}
     */
    isNew = index => (
        !this.props.fields.get(index) || !this.props.fields.get(index).id
    );

    /**
     * Generate card title
     * @param index
     * @returns {*}
     */
    generateTitle = (index) => {
        const levelData = this.props.fields.get(index);
        if (typeof levelData !== 'undefined' && levelData.archive === 0) {
            return 'Niveau de plongée courrant';
        } else if (typeof levelData !== 'undefined' && levelData.archive === 1) {
            return 'Historique';
        }
        return 'Nouveau niveau';
    };
    /* eslint-enable no-invalid-this */

    render() {
        let DateTimeFormat;
        if (areIntlLocalesSupported(['fr'])) {
            DateTimeFormat = global.Intl.DateTimeFormat;
        } else {
            const IntlPolyfill = require('intl');
            DateTimeFormat = IntlPolyfill.DateTimeFormat;
            require('intl/locale-data/jsonp/fr');
        }

        return (
            <div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column-reverse',
                        padding: '10px'
                    }}
                >
                    {this.props.fields.map((dive, index) => (
                        <Card
                            key={index}
                            initiallyExpanded={!this.isArchive(index)}
                            zDepth={2}
                        >
                            <CardTitle
                                title={this.generateTitle(index)}
                                subtitle={!this.isArchive(index) ?
                                    '' :
                                    this.getDiveLevel(index)[0].name
                                }
                                actAsExpander={true}
                            />
                            <CardActions
                                actAsExpander={true}
                                showExpandableButton={true}
                                children={ // eslint-disable-line react/no-children-prop
                                    !this.isArchive(index) && !this.isNew(index) ?
                                        <RaisedButton
                                            tooltip="Ajouter un niveau de plongée"
                                            onClick={() => {
                                                this.props.fields.push({});
                                            }}
                                            icon={<AddIcon />}
                                            primary={true}
                                        /> :
                                        null
                                }
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
                                    disabled={this.isArchive(index)}
                                />
                                <Field
                                    key={`level-${index}`}
                                    name={`${dive}.level`}
                                    component={SelectField}
                                    hintText="Niveau de plongée"
                                    floatingLabelText="niveau de plongée"
                                    fullWidth={true}
                                    disabled={this.isArchive(index)}
                                >
                                    {this.props.labels.map(diveLevel => (
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
                                        value == null ? null : new Date(value)
                                    )}
                                    disabled={this.isArchive(index)}
                                />
                                <Field
                                    key={`instructor-${index}`}
                                    name={`${dive}.instructor`}
                                    component={TextField}
                                    hintText="Instructeur"
                                    floatingLabelText="Instructeur"
                                    fullWidth={true}
                                    disabled={this.isArchive(index)}
                                />
                                <Field
                                    key={`origin-${index}`}
                                    name={`${dive}.origin`}
                                    component={TextField}
                                    hintText="Origine"
                                    floatingLabelText="Origine"
                                    fullWidth={true}
                                    disabled={this.isArchive(index)}
                                />
                                <Field
                                    key={`originNumber-${index}`}
                                    name={`${dive}.origin_number`}
                                    component={TextField}
                                    hintText="N° origine"
                                    floatingLabelText="n° origine"
                                    fullWidth={true}
                                    disabled={this.isArchive(index)}
                                />
                            </CardText>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }
}

const DiveTab = ({ labels }) => (
    <FieldArray
        name="dive"
        component={DiveLevel}
        props={{
            labels
        }}
    />
);

DiveTab.propTypes = {
    labels: PropTypes.array
};

export default DiveTab;
