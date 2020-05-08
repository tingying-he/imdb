import React, { Fragment } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import Nav from '../../components/Navbar';

const MoviesList = ({ goTo, movies, remove, manage }) => {
    if (movies.length === 0)
        return <p><br/>&nbsp;&nbsp;&nbsp;&nbsp;Your wish list is currently empty o(^・x・^)o <br/>&nbsp;&nbsp;&nbsp;&nbsp;Try to find a movie you like and add it to wish list!</p>

    return movies.map((data) => {
        return <div key={data.imdbID} style={{position:"relative"}}>
            {
                manage ? <button onClick={() => {
                    const r = window.confirm(` (^･ｪ･^)  Do you want to remove ${data.Title} from your Wishlist? `);
                    if (r === true) {
                        remove(data) ;
                        }                 
                    }} style={{ borderRadius: '50px', width: '30px', height: '30px', position:'absolute', right:'0px', backgroundColor:'darkgrey' ,border:'none',color:'white'}}>X</button> : ''
            }
            <div onClick={e => { goTo(data.imdbID) }} key={data.imdbID} style={{ textAlign: 'center', padding: '10px', margin:'12px',display: 'inline-block', height: '300px',boxShadow: '5px 5px 5px #d3d3d3'}} >
                <img style={{ width: '160px', height: '250px'}} src={data.Poster} alt="..." />
                <br />
                <div style={{fontSize:'12px', width: '150px', height: '50px', textAlign: 'center', overflowY: 'hidden' }}>
                    <div style={{ overflowX: 'hidden', height: '20px' }}> {data.Title}</div>
                    <p> {data.Year}</p>
                </div>
            </div>
        </div>

    })
}

const WishListpageView = ({ goToMoviePage, movies, props, manage, setManage }) => {
    return <Fragment>
        <Nav goTo={props.history} />
        <br />
        <Container>
            <h2>Wish List</h2>
            {/* <a href="#!" onClick={() => setManage(!manage)} > {manage ? 'Finish':'Manage'}</a> */}
            <Button className='btn-primary' onClick={() => setManage(!manage) } size="sm "> {manage ? 'Finish':'Manage'} </Button>

            <Row>
                <MoviesList goTo={goToMoviePage} movies={movies} remove={props.removeMovie} manage={manage}></MoviesList>
            </Row>
        </Container>
    </Fragment>
}

export default WishListpageView