import React, { useEffect, useState } from 'react';
//@ts-ignore
import styles from './Film.module.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { MdArrowForwardIos } from 'react-icons/md'
import Table from 'antd/lib/table/Table'
import { Button, Modal } from 'antd'
import { MdDelete, MdAdd, MdEdit } from "react-icons/md"
import { IconContext } from 'react-icons/lib';
import AddFilm from './AddFilm/AddFilm';
import axiosClient from '../../../utilities/api';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss'
import EditFilm from './EditFilm/EditFilm';
export interface FilmProps { }

export interface FilmDataType {
  id?: string;
  slug?: string;
  title?: string;
  posterUrl?: string;
  backdropUrl?: string;
  genres?: {
    name?: string;
  }[];
  releaseDate?: string;
  overview?: string;
  productionCompanies?: {
    name?: string;
  }[];
  productionCountries?: {
    name?: string;
  }[];
  url?: string
}
const API_URL = "http://localhost:8080/api/movie/getall";
const Film: React.FC<FilmProps> = (props) => {
  const [film, setUser] = useState<FilmDataType[]>();
  const [bordered, setBordered] = useState(true);
  // const [size, setSize] = useState('small');
  const [xScroll, setXScroll] = useState(undefined);
  const [tableLayout, setTableLayout] = useState(undefined);
  const [visible, setVisible] = useState(false)
  const [visibleE, setVisibleE] = useState(false)
  const [currentEdit, setCurrentEdit] = useState<FilmDataType>();
  const scroll = {};
  const tableProps = { bordered, scroll, xScroll, tableLayout };
  const [update, setUpdate] = useState(false);
  const handleDeleteFilm = async (record: FilmDataType) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axiosClient.delete(`/api/movie/deleteMovie/${record.id}`)
        if (response) setUpdate(!update);
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }
  const handleEditFilm = async (record: FilmDataType) => {
    console.log("handleEditFilm:", record);
    setCurrentEdit(record);
    setVisibleE(true)
  }

  useEffect(() => {
    fetch(API_URL)
      .then((film) => film.json())
      .then((film: FilmDataType[]) => {
        setUser(film);
        // console.log("film", film);
      });
  }, [update])

  const column = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a: any, b: any) => a.id - b.id,
      render: (text: any) => <>{text}</>,
    },
    {
      title: 'Name',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'Url',
      dataIndex: 'url',
      key: 'url'
    },
    {
      title: 'Release Date',
      dataIndex: 'releaseDate',
      key: 'releaseDate',
      sorter: (a: any, b: any) => a.releaseDate - b.releaseDate,
    },
    {
      title: 'Action',
      dataIndex: 'slug',
      key: 'create',
      render: (text: any, record: FilmDataType) => (
        <div>
          <Button onClick={() => handleEditFilm(record)} className={styles["button-action"]} type="primary" ghost>
            <MdEdit className="subject" />
          </Button>
          <Button onClick={() => handleDeleteFilm(record)} className={styles["button-action"]} danger>
            <MdDelete className="subject" />
          </Button>
        </div>
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
                    <li className={styles["breadcrumb-item"]}><Link to="">Film <MdArrowForwardIos /></Link></li>
                    <li className={classNames(styles["breadcrumb-item"], styles["active"])}>List Film</li>
                  </ol>
                </div>
                <h4 className={styles["page-title"]}>List Film</h4>
              </div>
            </div>
          </div>
          <Button
            onClick={() => setVisible(true)}
            className={classNames(styles["button-action"], styles["btn-success"])}>
            <IconContext.Provider
              value={{ color: 'rgb(66, 156, 66)', }}
            > <>
                <MdAdd className={styles["btn-success"]} />
              </>
            </IconContext.Provider>
          </Button>
          <Modal
            okButtonProps={{ style: { display: 'none' } }}
            title="Add Film"
            centered
            visible={visible}
            onCancel={() => setVisible(false)}
            width={1000}
          >
            <AddFilm />
          </Modal>
          <Modal
            okButtonProps={{ style: { display: 'none' } }}
            title="Edit Film"
            centered
            visible={visibleE}
            onCancel={() => setVisibleE(false)}
            width={1000}
          >
            <EditFilm {...currentEdit} />
          </Modal>
          <Table className={styles["table"]}
            {...tableProps}
            size={'small'}
            scroll={scroll}
            columns={column}
            dataSource={film}
          />
        </div>
      </div>
    </div>
  )
};

export default Film;


