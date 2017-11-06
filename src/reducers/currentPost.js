import {
	EDIT_POST,
	DETAILS,
	RESET_D,
} from '../actions/types'

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

export default currentPost
