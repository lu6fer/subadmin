import React, { PropTypes } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const GroupTab = ({ groups }) => (
    <div>
        <pre>{JSON.stringify(groups)}</pre>
        <FloatingActionButton
            secondary={true}
            className="useredit__add useredit__add_group"
        >
            <ContentAdd />
        </FloatingActionButton>
    </div>
);

GroupTab.propTypes = {
    groups: PropTypes.array
};

export default GroupTab;
