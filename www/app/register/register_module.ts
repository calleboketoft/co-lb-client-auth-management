import RegisterController from './RegisterController'
import registerTemplate from './registerTemplate.html!text'

export default angular.module('coApp.register', ['ui.router'])
  .controller('RegisterController', RegisterController)
  .config(configFunction)

configFunction.$inject = ['$stateProvider']
function configFunction ($stateProvider) {
  $stateProvider.state('root.register', {
    url: '/register',
    views: {
      main: {
        controller: 'RegisterController as vm',
        template: registerTemplate
      }
    }
  })
}