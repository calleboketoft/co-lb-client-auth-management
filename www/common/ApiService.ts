import angular from 'angular'

export default class ApiService {
  public static $inject = [
    '$http',
    'LoopBackAuth',
    'ExtUser',
    'ACL',
    'Role',
    'RoleMapping',
    '$q',
    '$timeout',
    '$window',
    'coAuthenticateConfig'
  ]

  constructor (
    private $http,
    private LoopBackAuth,
    public User,
    public ACL,
    public Role,
    public RoleMapping,
    private $q,
    private $timeout,
    private $window,
    private coAuthenticateConfig
  ) {
    this.initializeAuthorizations()
  }

  getMyFilter(additionalFilter) {
    var myFilter = { filter: { where: { userId: this.LoopBackAuth.currentUserId } } };
    if (additionalFilter) {
      angular.extend(myFilter.filter.where, additionalFilter.filter.where);
    }
    return myFilter;
  }

  // special endpoint, should be in user api
  requestResetPassword = function(email) {
    return this.$http.post('/request-password-reset', { email: email });
  }

  public login (email, password) {
    return this.User.login({email, password}).$promise
  }

  public logout () {
    this.clearAuthToken()
    return this.$q((resolve) => resolve())
  }

  clearAuthToken () {
    this.$window.localStorage.removeItem(this.coAuthenticateConfig.authTokenName)
  }

  public authorizations

  public initializeAuthorizations () {
    this.authorizations = {
      roles: ['$everyone', '$unauthenticated']
    }
  }

  public initialRequest () {
    return this.$q((resolve, reject) => {
      this.User.myAuthorizations().$promise.then((myAuthorizations) => {
        this.authorizations = myAuthorizations.authorizations
        resolve()
      }, () => {
        this.LoopBackAuth.clearUser()
        reject()
      })
    })
  }

  // { role: 'admin'}
  // { model: 'Session', accessType: 'READ', property: 'findById' }
  public authorize (restriction) {
    if (restriction.role) {
      return this.authorizations.roles.indexOf(restriction.role) !== -1;
    } else if (restriction.model) {
      // If any authorization for the model is present, return true
      return this.authorizations.acls && this.authorizations.acls.filter(function(acl) {
        return acl.model === restriction.model;
      }).length > 0;
    }
  }
}