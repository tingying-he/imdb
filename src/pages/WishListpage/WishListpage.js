import React,{useState} from 'react';
import { connect } from 'react-redux';
import WishListpageView from './WishListpageView';
const WishListpage = (props) => {

    let [manage, setManage] = useState(false);
    const goToMoviePage = (id) => {
        props.history.push(`/movie/${id}`);
        return;
    }

    return <WishListpageView goToMoviePage={goToMoviePage} 
    movies={props.wishList} 
    props={props} 
    manage={manage}
    setManage={setManage} />

}



export default connect(
    state => ({ wishList: state.wishList }),
    dispatch => {
        return {
            removeMovie: (data) => { dispatch({ type: 'REMOVE_WISHLIST', data }) }
        }
    })(WishListpage);

