import MyProfileController from './MyProfileController'
import myProfileTemplate from './myProfileTemplate.html!text'

export default angular.module('coApp.myProfile', ['ui.router'])
  .controller('MyProfileController', MyProfileController)
  .config(configFunction)

configFunction.$inject = ['$stateProvider']
function configFunction ($stateProvider){
  $stateProvider.state('root.myProfile', {
    url: '/myProfile',
    views: {
      main: {
        controller: 'MyProfileController as vm',
        template: myProfileTemplate,
        resolve: {
          myProfile: ['apiService', function(apiService) {
            return apiService.User.getMyProfile();
          }]
        }
      }
    }
  })
}