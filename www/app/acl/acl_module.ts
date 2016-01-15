import aclTemplate from './aclTemplate.html!text'
import AclController from './AclController'
import AclService from './AclService'

angular.module('coApp.acl', ['ui.router'])
  .config(configFunction)
  .controller('AclController', AclController)
  .service('aclService', AclService)

configFunction.$inject = ['$stateProvider']
function configFunction ($stateProvider) {
  $stateProvider.state('root.acl', {
    url: '/acl',
    views: {
      main: {
        template: aclTemplate,
        controller: 'AclController as vm',
        resolve: {
          aclList: ['apiService', function(apiService) {
            return apiService.ACL.find().$promise
          }]
        }
      }
    }
  })
}
