import React, { Fragment } from 'react';
import { Container, Row } from 'react-bootstrap';
import Nav from '../../components/Navbar';
const MoviespageView = ({ props, goToMoviePage }) => {

    const MoviesList = ({ movies, goTo }) => {
        if (movies.length === 0)
            return <div><br/>&nbsp;&nbsp;&nbsp;&nbsp;No match found. Search another word please : )
            </div>

        return movies.map((data) => {
            return <div key={data.imdbID} onClick={e => { goTo(data.imdbID) }} style={{ textAlign: 'center', padding: '12px', display: 'inline-block', height: '300px', boxShadow: '5px 5px 5px #d3d3d3', margin: '1%' }}>
                <img style={{ width: '160px', height: '240px' }} src={data.Poster} alt="..." />
                <br />
                <div style={{ width: '150px', height: '50px', textAlign: 'center' }}>
                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', height: '20px' }}> {data.Title}</div>
                    <p> {data.Year}</p>
                </div>
            </div>
        })
    }
    return <Fragment>
        <Nav goTo={props.history} />
        <br />
        <Container>
            <h2> {`Results for "${props.match.params.key}" `}</h2>
            <Row >
                <MoviesList goTo={goToMoviePage} movies={props.movies}></MoviesList>
            </Row>
        </Container>
    </Fragment>
}

export default MoviespageView;