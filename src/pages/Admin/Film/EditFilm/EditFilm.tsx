import React, { useEffect, useState } from 'react';
import axiosClient from '../../../../utilities/api';
import styles from './EditFilm.module.scss';
import 'sweetalert2/src/sweetalert2.scss'
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Button, Form, Input } from 'antd';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { FilmDataType } from '../Film';
import TextArea from 'antd/lib/input/TextArea';

export interface EditFilmProps { }

export interface EditFilmDataType {
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
// const API_DETAIL_URL = `http://localhost:8080/api/movie/${slug}`;

const EditFilm: React.FC<FilmDataType> = (props) => {
  const [film, setFilm] = useState<EditFilmDataType>();
  const { slug } = useParams();
  console.log("init:", { props });
  const [message, setMessage] = useState('')
  const [update, setUpdate] = useState(false);

  const onFinish = async (record: FilmDataType) => {
    console.log("record", record);
    
  //   console.log({...record, 
  //   genres: [
  //     {
  //       name: (record as any)["genres[0].name"],
  //     }
  //   ],
  //   productionCompanies: [
  //     {
  //       name: (record as any)["productionCompanies[0].name"],
  //     }
  //   ],
  //   productionCountries: [
  //     {
  //       name: (record as any)["productionCountries[0].name"],
  //     }
  //   ],
  // });

    const response = await axiosClient.put(`/api/movie/update/${props.slug}`, { ...props, productionCountries: [{ name: props.productionCountries }],
    productionCompanies: [{ name: props.productionCompanies }],
    genres: [{ name: props.genres }], })
    console.log(response);
    if (response) setUpdate(!update);
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Add Movie Successfully'
    })
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className={styles['root']}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={props || {}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{ width: '500px' }}
      >

        <Form.Item
          label="Slug Film"
          name="slug"

        >
          <Input value={props?.slug} />
        </Form.Item>

        <Form.Item
          label="Tile Film"
          name="title"
        >
          <Input value={props?.title} />
        </Form.Item>

        <Form.Item
          label="Release Date"
          name="releaseDate"
        >
          <Input
            value={props?.releaseDate}
          />
        </Form.Item>
        <Form.Item
          label="Poster Url"
          name="posterUrl"
        >
          <Input value={props?.posterUrl}
          />
        </Form.Item>
        <Form.Item
          label="Backdrop Url"
          name="backdropUrl"
        >
          <Input value={props?.backdropUrl}
          />
        </Form.Item>
        <Form.Item
          label="Overview"
          name="overview"
        >
          <TextArea
            value={props?.overview}
          />
        </Form.Item>
        <Form.Item
          label="Url"
          name="url"
        >
          <Input value={props?.url}
          />
        </Form.Item>
        <Form.Item
          label="Genres"
          name="genres"

        >
          {props.genres && <Input
            value={props.genres[0].name}
          />}
        </Form.Item>
        <Form.Item
          label="Product Companies"
          name="productionCompanies[0].name"
        >
          {props.productionCompanies && <Input
            value={props.productionCompanies[0]?.name}
          />}
        </Form.Item>

        <Form.Item
          label="Product Country"
          name="productionCountries[0].name"
        >
          {props.productionCountries && <Input
            value={props.productionCountries[0]?.name}
          />}
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Edit Film
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
};

export default EditFilm;