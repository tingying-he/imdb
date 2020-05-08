import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieDetailpageView from './MoiveDetailpageView';
import { connect } from 'react-redux'
import apiKey from '../../api'

const MoiveDetail = (props) => {
    const [reviews, setReviews] = useState([]);
    const [added, setAdded] = useState(false);
    const [movie, SetMovie] = useState({
        Title: "",
        Year: "",
        Rated: "",
        Released: "",
        Runtime: "",
        Genre: "",
        Director: "",
        Writer: "",
        Actors: "",
        Plot: "",
        Language: "",
        Country: "",
        Awards: "",
        Poster: ""
    })
    useEffect(() => {
        const { match: { params: { id } } } = props;
        axios({
            "method": "GET",
            "url": "https://movie-database-imdb-alternative.p.rapidapi.com/",
            "headers": {
                "content-type": "application/octet-stream",
                "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
                "x-rapidapi-key": apiKey
            }, "params": {
                "i": id,
                "r": "json"
            }
        })
            .then((response) => {
                // console.log(response)
                SetMovie(response.data)
                // props.wishList = JSON.parse(list);
                if (props.wishList.find(el => el.imdbID === movie.imdbID)) {
                    setAdded(true);
                }
            })
            .catch((error) => {
                console.log(error)
            })


        axios({
            "method": "GET",
            "url": "https://imdb8.p.rapidapi.com/title/get-user-reviews",
            "headers": {
                "content-type": "application/octet-stream",
                "x-rapidapi-host": "imdb8.p.rapidapi.com",
                "x-rapidapi-key": apiKey
            }, "params": {
                "tconst": "tt0944947"
            }
        })
            .then((response) => {
                setReviews(response.data.reviews)
                // console.log(response.data.reviews)
            })
            .catch((error) => {
                console.log(error)
            })

    }, [movie.imdbID, props])

    const addToList = (movie) => {
        axios.post('http://localhost:3001/api/add', { mov: movie })
        props.addMovie(movie)
        // alert('Movie added to wish list')
        setAdded(true);
    }

    const removeFromList = (movie) => {
        props.removeMovie(movie);
        // alert('Movie has been removed from wish list')
        setAdded(false);
    }
    return (
        <MovieDetailpageView
            movie={movie}
            reviews={reviews}
            added={added}
            removeFromList={removeFromList}
            addToList={addToList}
            props={props} />
    )
}


export default connect(
    state => ({ wishList: state.wishList }),
    dispatch => {
        return {
            addMovie: (data) => { dispatch({ type: 'ADD_WISHLIST', data }) },
            removeMovie: (data) => { dispatch({ type: 'REMOVE_WISHLIST', data }) }
        }
    })(MoiveDetail);
