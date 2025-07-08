import React from 'react'
import { useParams } from 'react-router-dom'

const ShowMovie = () => {

    const { movieId } = useParams();

  return (
    <div>
        hiiii id: {movieId}
    </div>
  )
}

export default ShowMovie