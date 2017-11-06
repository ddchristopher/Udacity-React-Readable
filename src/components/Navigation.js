import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getPostsByCategory, newPost, newComment, details, resetDetails } from '../actions/index'
import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import CategoryList from './CategoryList'
import { withStyles } from 'material-ui/styles';
import uuidv4 from 'uuid/v4'
import { Add, ArrowBack, Reply } from 'material-ui-icons';
import { MenuItem } from 'material-ui/Menu';
import TextField from 'material-ui/TextField';
import Dialog, {
	DialogActions,
	DialogContent,
	DialogTitle,
} from 'material-ui/Dialog';

const styles = theme => ({
    root: {
        width: '100%',
    },
    flex: {
        flex: 1,
    },
	formControl: {
		margin: theme.spacing.unit,
		minWidth: 90,
	},
	selectEmpty: {
		marginTop: theme.spacing.unit * 2,
	},
});

function mapStateToProps ({ categories, posts, currentPost }) {
	return {
		categories: categories,
		posts: posts,
		currentPost: currentPost
	}
}

function mapDispatchToProps (dispatch) {
	return {
		pickCategory: (category) => {
			dispatch(getPostsByCategory(category))
		},
		addPost: (id, timestamp, title, body, author, category, currentCategory) => {
			currentCategory = currentCategory ? currentCategory : 'all'
			title = title.length > 0 ? title : "untitled"
			body = body.length > 0 ? body : "-"
			author = author.length > 0 ? author : "anonymous"
			category = category.length > 0 ? category : "react"
			dispatch(newPost(id, timestamp, title, body, author, category)).then(() => {
					dispatch(getPostsByCategory(currentCategory))
			})
		},
		addComment: (id, timestamp, body, author, parentId) => {
			body = body.length > 0 ? body : "-"
			author = author.length > 0 ? author : "anonymous"
			dispatch(newComment(id, timestamp, body, author, parentId))
		},
		getDetails: (id) => dispatch(details(id)),
		clearDetails: () => dispatch(resetDetails()),
	}
}

class Navigation extends Component {
    state = {
        openNewPost: false,
	    openNewComment: false,
	    title: '',
        author: '',
        category: '',
        body: '',
    }

	handleClickOpenNewPost = () => {
		this.setState({ openNewPost: true });
	};

	handleClickOpenNewComment = () => {
		this.setState({ openNewComment: true });
	};

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
		});
	};

	handleCancel = () => {
		this.setState({
			openNewPost: false,
			openNewComment: false,
			title: '',
			author: '',
			category: '',
			body: '',
		})
	};

    render() {
        const { categories, classes, addPost, addComment, getDetails, currentPost, pickCategory, clearDetails } = this.props
        return (

           <div className={classes.root}>

               <AppBar position="static" color="primary" >
                   <Toolbar justify="space-between">
		                   <Typography type="title" color="inherit" className={classes.flex}>
			                   Readable
		                   </Typography>
	                   {/* Renders a REPLY TO POST button in details view, and the NEW POST button in list view */}
	                   {this.props.id ? (
		                   <Button color="inherit" onClick={this.handleClickOpenNewComment}>
			                   <Reply/> REPLY TO POST
		                   </Button>
	                   ) : (
		                   <Button color="inherit" onClick={this.handleClickOpenNewPost}>
			                   <Add/> NEW POST
		                   </Button>
	                   )
	                   }
                   </Toolbar>
               </AppBar>
	           {/* Renders a BACK button in details view, and the CategoryList component in list view */}
	           {this.props.id ? (
		           <div className='secondary-nav'>
			           <Button onClick={() => {
				           this.props.backButton()
				           clearDetails()
				           pickCategory(currentPost.category)
			           }} >
				           <ArrowBack/>
			           </Button>
		           </div>
	                ) : (
		           <div className='secondary-nav'>
			           <Toolbar >
			           <CategoryList />
			           </Toolbar>
		           </div>
		           )
	           }
               <Dialog open={this.state.openNewPost} onRequestClose={this.handleCancel}>
                   <DialogTitle>
	                   NEW POST
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
                               margin="normal"
                               id="author"
                               label="Author"
                               value={this.state.author}
                               onChange={this.handleChange('author')}
                               fullWidth
                           />

                           <TextField
                               required
                               margin="normal"
                               id="body"
                               label="Body"
                               value={this.state.body}
                               onChange={this.handleChange('body')}
                               fullWidth
                           />

                           <TextField
                               required
                               id="category"
                               select
                               label="Category"
                               value={this.state.category}
                               onChange={this.handleChange('category')}
                               margin="normal"
                               fullWidth
                           >
		                       {categories.map((category) => (
                                   <MenuItem
                                       key={category.name}
                                       value={category.name}>
				                       {category.name}
                                   </MenuItem>
		                       ))}
                           </TextField>

                       </form>
                   </DialogContent>
                   <DialogActions>
                       <Button onClick={this.handleCancel} color="primary">
                           Cancel
                       </Button>
                       <Button onClick={() => {
	                       addPost(uuidv4(), Date.now(), this.state.title, this.state.body, this.state.author, this.state.category, this.props.category)
	                       this.handleCancel()
                       }}
                               color="primary">
                           Post
                       </Button>
                   </DialogActions>
               </Dialog>

	           <Dialog open={this.state.openNewComment} onRequestClose={this.handleCancel}>
		           <DialogTitle>
			           NEW COMMENT
		           </DialogTitle>

		           <DialogContent>
			           <form noValidate autoComplete="off">
				           <TextField
					           required
					           margin="normal"
					           id="author"
					           label="Author"
					           value={this.state.author}
					           onChange={this.handleChange('author')}
					           fullWidth
				           />

				           <TextField
					           required
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
			           <Button onClick={this.handleCancel} color="primary">
				           Cancel
			           </Button>
			           <Button onClick={() => {
				           addComment(uuidv4(), Date.now(), this.state.body, this.state.author, this.props.id)
				           getDetails(this.props.id)
				           this.handleCancel()
			           }}
			                   color="primary">
				           Post
			           </Button>
		           </DialogActions>
	           </Dialog>
           </div>


        )
    }
}

const Navi = connect(
	mapStateToProps,
	mapDispatchToProps
)(Navigation)

export default withStyles(styles)(Navi)