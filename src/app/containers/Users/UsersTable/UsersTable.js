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
import ContentSort from 'material-ui/svg-icons/content/sort';

import style from './UserTable.scss';
import UserRow from '../../../components/UserRow/UserRow';

const UsersTable = ({ users, actions, sort, deleting, theme }) => {
    /*
     * Handle sort button
     */
    const handleClickButton = (field) => {
        let direction = 'asc';
        switch (sort.direction) {
            case 'asc':
                direction = 'desc';
                break;
            default:
                direction = 'asc';
        }
        actions.sort(direction, field);
    };

    /*
     *
     */
    const iconStyle = (name) => {
        const icon = {
            height: '12px',
            width: '12px',
            color: theme.palette.disabledColor
        };
        if (sort.field === name) {
            icon.transform = (sort.direction === 'asc') ?
                    'rotate(180deg)' :
                    'rotate(360deg)';
            icon.color = theme.palette.textColor;
        }
        return icon;
    };

    console.log(theme);

    return (
        <Table
            className={style.usertable}
        >
            <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
                className={style.usertable__header}
            >
                <TableRow>
                    <TableHeaderColumn
                        className={style.usertable__column}
                    >
                        <IconButton
                            iconStyle={iconStyle('name')}
                            className={style.usertable__button}
                            onClick={() => {
                                handleClickButton('name');
                            }}
                        >
                            <ContentSort />
                        </IconButton>
                        <TextField
                            fullWidth={true}
                            hintText="Nom"
                            onChange={(e, value) => actions.filter(value, 'name')}
                            className={style.usertable__field}
                        />
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        className={style.usertable__column}
                    >
                        <IconButton
                            iconStyle={iconStyle('first_name')}
                            onClick={() => {
                                handleClickButton('first_name');
                            }}
                        >
                            <ContentSort />
                        </IconButton>
                        <TextField
                            fullWidth={true}
                            hintText="Prénom"
                            onChange={(e, value) => actions.filter(value, 'first_name')}
                            className={style.usertable__field}
                        />
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        className={style.usertable__column}
                    >
                        <IconButton
                            iconStyle={iconStyle('email')}
                            onClick={() => {
                                handleClickButton('email');
                            }}
                        >
                            <ContentSort />
                        </IconButton>
                        <TextField
                            fullWidth={true}
                            hintText="E-mail"
                            onChange={(e, value) => actions.filter(value, 'email')}
                            className={style.usertable__field}
                        />
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        className={style.usertable__column}
                    >
                        <ActionSetings
                            style={{
                                color: theme.palette.disabledColor
                            }}
                        />
                    </TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => {
                    if (user.id) {
                        const isDeleting = (deleting.slug === user.slug);

                        return (
                            <UserRow
                                key={user.id}
                                user={user}
                                actions={{
                                    delete: actions.delete
                                }}
                                deleting={isDeleting}
                            />
                        );
                    }
                    return null;
                })}
            </TableBody>
        </Table>
    );
};

UsersTable.propTypes = {
    users: PropTypes.array,
    actions: PropTypes.object,
    sort: PropTypes.object,
    deleting: PropTypes.object,
    theme: PropTypes.object
};


export default UsersTable;
