export default class RoleListController {
  public static $inject = ['roleList', 'roleService', '$state']
  constructor (
    public roleList,
    public roleService,
    public $state
  ) { }

  addNew () {
    this.roleService.addRole(this.roleList)
  }

  edit (id) {
    this.$state.go('root.role.edit', { roleId: id })
  }
}
