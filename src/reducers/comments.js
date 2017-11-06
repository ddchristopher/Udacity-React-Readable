import {
	GET_COMMENTS,
	NEW_COMMENT,
	EDIT_COMMENT,
	VOTE_C,
	DELETE_C,
} from '../actions/types'

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

export default comments