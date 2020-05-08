import React from 'react'
import { InputGroup, FormControl, Button, Container, Row, Col, Badge, Spinner } from 'react-bootstrap';
const HomePageView = ({ setKey, doSearch, top100, hot, handleSearch, gotoWishList, loading, toplist, hideList }) => {
    return (
        <div>
            <Container>
                <Row className="show-grid justify-content-md-center logo">
                    <h1><img src="/logo1.png" alt="logo" style={{ width: '80px' }}></img></h1>
                    
                </Row>
                <Row className="show-grid justify-content-md-center">
                    <Col xs={12} md={12}>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Movie Search</InputGroup.Text>
                            </InputGroup.Prepend>

                            <FormControl
                                onKeyPress={(e) => handleSearch(e)}
                                onChange={(e) => { setKey(e.target.value) }}
                                placeholder="Search for movies you are interested in, for example 'cat'"
                            />
                            <InputGroup.Append>
                                {!loading ? <Button style={{ margin: '0px' }} onClick={() => { doSearch() }} variant="primary">
                                    Search
                                </Button> :
                                    <Button style={{ margin: '0px' }} variant="primary" disabled>
                                        <Spinner
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                    Search...
                                </Button>}

                            </InputGroup.Append>
                        </InputGroup>
                        
                    </Col>
                </Row>
                <Row className="">
                    <Col xs={6} md={6} className="right">
                        <Button onClick={() => { gotoWishList() }} variant="light" active>
                            Wish List
                        </Button>
                    </Col>
                    <Col xs={6} md={6} className="left">

                        {
                        toplist ? <Button onClick={() => { hideList() }} variant="light" active>
                                Hide Keywords
                        </Button>: <Button onClick={() => { top100() }} variant="warning">
                            Hot Keywords
                        </Button>}
                        
                    </Col>
                </Row>
                <Row className="" style={{ margin: '40px', textAlign: 'center', justifyContent: 'center' }}>
                    
                    <ul>
                        {toplist ? 
                        <div>
                            <p style={{color:"#999999",marginBottom:'15px'}}>The following are the TOP15 popular searched keywords.<br/> Every time you search or click a keyword, you will make the number of it +1. Give it a try!</p>
                        {hot.map((e, index) => {
                            return <li style={{ display: 'inline-block' }} key={index}><Button onClick={() => { doSearch(e.key) }} style={{ borderRadius: '50px' }} size="sm" variant="primary">
                                {e.key} <Badge variant="light">{e.count}</Badge>
                            </Button> </li>
                        }) }
                        </div>
                        : null} 
                    </ul>
                </Row>
            </Container>
        </div>
    )
}

export default HomePageView;