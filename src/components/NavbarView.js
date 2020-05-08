import React from 'react';
import { Link } from "react-router-dom";
import { Container} from 'react-bootstrap';

const NavBarView = ({ setKey, handleSearch }) => {
    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Container>
        <a className="navbar-brand" href="/"><img src="/logo1.png" alt="logo" style={{width:'30px'}}></img></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <div style={{ width: '80%', textAlign: "center" }} className="form-inline input-icons">
                <i className="fa fa-search icon" aria-hidden="true"></i>
                <input style={{ width: '80%', borderRadius: '5px', padding: '0px 40px' }}  onChange={(e) => { setKey(e.target.value) }} onKeyPress={(e) => { handleSearch(e) }} className="form-control mr-sm-10" type="search" placeholder="Search for movies you are interested in..." aria-label="Search" />
            </div>
            {/* <ul className="navbar-nav">
                <li className="nav-item"> */}
            <div>
            <Link className="nav-link" to="/wishlist" style={{color:'#007BFF',fontWeight:'700',paddingRight:'0px'}}>
            <i className="fa fa-bookmark" style={{fontSize:"20px"}}></i>
            &nbsp;&nbsp;Wish List
                        </Link>
            </div>

                {/* </li>
            </ul> */}
        </div>
        </Container>

    </nav>
        

    )
}

export default NavBarView;