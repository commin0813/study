import {createWrapper} from 'next-redux-wrapper'
import {createStore} from 'redux'

const configuresStore = () => {
    const store = createStore(reducer);
    return store
};

const wrapper = createWrapper(configuresStore, {debug: process.env.NODE_ENV === 'development'});


export default wrapper;