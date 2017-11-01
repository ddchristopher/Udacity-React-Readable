import { combineReducers } from 'redux'

import {
    GET_CATEGORIES,
    GET_POSTS,
	GET_COMMENTS,
    SORT_POSTS,
    VOTE,
    DELETE,
	NEW_POST,
	EDIT_POST,
	DETAILS,
	RESET_D,
	NEW_COMMENT,
	EDIT_COMMENT,
	VOTE_C,
	DELETE_C,
} from '../actions'

function categories (state = [], action) {
    const { categories } = action
    switch (action.type) {
        case GET_CATEGORIES :
            return [...categories]
        default :
            return state
    }
}

function posts (state = [], action) {
	const { post } = action
    let postValue = post && state.find(item => item.id === post.id)
	let index = state.indexOf(postValue)
	let changed = state.slice(0)
	switch (action.type) {
		case GET_POSTS :
			const { posts } = action
			return [...posts]
		case SORT_POSTS :
			const { sort, order } = action
			function compareAsc(a,b,prop) {
				if (a[prop] < b[prop])
					return -1
				if (a[prop] > b[prop])
					return 1
				return 0
			}
			function compareDesc(a,b,prop) {
				if (a[prop] < b[prop])
					return 1
				if (a[prop] > b[prop])
					return -1
				return 0
			}
			if (state.length < 1) {
				return state.slice(0)
			} else {
				if (order === 'ascending') {
					return state.slice(0).sort((a,b) => compareAsc(a,b,sort))
				} else {
					return state.slice(0).sort((a,b) => compareDesc(a,b,sort))
				}
			}
        case VOTE :
            changed.splice(index, 1, post)
            return changed
        case DELETE :
            changed.splice(index, 1)
            return changed
		case NEW_POST :
			changed.push(post)
			return changed
		case EDIT_POST :
			changed.splice(index, 1, post)
			return changed
		default :
			return state
	}
}

function comments (state = [], action) {
	const { comment } = action
	let commentValue = comment && state.find(item => item.id === comment.id);
	let index = state.indexOf(commentValue);
	let changed = state.slice(0);
	switch (action.type) {
		case GET_COMMENTS :
			const { comments } = action
			return [...comments]
		case NEW_COMMENT :
			changed.push(comment)
			return changed
		case EDIT_COMMENT :
			changed.splice(index, 1, comment)
			return changed
		case VOTE_C :
			changed.splice(index, 1, comment)
			return changed
		case DELETE_C :
			changed.splice(index, 1)
			return changed
		default :
			return state
	}
}

function currentPost (state = false, action) {
	const { post } = action
	switch (action.type) {
		case DETAILS :
			return post
		case EDIT_POST :
			return post
		case RESET_D :
			return false
		default :
			return state
	}
}


export default combineReducers({
    categories,
    posts,
	comments,
	currentPost
})