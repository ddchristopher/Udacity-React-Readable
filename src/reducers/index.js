import { combineReducers } from 'redux'
import categories from './categories'
import posts from './posts'
import comments from './comments'
import currentPost from './currentPost'

export default combineReducers({
    categories,
    posts,
	comments,
	currentPost
})