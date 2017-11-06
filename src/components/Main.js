import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getCategories, getPostsByCategory } from '../actions/index'
import Navigation from './Navigation'
import PostSheet from './PostSheet'

function mapStateToProps ({ categories, posts, currentPost }) {
	const categoryList =
		categories.map((category) => {
			return category.name
		})
	categoryList.push('all')
	return {
		categories: categoryList,
		posts: posts,
		currentPost: currentPost
	}
}

function mapDispatchToProps (dispatch) {
	return {
		viewCategories: () => dispatch(getCategories()),
		pickCategory: (category) => dispatch(getPostsByCategory(category)),

	}
}


class Main extends Component {

	componentDidMount() {
		//Use path prop to load the categories
		const { viewCategories, pickCategory } = this.props
		const category  = this.props.match.params.category
		const categoryPath = category ? category : 'all'
		viewCategories()
		pickCategory(categoryPath)
	}

	componentWillReceiveProps(nextProps) {
		//Load and update categories when the category path changes
		if (nextProps.match.params.category !== this.props.match.params.category) {
			const { viewCategories, pickCategory } = this.props
			const category = nextProps.match.params.category
			const categoryPath = category ? category : 'all'
			viewCategories()
			pickCategory(categoryPath)

		}
	}

	backButton = () => this.props.history.goBack();


	render() {

		const { posts, currentPost, categories } = this.props
		const catPath = this.props.match.params.category
		const idPath = this.props.match.params.id

		return (
			<div>
				<Navigation
					id={idPath && idPath}
					category={catPath && catPath}
					backButton={this.backButton}
				/>
				{/* If the path has a category but it is not in the categoryList, list view is empty */}
				{catPath && !categories.includes(catPath) && <div></div>}
				{/* When the path has no category (is at the root) or has a category included in the categoryList,
				 renders the details view if the path has an id, and the list view if it does not */}
				{(!catPath || categories.includes(catPath)) && !idPath && posts.map((post) => (
					<div
						className='post-sheet'
						key={post.id}
					>
						<PostSheet
							post={post}
							className='post-sheet'
						/>
					</div>
				))}
				{catPath && categories.includes(catPath) && idPath &&
				<div
					className='post-sheet'
				>
					<PostSheet
						post={currentPost}
						id={idPath && idPath}
						className='post-sheet'
					/>
				</div>
				}
			</div>
		)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Main)


