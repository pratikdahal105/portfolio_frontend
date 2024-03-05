import React from 'react'
import { CircularProgress } from "@material-ui/core";
import Styles from './Loading.module.css';

export const Loading = () => {
  return (
    <div className={Styles.loadingPage}>
        <div className={Styles.loadingContainer}>
            <CircularProgress color="primary" />
        </div>
    </div>
  )
}
