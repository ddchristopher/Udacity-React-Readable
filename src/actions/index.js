
import Readable from '../utils/api'
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
} from '../actions/types'


export function getCategories() {
	return function (dispatch) {
		return Readable.categories().then(
			categories => dispatch({
				type: GET_CATEGORIES,
				categories
			})
		)
	}
}

function setPosts (posts) {
    return {
        type: GET_POSTS,
        posts
    }
}

export function getPostsByCategory(category) {
	return function (dispatch) {
		if (category === 'all') {
			return Readable.allPosts().then(
				posts => dispatch(setPosts(posts))
			)
		} else {
			return Readable.postsByCategory(category).then(
				posts => {
					return dispatch(setPosts(posts))
				}
			)
		}
	}
}

export function sortPosts (sort, order) {
    return {
        type: SORT_POSTS,
        sort,
        order
    }
}

export function details (id) {
	return function (dispatch) {
		return Readable.details(id).then(
			post => dispatch({
				type: DETAILS,
				post
			})
		)
	}
}

export function resetDetails () {
	return {
		type: RESET_D,
	}
}

export function voteUp (id) {
    return function (dispatch) {
        return Readable.voteUp(id).then(
            post => dispatch({
	            type: VOTE,
	            post
            })
        )
    }
}

export function voteDown (id) {
	return function (dispatch) {
		return Readable.voteDown(id).then(
			post => dispatch({
				type: VOTE,
				post
			})
		)
	}
}

export function deletePost (id) {
	return function (dispatch) {
		return Readable.deletePost(id).then(
			post => dispatch({
				type: DELETE,
				post
			})
		)
	}
}

export function newPost (id, timestamp, title, body, author, category) {
    return function (dispatch) {
        return Readable.newPost(id, timestamp, title, body, author, category).then(
            post => dispatch({
	            type: NEW_POST,
	            post
            })
        )
    }
}

export function editPost (id, title, body) {
	return function (dispatch) {
		return Readable.editPost(id, title, body).then(
			post => dispatch({
				type: EDIT_POST,
				post
			})
		)
	}
}

export function getComments(id) {
	return function (dispatch) {
		return Readable.comments(id).then(
			comments => dispatch({
				type: GET_COMMENTS,
				comments
			})
		)
	}
}

export function newComment (id, timestamp, body, author, parentId) {
	return function (dispatch) {
		return Readable.newComment(id, timestamp, body, author, parentId).then(
			comment => dispatch({
				type: NEW_COMMENT,
				comment
			})
		)
	}
}

export function editComment (id, timestamp, body) {
	return function (dispatch) {
		return Readable.editComment(id, timestamp, body).then(
			comment => dispatch({
				type: EDIT_COMMENT,
				comment
			})
		)
	}
}

export function voteUpComment (id) {
	return function (dispatch) {
		return Readable.voteUpComment(id).then(
			comment => dispatch({
				type: VOTE_C,
				comment
			})
		)
	}
}

export function voteDownComment (id) {
	return function (dispatch) {
		return Readable.voteDownComment(id).then(
			comment => dispatch({
				type: VOTE_C,
				comment
			})
		)
	}
}

export function deleteComment (id) {
	return function (dispatch) {
		return Readable.deleteComment(id).then(
			comment => dispatch({
				type: DELETE_C,
				comment
			})
		)
	}
}