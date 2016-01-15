export default class RoleService {
  public static $inject = [
    'apiService',
    'coAddModalService',
    '$state'
  ]
  constructor (
    public apiService,
    public coAddModalService,
    public $state
  ) { }
  addRole (roleList) {
    this.coAddModalService.open({
      header: 'Add role',
      modelProperties: [
        {
          label: 'Name',
          propertyName: 'name',
          placeholder: 'name',
          inputType: 'text'
        }
      ],

      Resource: this.apiService.Role,
      resourceType: 'independent',
      resourceList: roleList,
      modalComplete: (newResource) => {
        this.$state.go('root.role.edit', { id: newResource.id })
      },
      newData: {
        data: {}
      }
    })
  }
}
