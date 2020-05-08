const initState = () => {
    let wishList = localStorage.getItem('wishlist');
    if (wishList) {
        wishList = JSON.parse(wishList)
    } else {
        wishList = []
    }

    return {
        movies: [],
        wishList
    }
}


const reducer = (state = initState(), actions) => {
    switch (actions.type) {
        case 'SET_MOVIES':
            return Object.assign({}, state, {
                movies: actions.data
            });
        case 'ADD_WISHLIST':

            state.wishList.push(actions.data)
            return Object.assign({}, state, {
                wishList: state.wishList
            });
        case 'REMOVE_WISHLIST':

            state.wishList = state.wishList.filter(el => el.imdbID !== actions.data.imdbID)
            return Object.assign({}, state, {
                wishList: state.wishList
            });
        default:
            return state;
    }
}

export default reducer;