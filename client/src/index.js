import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory} from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import reducers from './reducers';
import Homepage from './components/homepage';
import Signup from './components/signup';
import Signin from './components/signin';
import Signout from './components/signout';
import Posts from './components/posts';
import RequireAuth from './components/requireAuth';
import PostCreate from './components/post_creat';
import PostDetail from './components/post_detail';

// ReduxThunk能让我们决定什么时候把action dispatch给reducers
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Homepage}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/signin" component={Signin}/>
            <Route path='/signout' component={Signout}/>
            <Route path="/posts" component={RequireAuth(Posts)}/>
            <Route path="/posts/new" component={RequireAuth(PostCreate)}/>
            <Route path="/posts/:postId" component={RequireAuth(PostDetail)}/>
        </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
