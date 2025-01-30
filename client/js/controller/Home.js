// eslint-disable-next-line no-undef
myApp.controller('HomeController', function($scope, $http, $location, $window, $uibModal) {
	$scope.isEditVisible = {};
    $scope.dropdownPosition = {};

	$scope.options = ["profile", "oi", "sign out"];
	
	const token = localStorage.getItem('authToken');
	const userId = localStorage.getItem('userId');

	angular.element(document.querySelector('.modal-backdrop')).remove();
	angular.element(document.querySelector('.modal')).remove();

	$scope.openModal = function(event) {
        event.stopPropagation();

		var modalInstance = $uibModal.open({
			size: 'lg',
			backdrop: 'static',
			keyboard: false,
			templateUrl: '../../views/postModal.html',
			controller: 'PostModalController'
		});
		modalInstance.result
		.then(function (result) {
			$window.location.reload();
			console.log('Modal fechado com sucesso:', result);
		})
		.catch(function (reason) {
			console.log('Modal rejeitado:', reason);
		});
	};

	$scope.like = function(postId, event) {
        event.stopPropagation();

		if (!userId) return;

		$http.post(`http://localhost:3000/api/user/like/${userId}/${postId}`, {}, {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		})
		.then(response => {
			alert('Post liked successfully');
			$scope.reload();
		})
		.catch(error => {
			console.error('Error liking post:', error);
		});
	}

	$scope.editModal = function(event) {
        event.stopPropagation();

		var modalInstance = $uibModal.open({
            size: 'lg',
            backdrop: 'static',
            keyboard: false,
            templateUrl: '../../views/editPostModal.html',
            controller: 'EditPostModalController',
        });
		modalInstance.result
		.then(function (result) {
			$window.location.reload();
			console.log('Modal fechado com sucesso:', result);
		})
		.catch(function (reason) {
			console.log('Modal rejeitado:', reason);
		});
	}

    $scope.toggleEdit = function(postId, event) {
        event.stopPropagation();
    
        localStorage.setItem('postId', postId);
    
        $scope.isEditVisible[postId] = !$scope.isEditVisible[postId];
    
        const yOffset = -160;
        const xOffset = -420;
    
        if (event) {
            const rect = event.target.getBoundingClientRect();
    
            $scope.dropdownPosition[postId] = {
                top: rect.bottom + window.scrollY + yOffset + 'px',
                left: rect.left + window.scrollX + xOffset + 'px'
            };
        }
    };

	$scope.selectPtionEdit = function(option, postId) {
		$scope.isEditVisible[postId] = false;

		if (option === "edit") $scope.editModal(postId);
	}

	$scope.selectOption = function(option, event) {
        event.stopPropagation();
		$scope.isSelectVisible = false;

		if (option === "sign out") {
			$scope.logout(); 
		}
		else if (option === "profile") {
			$location.path('/home/profile');
		}
	};

	$scope.logout = function() {
		localStorage.removeItem('authToken');
		localStorage.removeItem('userId');

		
		$window.location.href = '/#/login';
	};

	$scope.toggleSelect = function(event) {
        event.stopPropagation();

		$scope.isSelectVisible = !$scope.isSelectVisible;
	};

	$scope.removePost = function(postId, event) {
        event.stopPropagation();

		if (!userId) return;
	
		$http.delete(`http://localhost:3000/api/remove/post/${userId}/${postId}`, {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		})
		.then(response => {
			alert('Post deleted successfully', response.data);
			$scope.reload();
		})
		.catch(error => {
			console.error('Error deleting post:', error);
		});
	};
		console.log("🚀 ~ myApp.controller ~ userId:", userId)

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

	$scope.reload = function() {
		$http.get(`http://localhost:3000/api/post`)
		.then(function(res) {
			$scope.posts = res.data.map(post => ({
				profileImage: post.user.profile_img,
				title: post.title,
				name: post.user.name,
				summary: post.summary,
				post_at: formatDate(post.post_at),
				post_likes: post.likes, 
				comments: post.comments,
				postImg: post.post_img,
				id: post.id,
			}));
		});
	}
	$scope.reload();

    $scope.goPage = function(postId) {
        localStorage.setItem('pagePostId', postId)
        $location.path('/home/page');
    }
});
