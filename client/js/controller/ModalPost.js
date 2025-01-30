myApp.controller('PostModalController', ['$scope', '$http', '$uibModalInstance', '$document',function ($scope, $http, $uibModalInstance) {
		const user_id = localStorage.getItem('userId');
        const token = localStorage.getItem('authToken');

	  $scope.newPost = {
		title: '',
		text: '',
		summary: '',
		postImg: '',
	  };
      
	  $scope.imageUrlInput = false;
  
	  $scope.cancel = function () {
		$scope.newPost = {};
		$uibModalInstance.dismiss('cancel');
	  };
  
	  $scope.toggleInput = function () {
		$scope.imageUrlInput = !$scope.imageUrlInput;
	  };
  
	  $scope.register = function () {
		if (!user_id) return;
		const { title, text, summary, postImg } = $scope.newPost;

            $http
            .post(
            `http://localhost:3000/api/post/create/${user_id}`, 
            {
                title,
                summary,
                text,
                postImg,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
    })
            .then(function (response) {
                console.log('Postagem criada com sucesso:', response.data);
                alert('Postagem criada com sucesso!');
                $uibModalInstance.close();
            })
            .catch(function (error) {
                console.error('Erro ao criar postagem:', error.data);
                alert('Erro ao criar postagem. Tente novamente.');
            });
        };
	},
]);
  