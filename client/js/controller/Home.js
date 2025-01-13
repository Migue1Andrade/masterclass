// eslint-disable-next-line no-undef
myApp.controller('HomeController', function($scope, $http) {
    const tokenId = require('../directives/getTokenId.js')
    const token = localStorage.getItem('authToken');

	$scope.isSelectVisible = false;
	$scope.options = ["profile", "oi", "sign out"]; 

	$scope.toggleSelect = function() {
		
		$scope.isSelectVisible = !$scope.isSelectVisible;
	};

	$scope.selectOption = function() {
		$scope.isSelectVisible = false; 
	};

	const removePost = (postId) => {
		if (!tokenId) return;
	
		$http.delete(`http://localhost:3000/api/remove/post/${tokenId}/${postId}`, {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		})
		.then(response => {
			console.log('Post deleted successfully', response.data);
		})
		.catch(error => {
			console.error('Error deleting post:', error);
		});
	};

	const formatDate = (date) => {
		date = new Date(date);

		const dia = date.getDate().toString().padStart(2, '0');
		const ano = date.getFullYear();
		const meses = [
			"jan", "fev", "mar", "abr", "mai", "jun",
			"jul", "ago", "set", "out", "nov", "dez"
		];

		return `${dia} ${meses[date.getMonth()]},${ano}`;
	};

		$http.get(`http://localhost:3000/api/post`)
		.then(function(res) {
			$scope.posts = res.data.map(post => ({
				profileImage: post.profile_img,
				title: post.title,
				name: post.user_id,
				summary: post.summary,
				post_at: formatDate(post.post_at),
				post_likes: post.post_likes, 
				comments: post.comments, 
				postImg: post.post_img,
				id: post.user_id,
			}));
		});
});
