import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Main from './Main'


const App = (props) => {
	return (
        <div className="App">
            <Switch>
				{/* Uses router to pass a path prop to Main component, which Main will use to load the matching category list or post details */}
                {/* Path for list view */}
                <Route exact path="/" component={Main}/>
                <Route exact path="/:category" component={Main}/>
                {/* Path for details view */}
                <Route exact path="/:category/:id" component={Main}/>
	            {/* Redirects to root with an invalid url */}
	            <Route path="/:category/:id/:invalid" render={() => (
		            <Redirect to="/"/>
	            )}/>


            </Switch>
        </div>
	)
}

export default App
