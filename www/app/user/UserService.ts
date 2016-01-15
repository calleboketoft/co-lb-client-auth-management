import difference from 'lodash.difference'

export default class UserService {
  public static $inject = [
    'apiService',
    'coAddModalService',
    '$state',
    '$q'
  ]
  constructor (
    public apiService,
    public coAddModalService,
    public $state,
    public $q
  ) { }

  public addUser (userList) {
    this.coAddModalService.open({
      header: 'Add user',
      modelProperties: [
        {
          label: 'Username',
          propertyName: 'username',
          placeholder: 'username',
          inputType: 'text'
        },
        {
          label: 'Email',
          propertyName: 'email',
          placeholder: 'Email',
          inputType: 'email'
        },
        {
          label: 'Password',
          propertyName: 'password',
          inputType: 'password'
        }
      ],

      Resource: this.apiService.User,
      resourceType: 'independent',
      resourceList: userList,
      modalComplete: function(newResource) {
        this.$state.go('root.user.edit', { id: newResource.id });
      },
      newData: {
        data: {}
      }
    })
  }

  public formatSelectable(roleList) {
    return roleList.map((role) => {
      return {
        displayName: role.name,
        refValue: role.id
      }
    })
  }

  public formatSelected(userId, roleMappingList) {
    let formattedSelectable = [];
    roleMappingList.forEach((roleMapping) => {
      if (roleMapping.principalId == userId) {
        formattedSelectable.push(roleMapping.roleId)
      }
    })
    return formattedSelectable
  }

  private preparePendingUpdates(selectedRoles, previouslySelectedRoles) {
    return {
      rolesToAdd: difference(selectedRoles, previouslySelectedRoles),
      rolesToRemove: difference(previouslySelectedRoles, selectedRoles)
    }
  }

  public addRoles(rolesToAdd, roleMappingList, userId) {
    return this.$q((resolve) => {
      let createPromises = []
      rolesToAdd.forEach((roleId) => {
        let createPromise = this.apiService.RoleMapping.create({
          principalType: 'USER',
          principalId: userId,
          roleId: roleId
        }).$promise
        createPromise.then((res) => {
          roleMappingList.push(res)
        })
        createPromises.push(createPromise)
      })
      this.$q.all(createPromises).then(resolve)
    })

  }

  // Remove the roles via API and remove roles from roleMappingList
  private removeRoles(rolesToRemove, roleMappingList, userId) {
    return this.$q((resolve) => {
      rolesToRemove.forEach((roleId) => {
        let removePromises = []
        roleMappingList.forEach((roleMapping, index) => {
          if (roleMapping.principalType == 'USER' && roleMapping.principalId == userId && roleMapping.roleId == roleId) {
            let removePromise = roleMapping.$remove()
            removePromises.push(removePromise)
            roleMappingList.splice(index, 1)
          }
        })
        this.$q.all(removePromises).then(resolve);
      })
    })
  }

  private addAndRemoveRoles(roleMappingList, selectedRoles, previouslySelectedRoles, userId) {
    let pendingLists = this.preparePendingUpdates(selectedRoles, previouslySelectedRoles);
    return this.$q.all([
      this.addRoles(pendingLists.rolesToAdd, roleMappingList, userId),
      this.removeRoles(pendingLists.rolesToRemove, roleMappingList, userId)
    ])
  }
}
