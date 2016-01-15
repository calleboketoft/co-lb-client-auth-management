// Vendor modules
import angular from 'angular'
import 'angular-resource'
import 'angular-animate'
import 'angular-ui-router'

// My open source modules
import 'calleboketoft/coAuthenticate'
import 'calleboketoft/coDebug'
import 'calleboketoft/coSelectableItems'
import '../common/coAddModal/coAddModal_module' // dependency to fixed ui-bootstrap
import '../common/coUtil'
import 'calleboketoft/co-notification' // awkward toastr dependency
import httpInterceptors from '../common/coHttpInterceptors'

// App pages
import './login/login_module'
import './myProfile/myProfile_module'
import './acl/acl_module'
import './user/user_module'
import './role/role_module'
import './home/home_module'
import './register/register_module'

// common modules
import '../common/lb-services'

// App components
import ApiService from '../common/ApiService'
import appTemplate from './appTemplate.html!text'
import AppController from './AppController'

/**************
 * APP MODULE *
 **************/
export default angular.module('coApp', [
  'ngResource',
  'ngAnimate',
  'ui.router',
  'lbServices',
  'coAuthenticate',
  'coUtil',
  'coSelectableItems',
  'coAddModal',
  'coDebug',
  'coNotification',
  'coApp.login',
  'coApp.myProfile',
  'coApp.acl',
  'coApp.user',
  'coApp.role',
  'coApp.home',
  'coApp.register'
])
.config(appConfigFunction)
.config(httpInterceptors) // Add http interceptors
.run(appRunFunction)
.service('apiService', ApiService)
.controller('AppController', AppController)

appConfigFunction.$inject = ['$stateProvider', 'coAuthenticateConfig']
function appConfigFunction ($stateProvider, coAuthenticateConfig) {
  coAuthenticateConfig.authTokenName = '$LoopBack$accessTokenId'
  coAuthenticateConfig.goToStateAfterLogin = 'root.home'
  coAuthenticateConfig.apiHost = window.appConfig ? window.appConfig.apiUrl : '';

  $stateProvider.state('root', {
    url: '',
    template: appTemplate,
    controller: 'AppController as vm'
  })
  $stateProvider.state('root.loading', {
    views: {
      main: {
        template: '<h1>loading</h1>'
      }
    },
    url: '/loading'
  })
}

/*****************
 * ROUTING DEBUG *
 *****************/
appRunFunction.$inject = ['$rootScope', '$window']
function appRunFunction ($rootScope, $window) {
  $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
    $window.console.debug('stateChangeStart:   ' + toState.name)
  })
  $rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
    $window.console.error('stateChangeError:   ' + toState.name, error)
  })
  $rootScope.$on('$stateChangeSuccess', (event, toState) => {
    $window.console.debug('stateChangeSuccess: ' + toState.name)
  })
}
