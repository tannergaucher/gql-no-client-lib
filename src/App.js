import React, { useState, useEffect } from 'react'

import './App.css'

export default function App() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchData() {
      setLoading(true)

      try {
        const res = await fetch(
          process.env.REACT_APP_URL + '/.netlify/functions/graphql',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: `query { hello }`,
            }),
          }
        )
        const { data } = await res.json()
        setData(data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setError(true)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <h1>GQL no client lib</h1>
      {loading && `Loading...`}
      {error && `ERROR...`}
      {data && data.hello && `${data.hello}`}
    </>
  )
}
