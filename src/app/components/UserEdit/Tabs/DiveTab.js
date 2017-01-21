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

/* class AffixWrapper extends React.Component {

    constructor() {
        super();

        this.state = {
            affix: false
        };

        this.handleScroll = this.handleScroll.bind(this);
    }

    /!**
     * @return {void}
     *!/
    componentDidMount() {
        if (this.props.scrollElm) {
            document.getElementById(this.props.scrollElm)
                .addEventListener('scroll', this.handleScroll);
        } else {
            window.addEventListener('scroll', this.handleScroll);
        }
        this.handleScroll();
    }

    /!**
     * @return {void}
     *!/
    componentWillUnmount() {
        if (this.props.scrollElm) {
            document.getElementById(this.props.scrollElm)
                .removeEventListener('scroll', this.handleScroll);
        } else {
            window.removeEventListener('scroll', this.handleScroll);
        }
    }

    /!**
     * @return {void}
     *!/
    handleScroll() {
        const affix = this.state.affix;
        const offset = this.props.offset;
        const scrollTop = document.getElementById(this.props.scrollElm).scrollTop ||
            document.documentElement.scrollTop ||
            document.body.scrollTop;

        console.log(scrollTop);

        if (!affix && scrollTop >= offset) {
            this.setState({
                affix: true
            });
        }

        if (affix && scrollTop < offset) {
            this.setState({
                affix: false
            });
        }
    }

    render() {
        const affix = this.state.affix ? 'affix' : '';
        const { className, offset } = this.props; // eslint-disable-line no-unused-vars

        return (
            <div className={classNames(className, affix)}>
                {this.props.children}
            </div>
        );
    }
}

AffixWrapper.propTypes = {
    offset: PropTypes.number,
    className: PropTypes.string,
    children: PropTypes.object,
    scrollElm: PropTypes.string
}; */

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
    isArchive = (index) => {
        if (typeof this.props.fields.get(index) !== 'undefined') {
            return this.props.fields.get(index).archive === 1;
        }
        return false;
    };

    isNew = (index) => {
        if (typeof this.props.fields.get(index) !== 'undefined') {
            return !!this.props.fields.get(index).id;
        }
        return true;
    };

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
                            transitionEnabled={true}
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
                                        value == null ? new Date() : new Date(value)
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
