import {
	GET_POSTS,
	SORT_POSTS,
	VOTE,
	DELETE,
	NEW_POST,
	EDIT_POST,

} from '../actions/types'

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

export default posts