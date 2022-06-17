import React, { useEffect, useState } from 'react';
//@ts-ignore
import styles from './Film.module.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { MdArrowForwardIos } from 'react-icons/md'
import Table from 'antd/lib/table/Table'
import { Button, Modal } from 'antd'
import { MdDelete } from "react-icons/md"
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
  const [film, setUser] = useState<FilmDataType>();
  useEffect(() => {
    fetch(API_URL)
      .then((film) => film.json())
      .then((film: FilmDataType) => {
        setUser(film);
        console.log("film", film);
        console.log(film[0].roles[0].name);
      });
  }, [])
  const column = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text: string) => <>{text}</>,
    },
    {
      title: 'Name',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Release Date',
      dataIndex: 'releaseDate',
      key: 'releaseDate',
    },
    {
      title: 'Url',
      dataIndex: 'url',
      key: 'url',
    },
    
    {
      title: '',
      dataIndex: 'id',
      key: 'create',
      render: (text: string) => (
        <Button danger>
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
                    <li className={styles["breadcrumb-item"]}><Link to="">Film <MdArrowForwardIos /></Link></li>
                    <li className={classNames(styles["breadcrumb-item"], styles["active"])}>List Film</li>
                  </ol>
                </div>
                <h4 className={styles["page-title"]}>List Film</h4>
              </div>
            </div>
          </div>
          <Table className={styles["table"]}
            columns={column}
            dataSource={film}
          />
        </div>
      </div>
    </div>
  )
};

export default Film;