import React, { PropTypes } from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import ActionDelete from 'material-ui/svg-icons/action/delete';

const UserRow = ({ user }) => (
    <TableRow key={user.id}>
        <TableRowColumn>{user.name}</TableRowColumn>
        <TableRowColumn>{user.first_name}</TableRowColumn>
        <TableRowColumn>{user.email}</TableRowColumn>
        <TableRowColumn>
            <IconButton>
                <ImageEdit
                    style={{ color: 'inherit' }}
                />
            </IconButton>
            <IconButton>
                <ActionDelete
                    style={{ color: 'inherit' }}
                />
            </IconButton>
        </TableRowColumn>
    </TableRow>
);

UserRow.propTypes = {
    user: PropTypes.object
};

export default UserRow;
