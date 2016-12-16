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

const UsersTable = ({ users,
    filter, filterText, filterField,
    sort, sortDirection, sortField
}) => {
    let filteredUsers = [];
    /*
     * Filter user list
     */
    if (filterText && filterField && filterText !== '') {
        filteredUsers = users.filter(user =>
            user[filterField].match(
                new RegExp(`^${filterText}`, 'i')
            )
        );
    } else {
        filteredUsers = users;
    }

    /*
     * Sort user list
     */
    if (sortDirection && sortField) {
        if (sortDirection === 'asc') {
            filteredUsers.sort((a, b) => {
                const valA = a[sortField].toLowerCase();
                const valB = b[sortField].toLowerCase();
                if (valA < valB) {
                    return -1;
                }
                if (valA > valB) {
                    return 1;
                }
                return 0;
            });
        } else {
            filteredUsers.sort((a, b) => {
                const valA = a[sortField].toLowerCase();
                const valB = b[sortField].toLowerCase();
                if (valA > valB) {
                    return -1;
                }
                if (valA < valB) {
                    return 1;
                }
                return 0;
            });
        }
    }

    const handleClickButton = (field) => {
        let direction = 'none';
        switch (sortDirection) {
            case 'asc':
                direction = 'desc';
                break;
            case 'desc':
                direction = 'none';
                break;
            default:
                direction = 'asc';
        }

        sort(direction, field);
    };

    return (
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
                            onClick={() => {
                                handleClickButton('name');
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
                            onClick={() => {
                                handleClickButton('first_name');
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
                            onClick={() => {
                                handleClickButton('email');
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
                {filteredUsers.map(user => (
                    <UserRow key={user.id} user={user} />
                ))}
            </TableBody>
        </Table>
    );
};

UsersTable.propTypes = {
    users: PropTypes.array,
    filter: PropTypes.func,
    filterText: PropTypes.string,
    filterField: PropTypes.string,
    sort: PropTypes.func,
    sortDirection: PropTypes.string,
    sortField: PropTypes.string
};


export default UsersTable;
