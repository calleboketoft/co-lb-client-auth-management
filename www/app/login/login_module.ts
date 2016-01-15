import LoginController from './LoginController'
import loginTemplate from './loginTemplate.html!text'

export default angular.module('coApp.login', ['ui.router'])

.controller('LoginController', LoginController)
.config(configFunction)

configFunction.$inject = ['$stateProvider']
function configFunction ($stateProvider) {
  $stateProvider.state('root.login', {
    url: '/login',
    views: {
      main: {
        template: loginTemplate,
        controller: 'LoginController as vm'
      }
    }
  })
}
