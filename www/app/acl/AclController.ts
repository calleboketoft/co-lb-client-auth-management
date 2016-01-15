export default class AclController {
  public static $inject = ['aclList', 'aclService', '$scope']
  constructor (
    public aclList,
    private aclService,
    private $scope,
    public aclListFiltered = []
  ) {
    // Keep the complexity away from the template. This is not elegant but it works
    $scope.$watch('vm.filter', (filterObj) => {
      $scope.vm.aclListFiltered = $scope.vm.aclList.filter((aclListItem) => {
        return aclService.aclItemFilter(filterObj, aclListItem)
      })
    }, true)
  }

  public addNew = () => {
    this.aclService.addAcl()
  }

  public filter = {
    model: '',
    property: '',
    accessType: '',
    permission: '',
    principalType: '',
    principalId: ''
  }

  public save (acl) {
    acl.$save()
  }

  public remove (acl) {
    if (confirm('sure?')) {
      this.aclService.removeAcl(acl, this.aclList)
    }
  }
}
