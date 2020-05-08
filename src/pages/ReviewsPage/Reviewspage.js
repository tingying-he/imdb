import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReviewspageView from './ReviewspageView';
import apiKey from '../../api'




const Reviews = (props) => {
    const [reviews, setReviews] = useState([]);
    const [movie, setMovie] = useState({
        base: {
            id: "/title/tt0099512/",
            image: {},
            title: "Ernest Goes to Jail",
            titleType: "movie",
            year: 1990
        },
        paginationKey: "g4wp7dbfqa2tazqe7oxhvnzwr3s4oaj5y4hhzo5ziwr26fbyhvrl4ty4oazvlnzldjundtwgjxn4xivxp6w3bhf3smfmx64o",
        reviews: [],
        totalReviews: 42
    });


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
                //  console.log(response)
                setMovie(response.data)
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
                "tconst": id
            }
        })
            .then((response) => {
                // console.log(response)
                setReviews(response.data.reviews)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [props])


    return (<ReviewspageView reviews={reviews} movie={movie} props={props} />)

}



export default Reviews;