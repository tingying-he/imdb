import React, { useState} from 'react'
import { connect } from 'react-redux'
import Homepage from './HomepageView'
import axios from 'axios'
import firebase from '../../firebase'
import apiKey from '../../api'


import './Homepage.css';

const Home = (props) => {
    const [key, setKey] = useState("");
    const [hot, setHot] = useState([]);
    const [loading, setLoading] = useState(false);
    const [toplist, setTopList] = useState(false);

    const doSearch = (keyword) => {
        if (keyword) {
            setLoading(true)
            http(keyword)

        } else {
            props.setMovies([]);
            setLoading(true)
            http(key)
            
        }

    }

    const http = (key) => {
        // key?
        // axios({
        //     "method": "GET",
        //     "url": "https://movie-database-imdb-alternative.p.rapidapi.com/",
        //     "headers": {
        //         "content-type": "application/octet-stream",
        //         "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
        //         "x-rapidapi-key": apiKey
        //     }, "params": {
        //         "page": "1",
        //         "r": "json",
        //         "s": key,
        //     }
        // }).then((response) => {
        //     if (!response.data.Search) {
        //         props.history.push(`/movies/${key}`);
        //         return;
        //     }
        //     const itemsRef = firebase.database().ref('items/' + key);
        //     firebase.database().ref('items/' + key).once('value').then((snapshot) => {
        //         itemsRef.set(snapshot.val() + 1)
        //     });

        //     props.setMovies(response.data.Search)
        //     setLoading(false)
        //     props.history.push(`/movies/${key}`);

        // }):
        // alert('Please input something or click a Popular Keyword : )');

        if(key)
        {axios({
            "method": "GET",
            "url": "https://movie-database-imdb-alternative.p.rapidapi.com/",
            "headers": {
                "content-type": "application/octet-stream",
                "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
                "x-rapidapi-key": apiKey
            }, "params": {
                "page": "1",
                "r": "json",
                "s": key,
            }
        }).then((response) => {
            if (!response.data.Search) {
                props.history.push(`/movies/${key}`);
                return;
            }
            const itemsRef = firebase.database().ref('items/' + key);
            firebase.database().ref('items/' + key).once('value').then((snapshot) => {
                itemsRef.set(snapshot.val() + 1)
            });

            props.setMovies(response.data.Search)
            setLoading(false)
            props.history.push(`/movies/${key}`);

        })}else
        {alert('Please input something or click a Hot Keyword : )');
         setLoading(false);
    }


    
    }
    

    const gotoWishList = () => {
        props.history.push(`/wishlist`);
    }

    const top100 = () => {
        props.setMovies([]);
        firebase.database().ref('items').on('value', onValueUpdate);
        setTopList(true)
    }

    const onValueUpdate = (snapshot) => {
        let items = snapshot.val();
        let arr = [];
        for (let item in items) {
            arr.push({
                key: item,
                count: items[item]
            });
        }
        arr = arr.sort((a, b) => b.count - a.count).slice(0, 15);
        setHot(arr)
    }

    const handleSearch = (e) => {
        if (e.key === 'Enter')
            doSearch()
    }

    const hideList = () => {
        setTopList(false);
    }


    return (
<Homepage doSearch={doSearch}
            gotoWishList={gotoWishList}
            handleSearch={handleSearch}
            setKey={setKey}
            top100={top100}
            hot={hot}
            loading={loading}
            toplist={toplist}
            hideList={hideList} />

        
    )
}

export default connect(
    null,
    dispatch => {
        return {
            setMovies: (data) => { dispatch({ type: 'SET_MOVIES', data }) }
        }
    })(Home);;