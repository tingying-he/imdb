import React, { useState } from 'react';
import { connect } from 'react-redux';
import NavBarView from './NavbarView';
import axios from 'axios';
import firebase from '../firebase'
import './Navbar.css';
import apiKey from '../api'


const Nav = (props) => {
    const [keyw, setKeyw] = useState('')


    const doSearch = () => {
        axios({
            "method": "GET",
            "url": "https://movie-database-imdb-alternative.p.rapidapi.com/",
            "headers": {
                "content-type": "application/octet-stream",
                "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
                "x-rapidapi-key": apiKey
            }, "params": {
                "page": "1",
                "r": "json",
                "s": keyw,
            }
        })
            .then((response) => {
                // console.log(response.data)
                if (!response.data.Search) {
                    props.setMovies([]);
                    props.goTo.push(`/movies/${keyw}`);
                    return;
                }
                const itemsRef = firebase.database().ref('items/' + keyw);
                firebase.database().ref('items/' + keyw).once('value').then((snapshot)=>{
                    itemsRef.set(snapshot.val() + 1)
                });

                props.setMovies(response.data.Search)
                props.goTo.push(`/movies/${keyw}`);
            })


    }

    const setKey = (value) => {
        setKeyw(value);
    }
    const handleSearch = (e) => {
        if (e.key === 'Enter'){
            if(keyw){
                doSearch()
            }else{
                alert('Please input something : D');
            }
        }

    }
    return <NavBarView setKey={setKey} handleSearch={handleSearch} doSearch={doSearch}></NavBarView>
}

export default connect(
    null,
    dispatch => {
        return {
            setMovies: (data) => { dispatch({ type: 'SET_MOVIES', data }) }
        }
    })(Nav);