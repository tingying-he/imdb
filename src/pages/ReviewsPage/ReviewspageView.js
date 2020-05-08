import React, { Fragment } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
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
const ReviewsPage = ({ movie, reviews, props }) => {
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
                        <h4>Reivews</h4>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col >
                        {
                            reviews.length === 0 ? '' :
                                reviews.map(el => {
                                    return (<div key={el.id} style={{ marginTop: '20px' }}>
                                        <strong>
                                            {el.submissionDate} | By {el.author.displayName}</strong>
                                        <br />
                                        <Stars num={el.authorRating} />
                                        <div><strong>{el.reviewTitle}</strong></div>
                                        <div>{el.reviewText}</div>
                                        <hr />
                                    </div>)
                                })
                        }
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}

export default ReviewsPage;