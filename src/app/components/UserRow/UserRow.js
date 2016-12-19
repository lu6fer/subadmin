import React, { PropTypes } from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import ActionDelete from 'material-ui/svg-icons/action/delete';

import style from './UserRow.scss';

const UserRow = ({ user, actions, deleting }) => {
    const userClassName = [style.user];
    if (deleting) {
        userClassName.push(style.user_deleting);
    }
    return (
        <TableRow key={user.id} className={userClassName.join(' ')}>
            <TableRowColumn>{user.name}</TableRowColumn>
            <TableRowColumn>{user.first_name}</TableRowColumn>
            <TableRowColumn>{user.email}</TableRowColumn>
            <TableRowColumn>
                <IconButton>
                    <ImageEdit
                        style={{ color: 'inherit' }}
                    />
                </IconButton>
                <IconButton
                    onClick={() => actions.delete(user)}
                >
                    <ActionDelete
                        style={{ color: 'inherit' }}
                    />
                </IconButton>
            </TableRowColumn>
        </TableRow>
    );
};

UserRow.propTypes = {
    user: PropTypes.object,
    actions: PropTypes.object,
    deleting: PropTypes.bool
};

export default UserRow;
