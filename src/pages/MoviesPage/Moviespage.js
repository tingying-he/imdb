import React from 'react';
import MoviespageView from './MoviespageView';
import { connect } from 'react-redux'

const Movies = (props) => {

    //const { match: { params: { key } } } = props;
    //console.log(props)
    // useEffect(() => {

    // }, [key, props])

    const goToMoviePage = (id) => {
        props.history.push(`/movie/${id}`);
        return;
    }

    return <MoviespageView props={props} goToMoviePage={goToMoviePage} />

}



export default connect(
    state => ({ movies: state.movies }),
    dispatch => {
        return {
            setMovies: (data) => { dispatch({ type: 'SET_MOVIES', data }) },
        }
    })(Movies);