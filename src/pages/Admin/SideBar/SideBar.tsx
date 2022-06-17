import React from 'react';
import { Link, useNavigate } from "react-router-dom";
//@ts-ignore
import styles from './SideBar.module.scss';
import 'bootstrap/dist/css/bootstrap.css';
import {FaHome} from 'react-icons/fa';
import {GiFilmSpool} from 'react-icons/gi';
import {BsFillPersonLinesFill} from 'react-icons/bs';
export interface SideBarProps { }

export interface SideBarDataType { }

const SideBar: React.FC<SideBarProps> = (props) => (
  <div className={styles['root']}>
    <div className={styles['left-side-menu']}>
      <div className={styles["slimscroll-menu"]}>
        {/* <!--- Sidemenu --> */}
        <div id="sidebar-menu">
          <ul className={styles["metismenu"]} id="side-menu">
            <li className={styles["menu-title"]}>FILMHOT ADMIN</li>
            {/* <li>
              <Link to="/" className="waves-effect">
                <FaHome className={styles["icons"]}/>
                <span> Trang chủ </span>
              </Link>
            </li> */}
            <li>
              <Link to="/" className="waves-effect">
                <GiFilmSpool className={styles["icons"]}/>
                <span> Film </span>
              </Link>
            </li>
            <li>
              <Link to="/user" className="waves-effect">
                <BsFillPersonLinesFill className={styles["icons"]}/>
                <span> User </span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="clearfix"></div>
      </div>
    </div>
  </div>
);

export default SideBar;