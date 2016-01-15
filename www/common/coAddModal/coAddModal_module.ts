import angular from 'angular'
import 'angular-bootstrap'

import CoAddModalController from './CoAddModalController'
import CoAddModalService from './CoAddModalService'

export default angular.module('coAddModal', [ 'ui.bootstrap' ])
  .controller('CoAddModalController', CoAddModalController)
  .service('coAddModalService', CoAddModalService)
