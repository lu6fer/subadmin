import React, { PropTypes } from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';

const UserRow = ({ user }) => (
    <TableRow key={user.id}>
        <TableRowColumn>{user.name}</TableRowColumn>
        <TableRowColumn>{user.first_name}</TableRowColumn>
        <TableRowColumn>{user.email}</TableRowColumn>
        <TableRowColumn>Actions</TableRowColumn>
    </TableRow>
);

UserRow.propTypes = {
    user: PropTypes.object
};

export default UserRow;
