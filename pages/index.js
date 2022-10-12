import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState } from 'react'
import axios from 'axios'
import { Alert, Backdrop, Button, CircularProgress, Snackbar } from '@mui/material'
import Error from '../components/error'
import Table from '../components/table'


export default function Home() {

  const [products, setProducts] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [deleteError, setDeleteError] = useState(false)

  function handleBackDropClose() { }

  const handleDeleteBtnClicked = (event, cellValues) => {
    setLoading(true)
    axios.delete(`${window.location.origin}/api/products/${cellValues.row.id}`).then(resp => {
      const data = resp.data
      if (data.error) {
        setDeleteError(true)
      } else {
        setProducts(state => state.filter(el => el.id != cellValues.row.id))
      }
    }).finally(() => setLoading(false))
    console.log(cellValues.row.id);
  }

  const fetchProducts = () => {
    setLoading(true)
    setError(null)
    axios.get(`${window.location.origin}/api/products`).then(resp => {
      const data = resp.data
      if (data.error) {
        setError({ msg: data.error })
      } else {
        setProducts(data.data)
      }
    }).finally(() => setLoading(false))
  }

  React.useEffect(() => {
    fetchProducts()
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Shopify Api</title>
        <meta name="description" content="A simple app to practice api" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons" />

      </Head>

      <main className={styles.main}>
        <Snackbar open={deleteError} autoHideDuration={6000}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}>
          <Alert onClose={() => { }} severity='error' sx={{ width: '100%' }}>
            Failed to delete,please try again later
          </Alert>
        </Snackbar>
        {error && <Error onRetryClicked={fetchProducts}></Error>}
        {products && <Table products={products} handelDeleteClicked={handleDeleteBtnClicked}></Table>}
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
          onClick={handleBackDropClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </main>

      <footer className={styles.footer}>
        Shopify API Test
      </footer>
    </div>
  )
}
