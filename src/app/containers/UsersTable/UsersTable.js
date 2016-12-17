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


import UserRow from '../../components/UserRow/UserRow';

const UsersTable = ({
    users,
    sortAction, sortData,
    filterAction
}) => {
    /*
     * Handle sort button
     */
    const handleClickButton = (field) => {
        let direction = 'asc';
        switch (sortData.direction) {
            case 'asc':
                direction = 'desc';
                break;
            default:
                direction = 'asc';
        }
        sortAction(direction, field);
    };

    /*
     *
     */
    const iconStyle = (name) => {
        const style = {
            height: '12px',
            width: '12px',
            color: 'rgba(0, 0, 0, 0.298039)'
        };
        if (sortData.field === name) {
            style.transform = (sortData.direction === 'asc') ?
                    'rotate(180deg)' :
                    'rotate(360deg)';
            style.color = 'rgb(0,0,0)';
        }
        return style;
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
                            iconStyle={iconStyle('name')}
                            onClick={() => {
                                handleClickButton('name');
                            }}
                        >
                            <ContentSort />
                        </IconButton>
                        <TextField
                            style={{ backgroundColor: 'rgb(224, 224, 224)' }}
                            fullWidth={true}
                            hintText="Nom"
                            onChange={(e, value) => filterAction(value, 'name')}
                        />
                    </TableHeaderColumn>
                    <TableHeaderColumn>
                        <IconButton
                            iconStyle={iconStyle('first_name')}
                            onClick={() => {
                                handleClickButton('first_name');
                            }}
                        >
                            <ContentSort />
                        </IconButton>
                        <TextField
                            style={{ backgroundColor: 'rgb(224, 224, 224)' }}
                            fullWidth={true}
                            hintText="Prénom"
                            onChange={(e, value) => filterAction(value, 'first_name')}
                        />
                    </TableHeaderColumn>
                    <TableHeaderColumn>
                        <IconButton
                            iconStyle={iconStyle('email')}
                            onClick={() => {
                                handleClickButton('email');
                            }}
                        >
                            <ContentSort />
                        </IconButton>
                        <TextField
                            style={{ backgroundColor: 'rgb(224, 224, 224)' }}
                            fullWidth={true}
                            hintText="E-mail"
                            onChange={(e, value) => filterAction(value, 'email')}
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
                {users.map((user) => {
                    if (user.id) {
                        return <UserRow key={user.id} user={user} />;
                    }
                    return null;
                })}
            </TableBody>
        </Table>
    );
};

UsersTable.propTypes = {
    users: PropTypes.array,
    filterAction: PropTypes.func,
    sortAction: PropTypes.func,
    sortData: PropTypes.object
};


export default UsersTable;
