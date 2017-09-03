import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import clientMiddleware from 'stores/middlewares/clientMiddleware';
import request from 'services/request';

const middlewares = [thunk, clientMiddleware(request)];

export default configureMockStore(middlewares);
