import { useEffect, useRef, useState } from 'react'
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import MovieCard from './components/MovieCard'
import { getMovies } from './api/index'


function App() {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [selectedFilter, setSelectedFilter] = useState("now_playing")
  const [page, setPage] = useState(1)

  const lastElRef = useRef(null)

  useEffect(() => {

    // const timer = setTimeout(() => {

    // }, 2 * 1000)

    setLoading(true)
    getMovies({
      query: search,
      filter: selectedFilter,
      page : page
    })
      .then(val => setData(prev => [...prev, ...val?.results]))
      .catch(err => setError('Something Went Wrong in fetching movies'))
      .finally(() => setLoading(false))

    // return () => {
    //   clearTimeout(timer)
    // }


  }, [search, selectedFilter, page])


  useEffect(() => {

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        console.log('Hey, lets fetch more movies...')
        setPage((prev) => prev + 1)
      }
    })

    if (lastElRef.current) {
      observer.observe(lastElRef.current)
    }


    return () => {
      if (lastElRef.current) {
        observer.unobserve(lastElRef.current)
      }
    }



  }, [data]);
  


  // if (loading) {
  //   return <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  //     <CircularProgress size={70} />
  //   </div>
  // }

  // if (error) {
  //   return <h3>{error}</h3>
  // }


  return (
    <div className="App">
      <h1>{selectedFilter} {`(${data?.length})`}</h1>
      <TextField onChange={(e) => setSearch(e.target.value)} value={search} label="Search...." variant="filled" />
      <Select value={selectedFilter} onChange={(e) => setSelectedFilter(e.target.value)}>
        <MenuItem value="now_playing">Now Playing</MenuItem>
        <MenuItem value="popular">Popular</MenuItem>
        <MenuItem value="top_rated">Top Rated</MenuItem>
      </Select>
      <div>
        <Grid container spacing={2}>
          {data?.map((movie, index) => (
            <Grid ref={data?.length === index + 1 ? lastElRef : undefined} item key={index} sm={12} md={6} lg={3} xl={3}>
              <MovieCard data={movie} />
            </Grid>)
          )}
        </Grid>

      </div>
    </div>
  );
}

export default App;