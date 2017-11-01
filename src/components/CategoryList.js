import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getCategories, sortPosts } from '../actions/index'
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import { withStyles } from 'material-ui/styles';
import {withRouter} from 'react-router-dom'

const styles = theme => ({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: 'auto',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 90,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

function mapStateToProps ({ categories, posts }) {
	return {
		categories: categories,
		posts: posts,
	}
}

function mapDispatchToProps (dispatch) {
	return {
		viewCategories: () => dispatch(getCategories()),
		arrangePosts: (sort, order) => dispatch(sortPosts(sort, order))

	}
}

class CategoryList extends Component {

    state = {
        anchorEl: null,
        open: false,
        selectedIndex: null,
        category: '',
        order: '',
        sort: '',
    }

	componentDidMount() {
		//Use path prop to load the categories
		this.setState({ category: this.props.match.params.category ? this.props.match.params.category : 'all'})
	}

	componentWillReceiveProps() {
		this.setState({ category: this.props.match.params.category ? this.props.match.params.category : 'all'})
	}

	handleChange = (name, event) => {
        this.setState({ [name]: event.target.value });
    };

	handleChangeCategory = (event) => {
		this.setState({
            category: event.target.value,
			order: '',
			sort: '',
        });
	};

    linkToCategory = (url) => {
	    this.props.history.push(url)
    };

    jumpToCategory = (url) => {
	    this.props.history.replace(`/${url}`)
    }

    render() {
        const { categories, arrangePosts, classes, posts } = this.props
        return (
            <form className={classes.container}>

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="category">Category</InputLabel>
                    <Select
                        value={this.state.category}
                        onChange={(event) => {
	                        this.handleChangeCategory(event)
                        	posts.length < 1 ? (
                        		this.jumpToCategory(event.target.value)
	                        ):(
		                        this.linkToCategory(event.target.value)
	                        )
                        }}
                        input={<Input id="category" />}
                    >
                        <MenuItem value="all">
                            All
                        </MenuItem>
	                    {categories.map((category) => (
                            <MenuItem
                                key={category.name}
                                value={category.name}>
                                {category.name}
                            </MenuItem>
	                    ))}

                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="sort">Sort</InputLabel>
                    <Select
                        value={this.state.sort}
                        onChange={(event) => {
                            this.handleChange('sort', event);
                            arrangePosts(event.target.value, this.state.order)}}
                        input={<Input id="sort" />}
                    >
                        <MenuItem value='author'>
                            Author
                        </MenuItem>
                        <MenuItem value='timestamp'>
                            Date
                        </MenuItem>
                        <MenuItem value='voteScore'>
                            Votes
                        </MenuItem>

                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="order">Order</InputLabel>
                    <Select
                        value={this.state.order}
                        onChange={(event) => {
                            this.handleChange('order', event);
                            arrangePosts(this.state.sort, event.target.value)}}
                        input={<Input id="order" />}
                    >
                        <MenuItem value='ascending'>
                            Asc
                        </MenuItem>
                        <MenuItem value='descending'>
                            Desc
                        </MenuItem>

                    </Select>
                </FormControl>
            </form>
        )
    }
}

const CList = connect(
    mapStateToProps,
        mapDispatchToProps
)(CategoryList)

const CatList = withRouter(CList)

export default withStyles(
    styles)(CatList)

