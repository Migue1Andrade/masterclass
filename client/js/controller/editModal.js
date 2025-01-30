myApp.controller('EditPostModalController', ['$scope', '$http', '$uibModalInstance', function($scope, $http, $uibModalInstance) {
    const postId = localStorage.getItem('postId');
    const token = localStorage.getItem('authToken')
    
    $scope.editPost = {
        title: '',
        text: '',
        summary: '',
        image: '',
    };

    $scope.editImage = false; 
    $scope.imageUrlInput = false; 

    $scope.toggleInput = function() {
        $scope.imageUrlInput = !$scope.imageUrlInput;
    };

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
        localStorage.removeItem('postId');

    };

    $http.get(`http://localhost:3000/api/send/post/${postId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(function(response) {
        const post = response.data;
    
        $scope.editPost.title = post.title;
        $scope.editPost.text = post.text;
        $scope.editPost.summary = post.summary;
        $scope.editPost.image = post.post_img;
    })
    .catch(function(error) {
        console.error('Erro ao carregar os dados do post:', error);
    });

    $scope.sendUpdate = function() {
        const updatedPost = {
            title: $scope.editPost.title,
            text: $scope.editPost.text,
            summary: $scope.editPost.summary,
            image: $scope.editPost.image
        };

        $http.put(`http://localhost:3000/api/update/post/${postId}`, updatedPost, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(function(response) {
            alert('Post atualizado com sucesso!');
            $uibModalInstance.close(response.data);
        })
        .catch(function(error) {
            console.error('Erro ao atualizar o post:', error);
        });
    }
}]);
