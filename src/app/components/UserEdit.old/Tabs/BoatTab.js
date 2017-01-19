import React, { PropTypes } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const BoatTab = ({ boats }) => (
    <div>
        <pre>{JSON.stringify(boats)}</pre>
        <FloatingActionButton
            secondary={true}
            className="useredit__add useredit__add-boat"
        >
            <ContentAdd />
        </FloatingActionButton>
    </div>
);

BoatTab.propTypes = {
    boats: PropTypes.array
};

export default BoatTab;
