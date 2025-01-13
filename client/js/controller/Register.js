myApp.controller('RegisterController', function($scope, $http, $location) {
	$scope.user = {
		name: '',
		email: '',
		password: '',
		confirmPassword: ''
	};
	$scope.errorMessage = '';

	$scope.goBack = function() {
		$location.path('login')
	};

	$scope.register = function() {
		const name = $scope.user.name;
		const email = $scope.user.email;
		const password = $scope.user.password;
		const confirmPassword = $scope.user.confirmPassword;

		if (password === confirmPassword) {
			$http.post('http://localhost:3000/user/create', { name, password, email })
				.then(function() {
				
					$scope.successMessage = 'Cadastro realizado com sucesso!';
					$scope.errorMessage = '';
					$location.path('login');
				})
				.catch(function(error) {
				
					$scope.errorMessage = 'Erro ao realizar cadastro: ' + (error.data.message || 'Tente novamente.');
					$scope.successMessage = '';
				});
		} else {
			$scope.errorMessage = 'As senhas não coincidem.';
			$scope.successMessage = '';
		}
	};
});