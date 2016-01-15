export default class RoleEditController {
  public static $inject = [
    'role',
    'coUtilService',
    '$state'
  ]
  constructor (
    public role,
    private coUtilService,
    private $state
  ) {}

  public save() {
    this.role.$save()
  }

  public remove () {
    if (confirm('sure?')) {
      this.role.$remove().then(() => {
        this.$state.go('^', null, { reload: true });
      })
    }
  }
}
