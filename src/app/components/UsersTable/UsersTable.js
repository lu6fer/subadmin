import React, { PropTypes } from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow
} from 'material-ui/Table';

import UserRow from '../UserRow/UserRow';

const UsersTable = ({ users }) => (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHeaderColumn>Nom</TableHeaderColumn>
                <TableHeaderColumn>Prenom</TableHeaderColumn>
                <TableHeaderColumn>E-mail</TableHeaderColumn>
                <TableHeaderColumn>Actions</TableHeaderColumn>
            </TableRow>
        </TableHeader>
        <TableBody>
            {users.map(user => (
                <UserRow user={user} />
            ))}
        </TableBody>
    </Table>
);

UsersTable.propTypes = {
    users: PropTypes.array
};

export default UsersTable;
