import React, { useEffect, useState } from 'react';
//@ts-ignore
import styles from './User.module.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { MdArrowForwardIos } from 'react-icons/md'
import Table from 'antd/lib/table/Table'
import { Button, Modal } from 'antd'
import { MdDelete } from "react-icons/md"
import axiosClient from '../../../utilities/api';
export interface UserProps { }

export interface UserDataType {
  id?: number;
  name: string;
  username: string;
  roles: {
    id: number;
    name: string;
  }[];
}

const API_USER = "http://localhost:8080/api/user/getalluser";
const API_DEL_USER = `http://localhost:8080/api/auth/deleteuser`;


const User: React.FC<UserProps> = (props) => {
  const [user, setUser] = useState<UserDataType[]>();
  const [a, setA] = useState(false);

  const handleDeleteUser = async (record:UserDataType) =>{
    console.log(record)
    const response = await axiosClient.delete(`/api/auth/deleteuser/${record.id}`)
    console.log(response)
    if(response) setA(!a);

  }

  useEffect(() => {
    fetch(API_USER)
      .then((user) => user.json())
      .then((user: UserDataType[]) => {
        setUser(user);
        console.log("user", user);
        // console.log(user[0].roles[0].name);
      });
  }, [a])
  const column = [
    {
      title: 'User ID',
      dataIndex: 'id',
      key: 'id',
      render: (text: string) => <>{text}</>,
    },
    {
      title: 'Full Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    // {
    //   title: 'Roles',
    //   dataIndex: 'roles.id',
    //   key: 'roles.id',
    // },

    {
      title: '',
      dataIndex: 'id',
      key: 'create',
      render: (text: string, record: UserDataType) => (
        <Button danger 
        onClick={() => handleDeleteUser(record)}
        >
          <MdDelete className="subject" />
        </Button>
      ),
    },
  ]
  
  return (
    <div className={styles['root']}>
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className={styles["page-title-box"]}>
                <div className={styles["page-title-right"]}>
                  <ol className="breadcrumb m-0">
                    <li className={styles["breadcrumb-item"]}><Link to="">Admin <MdArrowForwardIos /></Link></li>
                    <li className={styles["breadcrumb-item"]}><Link to="">User<MdArrowForwardIos /></Link></li>
                    <li className={classNames(styles["breadcrumb-item"], styles["active"])}>List User</li>
                  </ol>
                </div>
                <h4 className={styles["page-title"]}>List User</h4>
              </div>
            </div>
          </div>
          <Table className={styles["table"]}
            columns={column}
            dataSource={user}
          />
        </div>
        {a}
      </div>
    </div>
  )
};

export default User;
