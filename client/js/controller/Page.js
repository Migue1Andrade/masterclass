myApp.controller('PageController', function($scope, $http, $location) {
    const postId = localStorage.getItem('pagePostId');
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');

    $scope.goBack = function() {
        $location.path('home');
    };

    $scope.options = ['Edit Profile', 'Settings', 'sign out'];
    $scope.isSelectVisible = false;

    const formatDate = (date) => {
        const parsedDate = new Date(date);
        const dia = parsedDate.getDate().toString().padStart(2, '0');
        const ano = parsedDate.getFullYear();
        const meses = [
            "jan", "fev", "mar", "abr", "mai", "jun",
            "jul", "ago", "set", "out", "nov", "dez"
        ];

        return `${dia} ${meses[parsedDate.getMonth()]}, ${ano}`;
    };

    $scope.toggleSelect = function () {
        $scope.isSelectVisible = !$scope.isSelectVisible;
    };

    $scope.like = function() {
		if (!userId) return;

		$http.get(`http://localhost:3000/api/get/likes/${postId}/${userId}`, {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		})
		.then(response => {
            console.log(response.data)
			$scope.reload();
		})
		.catch(error => {
			console.error('Error liking post:', error);
		});
	}

    $scope.selectOption = function (option) {
        if (option === 'sign out') {
            alert('Signed Out!');
        }
    };

    $scope.openModal = function () {
        alert('Write Modal Opened');
    };

    $scope.post = {
        profileImage: '',
        title: '',
        name: '',
        post_at: '',
        text: '',
        date: ''
    };

    $scope.reload = function() {
        $http.get(`http://localhost:3000/api/send/post/include/user/${postId}`, { 
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(function(res) {
            const post = Array.isArray(res.data) ? res.data[0] : res.data;
    
            $scope.post = {
                profileImage: post.user.profile_img,
                title: post.title,
                name: post.user.name,
                post_at: formatDate(post.post_at),
                text: post.text,
                date: formatDate(post.post_at),
            };
            $scope.isLiked = post.isLiked;
        })
        .catch(function(error) {
            console.error('Erro ao buscar dados do post:', error);
        });
    }
    $scope.reload();
});
