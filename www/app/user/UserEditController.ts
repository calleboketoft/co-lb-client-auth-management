import angular from 'angular'

export default class UserEditController {
  public static $inject = [
    'user',
    '$state',
    'roleList',
    'roleMappingList',
    'userService',
    'userList'
  ]
  constructor (
    public user,
    private $state,
    public roleList,
    public roleMappingList,
    public userService,
    public userList
  ) {
    this.formatDataForSelectableItems()
  }
    public selectedRoles = null
    public selectableRoles = null
    public selectableItemsReload = 0
    public previouslySelectedRoles = null

    public formatDataForSelectableItems () {
      this.selectableRoles = this.userService.formatSelectable(this.roleList)
      this.selectedRoles = this.userService.formatSelected(this.user.id, this.roleMappingList)
      this.previouslySelectedRoles = angular.copy(this.selectedRoles)
      this.selectableItemsReload ++
    }

    public save () {
      this.userService.addAndRemoveRoles(this.roleMappingList, this.selectedRoles, this.previouslySelectedRoles, this.user.id)
      .then(() => {
        this.formatDataForSelectableItems()
      })
      this.user.$save()
    }

    public remove () {
      if (confirm('sure?')) {
        this.user.$remove().then(() => {
            this.$state.go('^', null, { reload: true })
        })
      }
    }
}