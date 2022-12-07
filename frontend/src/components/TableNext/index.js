import React from 'react';
// import classnames from 'classnames';
import PropTypes from 'prop-types';
import './styles.scss';

import { Table, Row, Col, User, Text } from '@nextui-org/react';
// import {Tooltip } from '@nextui-org/react';

import { StyledBadge } from './StyledBadge';
// import { IconButton } from './IconButton';
// import { EyeIcon } from './EyeIcon';
// import { EditIcon } from './EditIcon';
// import { DeleteIcon } from './DeleteIcon';

const TableNext = (props) => {
  const columns = [
    { name: 'NAME', uid: 'name' },
    { name: 'ROLE', uid: 'role' },
    { name: 'STATUS', uid: 'status' },
    { name: 'ACTIONS', uid: 'actions' },
  ];

  const users = [
    {
      id: 1,
      name: 'Đoàn Trần Cao Trí',
      role: 'Leader, PM',
      team: '-',
      status: 'active',
      age: '29',
      avatar: 'https://zpsocial-f42-org.zadn.vn/f6d223aa42d6ae88f7c7.jpg',
      idNumber: '2010733',
    },
    {
      id: 2,
      name: 'Phan Gia Anh',
      role: 'Graph, BE',
      team: '-',
      status: 'active',
      age: '25',
      avatar: 'https://zpsocial-f49-org.zadn.vn/58c6fdd9c90726597f16.jpg',
      idNumber: '2270167',
    },
    {
      id: 3,
      name: 'Nguyễn Trường Thành',
      role: 'Graph, FE',
      team: '-',
      status: 'active',
      age: '22',
      avatar: 'https://zpsocial-f53-org.zadn.vn/e5b851287be795b9ccf6.jpg',
      idNumber: '2270084',
    },
    {
      id: 4,
      name: 'Nguyễn Đức Phú',
      role: 'Data',
      team: '-',
      status: 'active',
      age: '28',
      avatar: 'https://f24-org-zp.zdn.vn/710fc5e5fc8617d84e97.jpg',
      idNumber: '2171014',
    },
    {
      id: 5,
      name: 'Vũ Phương Thảo',
      role: 'Data',
      team: '-',
      status: 'active',
      age: '24',
      avatar: 'https://zpsocial-f49-org.zadn.vn/4f6684c9262ac974903b.jpg',
      idNumber: '2070430',
    },
  ];

  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case 'name':
        return (
          <User squared src={user.avatar} name={cellValue} css={{ p: 0 }}>
            {user.idNumber}
          </User>
        );
      case 'role':
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: 'capitalize' }}>
                {cellValue}
              </Text>
            </Row>
            <Row>
              <Text b size={13} css={{ tt: 'capitalize', color: '$accents7' }}>
                {user.team}
              </Text>
            </Row>
          </Col>
        );
      case 'status':
        return <StyledBadge type={user.status}>{cellValue}</StyledBadge>;

      // case 'actions':
      //   return (
      //     <Row justify="center" align="center">
      //       <Col css={{ d: 'flex' }}>
      //         <Tooltip content="Details">
      //           <IconButton onClick={() => console.log('View user', user.id)}>
      //             <EyeIcon size={20} fill="#979797" />
      //           </IconButton>
      //         </Tooltip>
      //       </Col>
      //       <Col css={{ d: 'flex' }}>
      //         <Tooltip content="Edit user">
      //           <IconButton onClick={() => console.log('Edit user', user.id)}>
      //             <EditIcon size={20} fill="#979797" />
      //           </IconButton>
      //         </Tooltip>
      //       </Col>
      //       <Col css={{ d: 'flex' }}>
      //         <Tooltip
      //           content="Delete user"
      //           color="error"
      //           onClick={() => console.log('Delete user', user.id)}
      //         >
      //           <IconButton>
      //             <DeleteIcon size={20} fill="#FF0080" />
      //           </IconButton>
      //         </Tooltip>
      //       </Col>
      //     </Row>
      //   );
      default:
        return cellValue;
    }
  };
  return (
    <Table
      aria-label="Example table with custom cells"
      css={{
        height: 'auto',
        minWidth: '100%',
      }}
      selectionMode="none"
    >
      <Table.Header columns={columns}>
        {(column) => (
          <Table.Column
            key={column.uid}
            hideHeader={column.uid === 'actions'}
            align={column.uid === 'actions' ? 'center' : 'start'}
          >
            {column.name}
          </Table.Column>
        )}
      </Table.Header>
      <Table.Body items={users}>
        {(item) => (
          <Table.Row>
            {(columnKey) => <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>}
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
};

TableNext.defaultProps = {
  buttonName: '',
  onClick: () => {},
  isWhite: false,
  className: '',
};

TableNext.propTypes = {
  buttonName: PropTypes.string,
  onClick: PropTypes.func,
  isWhite: PropTypes.bool,
  className: PropTypes.string,
};

export default TableNext;
