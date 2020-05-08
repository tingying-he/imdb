import React, { Fragment } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap'
import Nav from '../../components/Navbar';

const Stars = ({ num }) => {
    num = num / 2
    let i = 1;
    return (<Fragment><span className={`fa fa-star ${i++ <= num ? "checked" : ""}`} ></span>
        <span className={`fa fa-star ${i++ <= num ? "checked" : ""}`}></span>
        <span className={`fa fa-star ${i++ <= num ? "checked" : ""}`}></span>
        <span className={`fa fa-star ${i++ <= num ? "checked" : ""}`}></span>
        <span className={`fa fa-star ${i++ <= num ? "checked" : ""}`}></span>
    </Fragment>)
}


const MovieDetailPageView = ({ movie, reviews, added, removeFromList, addToList, props }) => {
    return (
        <Fragment>
            <Nav goTo={props.history} />
            <br />
            <br />
            <Container>
                <Row>
                    <Col sm={3}>
                        <img style={{ width: '100%', height: '100%' }} src={movie.Poster} alt="..." />
                    </Col>
                    <Col sm={8}>
                        <h2>{movie.Title}</h2>
                        <Stars num={movie.imdbRating} />
                        <div><strong>Director:</strong> {movie.Director}</div>
                        <div><strong>Writers:</strong> {movie.Writer.replace(/,/g, '/')}</div>
                        <div><strong>Starring:</strong> {movie.Actors}</div>
                        <div><strong>Gener:</strong> {movie.Genre}</div>
                        <div><strong>Country:</strong> {movie.Country}</div>
                        <div><strong>Langages:</strong> {movie.Language}</div>
                        <div><strong>Duration:</strong> {movie.Runtime}</div>
                        {!added ? <Button className='btn-warning' 
                                          onClick={() => { 
                                         addToList(movie); 
                                          }} >Add to Wish List</Button> :
                            <Button className='btn-secondary' onClick={() => { 
                                const r = window.confirm(` (^･ｪ･^)  Do you want to remove ${movie.Title} from your Wishlist? `);
                                if (r === true) {
                                    removeFromList(movie)  ;
                                        }  
                            }} >Remove from Wish List</Button>}

                    </Col>
                </Row>
                <br />
                <Row>
                    <Col >
                        <h4>Introduction </h4>
                        <p>{movie.Plot}</p>
                    </Col>
                </Row>
                <Row>
                    <Col >
                        <h4>Reviews <Button className='btn btn-light' onClick={e => { props.history.push(`/reviews/${movie.imdbID}`) }} active>See All</Button></h4>
                        {reviews.length === 0 ? '' :
                            (<div>
                                <strong>
                                    {reviews[0].submissionDate} | By {reviews[0].author.displayName}</strong>
                                <br />
                                <Stars num={reviews[0].authorRating} />
                                <div><strong>{reviews[0].reviewTitle}</strong></div>
                                <div>{reviews[0].reviewText}</div>

                            </div>)}
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}

export default MovieDetailPageView;