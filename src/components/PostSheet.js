import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
	voteUp,
	voteDown,
	deletePost,
	editPost,
	getComments,
	editComment,
	voteDownComment,
	voteUpComment,
	deleteComment,
	details,
} from '../actions/index'
import moment from 'moment'
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import { ThumbUp, ThumbDown, Comment, Edit, Delete } from 'material-ui-icons';
import IconButton from 'material-ui/IconButton';
import { Link } from 'react-router-dom'
import TextField from 'material-ui/TextField';
import Dialog, {
	DialogActions,
	DialogContent,
	DialogTitle,
} from 'material-ui/Dialog';

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
    }),
    vote: theme.typography.button,
	comment: theme.mixins.gutters({
		paddingTop: 16,
		paddingBottom: 16,
		marginTop: theme.spacing.unit * 1,
	}),
});

function mapStateToProps ({ categories, posts, comments }) {
	return {
		categories: categories,
		posts: posts,
		comments: comments
	}
}

function mapDispatchToProps (dispatch) {
	return {
		up: (id) => dispatch(voteUp(id)),
		down: (id) => dispatch(voteDown(id)),
		remove: (id) => dispatch(deletePost(id)),
		editP: (id, title, body) => {
			title = title.length > 0 ? title : "untitled"
			body = body.length > 0 ? body : "-"
			dispatch(editPost(id, title, body))
		},
		viewComments: (id) => dispatch(getComments(id)),
		editC: (id, timestamp, body) => {
			body = body.length > 0 ? body : "-"
			dispatch(editComment(id, timestamp, body))
		},
		upC: (id) => dispatch(voteUpComment(id)),
		downC: (id) => dispatch(voteDownComment(id)),
		removeC: (id) => dispatch(deleteComment(id)),
		getDetails: (id) => dispatch(details(id)),

	}
}

class PostSheet extends Component {

	state = {
		loading: true,
		openEditPost: false,
		openEditComment: false,
		title: '',
		body: '',
		commentId: '',
		commentBody: '',
	}

	componentDidMount() {
		this.props.id && this.props.viewComments(this.props.id)
		this.props.id && this.props.getDetails(this.props.id)
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.id) {
			if (nextProps.post === this.props.post) {
				this.props.getDetails(this.props.id)
			}
		}
	}

	handleClickEditPost = () => {
		this.setState({
			openEditPost: true,
			title: this.props.post.title,
			body: this.props.post.body,
		})
	};

	handleClickEditComment = (comment) => {
		this.setState({
			commentId: comment.id,
			commentBody: comment.body,
			openEditComment: true
		})
	};


	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
		});
	};


	handleCancelPost = () => {
		this.setState({
			openEditPost: false,
			openEditComment: false,
			title: this.props.post.title,
			body: this.props.post.body,
		})
	};

	handleCancelComment = () => {
		this.setState({
			openEditPost: false,
			openEditComment: false,
		})
	};

	checkIds = (array, id) => {
		return array.some((element) => element.id === id)
		}

    render() {

        const {
        	posts,
        	post,
	        id,
	        classes,
	        up,
	        down,
	        remove,
	        editP,
	        editC,
	        comments,
	        viewComments,
	        upC,
	        downC,
	        removeC,
        } = this.props

        return (
            <div>
	            {id && !this.checkIds(posts, id) &&
	            <Typography type={'title'} className='not-found'>
		            NO POST FOUND
	            </Typography>
	            }
	            {post.title &&
		            <div>
                <Paper className={classes.root} elevation={5}>
                    <Typography type={'title'}>
	                    {!this.props.id ? (
	                    	<Link to={{ pathname: `/${post.category}/${post.id}`}} onClick={() => {
			                    viewComments(post.id)
		                    }}>
		                    {post.title}
	                    </Link>
		                    ) : (
		                    <span>
			                     {post.title}
		                    </span>
		                    )}
                    </Typography>
                    <Typography type={'subheading'}>
                        <em>by {post.author} at {moment(post.timestamp).format('LLL')}</em>
                    </Typography>
                    <Typography type={'caption'} paragraph>
                        Category: {post.category}
                    </Typography>
	                {this.props.id &&
		                <Typography type={'subheading'} paragraph>
			                {post.body}
		                </Typography>
	                }
                    <Grid container justify="space-between">
                        <Grid>
                            <Button color="primary" dense disableRipple>
                                <Comment/>
                                &ensp;{post.commentCount}
                            </Button>
                        </Grid>
                        <Grid>
                            <Grid container spacing={0}>
                                <Grid>
                                    <IconButton color="primary" onClick={() => {
	                                    up(post.id)
                                    }}>
                                        <ThumbUp/>
                                    </IconButton>
                                </Grid>
                                <Grid>
                                    <IconButton disabled>
                                        <Typography color="primary" className={classes.vote}>
                                            {post.voteScore}
                                        </Typography>
                                    </IconButton>
                                </Grid>
                                <Grid>
                                    <IconButton color="primary" onClick={() => {
	                                    down(post.id)
                                    }}>
                                        <ThumbDown/>
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid>
                            <Grid container spacing={0}>
                                <Grid>
                                    <IconButton color="primary" onClick={this.handleClickEditPost}>
                                        <Edit/>
                                    </IconButton>
                                </Grid>
                                <Grid>
                                    <IconButton color="primary" onClick={() => remove(post.id)}>
	                                    {this.props.id ? (
		                                    <Link to='/'>
			                                    <Delete/>
		                                    </Link>
	                                    ) : (
		                                    <Delete/>
	                                    )}
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>
                </Paper>


				<div className="comment-sheet">
	            {this.props.id && comments && comments.map((comment, index) => (
		            <div
			            className='comments'
			            key={comment.id}
		            >
			            <Paper className={classes.comment} elevation={1}>
				            <Typography type={'subheading'}>
					            {comment.body}
				            </Typography>
				            <Typography type={'caption'} paragraph>
					            <em>by {comment.author} at {moment(comment.timestamp).format('LLL')}</em>
				            </Typography>
				            <Grid container justify="space-between">
					            <Grid>
						            <Grid container spacing={0}>
							            <Grid>
								            <IconButton color="primary" onClick={() => upC(comment.id)}>
									            <ThumbUp/>
								            </IconButton>
							            </Grid>
							            <Grid>
								            <IconButton disabled>
									            <Typography color="primary" className={classes.vote}>
										            {comment.voteScore}
									            </Typography>
								            </IconButton>
							            </Grid>
							            <Grid>
								            <IconButton color="primary" onClick={() => downC(comment.id)}>
									            <ThumbDown/>
								            </IconButton>
							            </Grid>
						            </Grid>
					            </Grid>

					            <Grid>
						            <Grid container spacing={0}>
							            <Grid>
								            <IconButton color="primary" onClick={() => this.handleClickEditComment(comment)}>
									            <Edit/>
								            </IconButton>
							            </Grid>
							            <Grid>
								            <IconButton color="primary" onClick={() => {
									            removeC(comment.id)
								            }}>
									            <Delete/>
								            </IconButton>
							            </Grid>
						            </Grid>
					            </Grid>

				            </Grid>
			            </Paper>
		            </div>
	            ))}
				</div>


	            <Dialog open={this.state.openEditComment} onRequestClose={this.handleCancelComment}>
		            <DialogTitle>
			            EDIT COMMENT
		            </DialogTitle>
		            <DialogContent>
			            <form noValidate autoComplete="off">
				            <TextField
					            required
					            multiline
					            rowsMax="4"
					            margin="normal"
					            id="body"
					            label="Body"
					            value={this.state.commentBody}
					            onChange={this.handleChange('commentBody')}
					            fullWidth
				            />
			            </form>
		            </DialogContent>
		            <DialogActions>
			            <Button onClick={this.handleCancelComment} color="primary">
				            Cancel
			            </Button>
			            <Button onClick={() => {
				            editC(this.state.commentId, Date.now(), this.state.commentBody)
				            this.handleCancelComment()
			            }} color="primary">
				            Post
			            </Button>
		            </DialogActions>
	            </Dialog>

                <Dialog open={this.state.openEditPost} onRequestClose={this.handleCancelPost}>
                    <DialogTitle>
	                    EDIT POST
                    </DialogTitle>
                    <DialogContent>
                        <form noValidate autoComplete="off">
                            <TextField
                                autoFocus
                                required
                                margin="normal"
                                id="title"
                                label="Title"
                                value={this.state.title}
                                onChange={this.handleChange('title')}
                                fullWidth
                            />
                            <TextField
                                required
                                multiline
                                rowsMax="4"
                                margin="normal"
                                id="body"
                                label="Body"
                                value={this.state.body}
                                onChange={this.handleChange('body')}
                                fullWidth
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCancelPost} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => {
	                        editP(post.id, this.state.title, this.state.body)
	                        this.handleCancelPost()
                        }} color="primary">
                            Post
                        </Button>
                    </DialogActions>
                </Dialog>
		            </div>
	            }
            </div>

        )
    }
}

const PSheet = connect(
	mapStateToProps,
	mapDispatchToProps
)(PostSheet)

export default withStyles(
    styles)(PSheet)