import React, { PropTypes } from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import cx from 'classname';

import style from './UserRow.scss';

const UserRow = ({ user, actions, deleting }) => {
    const userClassName = cx(style.userrow, {
        [style.userrow_deleting]: deleting
    });

    return (
        <TableRow key={user.id} className={userClassName}>
            <TableRowColumn
                className={style.userrow__column}
            >
                {user.name}
            </TableRowColumn>
            <TableRowColumn
                className={style.userrow__column}
            >
                {user.first_name}
            </TableRowColumn>
            <TableRowColumn
                className={style.userrow_column}
            >
                {user.email}
            </TableRowColumn>
            <TableRowColumn
                className={style.userrow__column}
            >
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
