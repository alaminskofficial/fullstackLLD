import { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import MovieCard from './components/MovieCard'
import { getMovies } from './api/index'


function App() {

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [selectedFilter, setSelectedFilter] = useState("now_playing")

  useEffect(() => {

    const timer = setTimeout(() => {
      setLoading(true)
      getMovies({
        query: search,
        filter: selectedFilter
      })
        .then(val => setData(val))
        .catch(err => setError('Something Went Wrong in fetching movies'))
        .finally(() => setLoading(false))
    }, 2 * 1000)

    return () => {
      clearTimeout(timer)
    }


  }, [search, selectedFilter])


  if (loading) {
    return <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <CircularProgress size={70} />
    </div>
  }

  if (error) {
    return <h3>{error}</h3>
  }


  return (
    <div className="App">
      <h1>{selectedFilter} {`(${data?.total_results})`}</h1>
      <TextField onChange={(e) => setSearch(e.target.value)} value={search} label="Search...." variant="filled" />
      <Select value={selectedFilter} onChange={(e) => setSelectedFilter(e.target.value)}>
        <MenuItem value="now_playing">Now Playing</MenuItem>
        <MenuItem value="popular">Popular</MenuItem>
        <MenuItem value="top_rated">Top Rated</MenuItem>
      </Select>
      <div>
        <Grid container spacing={2}>
          {data?.results?.map(movie => (
            <Grid item key={movie.id} sm={12} md={6} lg={3} xl={3}>
              <MovieCard data={movie} />
            </Grid>)
          )}
        </Grid>
      </div>
    </div>
  );
}

export default App;