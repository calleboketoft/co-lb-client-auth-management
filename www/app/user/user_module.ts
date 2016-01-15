import angular from 'angular'

import UserEditController from './UserEditController'
import userEditTemplate from './userEditTemplate.html!text'
import UserListController from './UserListController'
import userListTemplate from './userListTemplate.html!text'
import UserService from './UserService'

export default angular.module('coApp.user', ['ui.router'])

.controller('UserEditController', UserEditController)
.controller('UserListController', UserListController)
.service('userService', UserService)
.config(configFunction)

configFunction.$inject = ['$stateProvider']
function configFunction ($stateProvider) {
  $stateProvider.state('root.user', {
    url: '/user',
    resolve: {
      userList: ['apiService', function(apiService) {
        return apiService.User.find().$promise
      }],
    },
    views: {
      main: {
        template: userListTemplate,
        controller: 'UserListController as vm'
      }
    }
  })

  $stateProvider.state('root.user.edit', {
    url: '/:userId',
    template: userEditTemplate,
    controller: 'UserEditController as vm',
    resolve: {
      user: ['coUtilService', '$stateParams', 'userList', function(coUtilService, $stateParams, userList) {
        return coUtilService.findResource(userList, $stateParams.userId)
      }],
      roleList: ['apiService', function(apiService) {
        return apiService.Role.find().$promise
      }],
      roleMappingList: ['apiService', function(apiService) {
        return apiService.RoleMapping.find().$promise
      }]
    }
  })
}