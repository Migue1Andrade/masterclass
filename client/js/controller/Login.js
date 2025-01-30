myApp.controller('LoginController', function($scope, $http, $location) {
	$scope.registerPage = function () { $location.path('login/register') }

	$scope.user = {
		email: '',
		password: ''
	};
	$scope.errorMessage = '';

	$scope.login = function() {
		const email = $scope.user.email;
		const password = $scope.user.password;

		$http.post('http://localhost:3000/api/login', { email, password })
			.then(function(response) {
				
				if (response.data.token) {
					localStorage.setItem('authToken', response.data.token);
					localStorage.setItem('userId', response.data.id);
					
					$scope.successMessage = 'Login realizado com sucesso!';
					$scope.errorMessage  = '';

					$location.path('/home')
				}
			})
			.catch(function(error) {
				
				$scope.errorMessage = 'Erro ao realizar Login, ' + (error.data.message || 'Tente novamente.');
				$scope.successMessage = '';
			});
	};
	});
