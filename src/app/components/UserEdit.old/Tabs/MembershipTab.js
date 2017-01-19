import React, { PropTypes } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';


const MembershipTab = ({ subscriptions }) => (
    <div>
        <pre>{JSON.stringify(subscriptions)}</pre>
        <FloatingActionButton
            secondary={true}
            className="useredit__membership"
        >
            <ContentAdd />
        </FloatingActionButton>
    </div>
);

MembershipTab.propTypes = {
    subscriptions: PropTypes.array
};

export default MembershipTab;
