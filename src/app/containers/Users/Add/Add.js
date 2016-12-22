import React, { PropTypes } from 'react';
import UserAdd from '../../../components/UserAdd/UserAdd';

class Add extends React.Component {
    static contextTypes = {
        router: PropTypes.func,
        muiTheme: PropTypes.object
    };

    constructor(props, context) {
        super(props, context);
        this.test = null;
    }

    render() {
        console.log(this.test);
        return (
            <UserAdd
                back={this.context.router.goBack}
                theme={this.context.muiTheme}
            />
        );
    }

}

export default Add;
