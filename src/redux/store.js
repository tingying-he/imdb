import { createStore } from 'redux'
import reducer from './reducer';

const store = createStore(reducer);
store.subscribe(() => {
    localStorage.setItem('wishlist', JSON.stringify(store.getState().wishList))
})

export default store;