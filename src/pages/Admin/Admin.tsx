import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import styles from './Admin.module.scss';

export interface AdminProps { }

export interface AdminDataType { }

const Admin: React.FC<AdminProps> = (props) => (
  <div className={styles['root']}>
    
  </div>
);

export default Admin;