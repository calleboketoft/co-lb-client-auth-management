import RoleEditController from './RoleEditController'
import roleEditTemplate from './roleEditTemplate.html!text'
import RoleListController from './RoleListController'
import roleListTemplate from './roleListTemplate.html!text'
import RoleService from './RoleService'

export default angular.module('coApp.role', ['ui.router'])

  .controller('RoleEditController', RoleEditController)
  .controller('RoleListController', RoleListController)
  .service('roleService', RoleService)

  .config(configFunction)

configFunction.$inject = ['$stateProvider']
function configFunction ($stateProvider) {
  $stateProvider.state('root.role', {
    url: '/role',
    resolve: {
      roleList: ['apiService', function(apiService) {
        return apiService.Role.find().$promise
      }]
    },
    views: {
      main: {
        template: roleListTemplate,
        controller: 'RoleListController as vm'
      }
    }
  })

  $stateProvider.state('root.role.edit', {
    url: '/:roleId',
    template: roleEditTemplate,
    controller: 'RoleEditController as vm',
    resolve: {
      role: ['coUtilService', '$stateParams', 'roleList', function(coUtilService, $stateParams, roleList) {
        return coUtilService.findResource(roleList, $stateParams.roleId)
      }],
    }
  })
}
