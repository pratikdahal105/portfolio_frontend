import React from 'react'
import styles from './Home.module.css'

export const Home = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
          <h1 className={styles.title}>
              This is Home
          </h1>
      </div>
    </section>
  )
}
