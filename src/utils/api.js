const Readable = {
	ORIGIN:  'http://localhost:3001',
	AUTH: 'default_user',
	headers: {
		"Accept": "application/json",
		"Content-Type": "application/json",
		"Authorization": this.AUTH
	},


	categories: function (){
		return fetch(`${this.ORIGIN}/categories`,
			{
				method: 'GET',
				headers: this.headers
			})
			.then((res) => res.json())
			.then((data) => data.categories)
	},

	allPosts: function (){
		return fetch(`${this.ORIGIN}/posts`,
			{
				method: 'GET',
				headers: this.headers
			})
			.then((res) => res.json())
	},

	postsByCategory: function (category){
		return fetch(`${this.ORIGIN}/${category}/posts`,
			{
				method: 'GET',
				headers: this.headers
			})
			.then((res) => res.json())
	},

	newPost: function (id, timestamp, title, body, author, category){
		return fetch(`${this.ORIGIN}/posts`,
			{
				method: "POST",
				headers: this.headers,
				body: JSON.stringify({
					id: id,
					timestamp: timestamp,
					title: title,
					body: body,
					author: author,
					category: category
				})
			})
			.then((res) => res.json())
	},

	editPost: function (id, title, body){
		return fetch(`${this.ORIGIN}/posts/${id}`,
			{
				method: "PUT",
				headers: this.headers,
				body: JSON.stringify({
					title: title,
					body: body,
				})
			})
			.then((res) => res.json())
	},

	details: function (id){
		return fetch(`${this.ORIGIN}/posts/${id}`,
			{
				method: "GET",
				headers: this.headers,
			})
			.then((res) => res.json())
	},

	voteUp: function (id){
		return fetch(`${this.ORIGIN}/posts/${id}`,
			{
				method: "POST",
				headers: this.headers,
				body: JSON.stringify({ option: "upVote" })
			})
			.then((res) => res.json())
	},

	voteDown: function (id){
		return fetch(`${this.ORIGIN}/posts/${id}`,
			{
				method: "POST",
				headers: this.headers,
				body: JSON.stringify({ option: "downVote" })
			})
			.then((res) => res.json())
	},

	deletePost: function (id){
		return fetch(`${this.ORIGIN}/posts/${id}`,
			{
				method: "DELETE",
				headers: this.headers,
			})
			.then((res) => res.json())
	},

	comments: function (id){
		return fetch(`${this.ORIGIN}/posts/${id}/comments`,
			{
				method: "GET",
				headers: this.headers
			})
			.then((res) => res.json())
	},

	newComment: function (id, timestamp, body, author, parentId){
		return fetch(`${this.ORIGIN}/comments`,
			{
				method: "POST",
				headers: this.headers,
				body: JSON.stringify({
					id: id,
					timestamp: timestamp,
					body: body,
					author: author,
					parentId: parentId
				})
			})
			.then((res) => res.json())
	},

	editComment: function (id, timestamp, body){
		return fetch(`${this.ORIGIN}/comments/${id}`,
			{
				method: "PUT",
				headers: this.headers,
				body: JSON.stringify({
					timestamp: timestamp,
					body: body
				})
			})
			.then((res) => res.json())
	},

	voteUpComment: function (id){
		return fetch(`${this.ORIGIN}/comments/${id}`,
			{
				method: "POST",
				headers: this.headers,
				body: JSON.stringify({ option: "upVote" })
			})
			.then((res) => res.json())
	},

	voteDownComment: function (id){
		return fetch(`${this.ORIGIN}/comments/${id}`,
			{
				method: "POST",
				headers: this.headers,
				body: JSON.stringify({ option: "downVote" })
			})
			.then((res) => res.json())
	},

	deleteComment: function (id){
		return fetch(`${this.ORIGIN}/comments/${id}`,
			{
				method: "DELETE",
				headers: this.headers,
			})
			.then((res) => res.json())
	},

}

export default Readable


