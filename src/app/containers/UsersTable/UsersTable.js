import React, { PropTypes } from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow
} from 'material-ui/Table';
import ActionSetings from 'material-ui/svg-icons/action/settings';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import NavigationArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward';
import NavigationArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward';

import UserRow from '../../components/UserRow/UserRow';

const UsersTable = ({ users, filter }) => (
    <Table
        height={'100%'}
        fixedHeader={true}
        selectable={false}
    >
        <TableHeader
            style={{ backgroundColor: 'rgb(224, 224, 224)' }}
            displaySelectAll={false}
            adjustForCheckbox={false}
        >
            <TableRow
                style={{ backgroundColor: 'rgb(224, 224, 224)' }}
            >
                <TableHeaderColumn>
                    <IconButton
                        iconStyle={{
                            width: '12px',
                            height: '12px'
                        }}
                    >
                        <NavigationArrowDownward />
                    </IconButton>
                    <TextField
                        style={{ backgroundColor: 'rgb(224, 224, 224)' }}
                        fullWidth={true}
                        hintText="Nom"
                        onChange={(e, value) => filter(value, 'name')}
                    />
                </TableHeaderColumn>
                <TableHeaderColumn>
                    <IconButton
                        iconStyle={{
                            width: '12px',
                            height: '12px'
                        }}
                    >
                        <NavigationArrowDownward />
                    </IconButton>
                    <TextField
                        style={{ backgroundColor: 'rgb(224, 224, 224)' }}
                        fullWidth={true}
                        hintText="Prénom"
                        onChange={(e, value) => filter(value, 'first_name')}
                    />
                </TableHeaderColumn>
                <TableHeaderColumn>
                    <IconButton
                        iconStyle={{
                            width: '12px',
                            height: '12px'
                        }}
                    >
                        <NavigationArrowUpward />
                    </IconButton>
                    <TextField
                        style={{ backgroundColor: 'rgb(224, 224, 224)' }}
                        fullWidth={true}
                        hintText="E-mail"
                        onChange={(e, value) => filter(value, 'email')}
                    />
                </TableHeaderColumn>
                <TableHeaderColumn>
                    <ActionSetings
                        style={{ color: 'inherit' }}
                    />
                </TableHeaderColumn>
            </TableRow>
        </TableHeader>
        <TableBody
            stripedRows={true}
        >
            {users.map(user => (
                <UserRow key={user.id} user={user} />
            ))}
        </TableBody>
    </Table>
);

UsersTable.propTypes = {
    users: PropTypes.array,
    filter: PropTypes.func
};


export default UsersTable;
