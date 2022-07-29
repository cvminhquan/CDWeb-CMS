import { Form, message, Input, Button, Row, Col } from 'antd';
import React, { useEffect, useState } from 'react';
import { FilmDataType } from '../Film';
import styles from './AddFilm.module.scss';
import axiosClient from '../../../../utilities/api';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import TextArea from 'antd/lib/input/TextArea';

export interface AddFilmProps {
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

export interface AddFilmDataType { }
const API_URL = "http://localhost:8080/api/movie/getall";

const AddFilm: React.FC<AddFilmProps> = (props) => {
  const [film, setUser] = useState<FilmDataType>();
  const [message, setMessage] = useState('')
  const [update, setUpdate] = useState(false);

  const onFinish = async (values: any) => {
    const response = await axiosClient.post(`/api/movie/addmovie`, {
      ...values,
      productionCountries: [{ name: values.productionCountries }],
      productionCompanies: [{ name: values.productionCompanies }],
      genres: [{ name: values.genres }],
    });
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
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{ width: '500px' }}
      >
        <div
          style={{
            color: message === 'Tên môn đã tồn tại' ? 'red' : 'green',
            fontSize: '1.2rem',
            marginBottom: '1rem',
          }}
        >
          {message}
        </div>
        <Row>
          <Col xs={{ span: 1, offset: 2 }} lg={{ span: 20, offset: 2 }}>
            <Form.Item
              label="Slug Film"
              name="slug"
              rules={[{ required: true, message: 'Please input id film!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Tile Film"
              name="title"
              rules={[{ required: true, message: 'Please input film title!' }]}
            >
              <Input
              // value={title}
              // onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Release Date"
              name="releaseDate"
              rules={[{ required: true, message: 'Please input release Date!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Poster Url"
              name="posterUrl"
              rules={[{ required: true, message: 'Please input poster url!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }} >
            <Form.Item
              label="Backdrop Url"
              name="backdropUrl"
              rules={[{ required: true, message: 'Please input backdrop url!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Overview"
              name="overview"
              rules={[{ required: true, message: 'Please input Overview!' }]}
            >
              <TextArea />
            </Form.Item>
            <Form.Item
              label="Genres"
              name="genres"
              rules={[{ required: true, message: 'Please input Genres!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Product Companies"
              name="productionCompanies"
              rules={[{ required: true, message: 'Please input Product Companies!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Product Country"
              name="productionCountries"
              rules={[{ required: true, message: 'Please input Product Country!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Url"
              name="url"
              rules={[{ required: true, message: 'Please input url!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
      Col
    </Col>
    <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
      Col
    </Col>
    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
      Col
    </Col>
  </Row>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Create Film
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
};

export default AddFilm;