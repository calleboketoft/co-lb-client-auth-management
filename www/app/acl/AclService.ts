export default class AclService {
  public static $inject = [
    'apiService',
    'coAddModalService',
    '$state'
  ]
  constructor (
    private apiService,
    private coAddModalService,
    private $state
  ) { }

  public addAcl(aclList) {
    this.coAddModalService.open({
      header: 'Add ACL',
      modelProperties: [
        {
          label: 'Model',
          propertyName: 'model',
          placeholder: 'Model name',
          inputType: 'text'
        }
      ],

      Resource: this.apiService.ACL,
      resourceList: aclList,
      resourceType: 'independent',
      newData: {
        data: {
          principalType: 'ROLE',
          permission: 'ALLOW',
          accessType: '*',
          property: '*'
        }
      }
    })
  }

  public removeAcl(acl, aclList) {
    var removePromise = acl.$remove()
    removePromise.then(function() {
      aclList.forEach(function(aclInList, index) {
        if (aclInList.id === acl.id) {
          aclList.splice(index, 1)
          return
        }
      })
    })
    return removePromise
  }

  public aclItemFilter (filterObj, item) {
    return (!filterObj.model          || !item.model          || item.model.toLowerCase().includes(filterObj.model.toLowerCase()))
        && (!filterObj.property       || !item.property       || item.property.toLowerCase().includes(filterObj.property.toLowerCase()))
        && (!filterObj.accessType     || !item.accessType     || item.accessType.toLowerCase().includes(filterObj.accessType.toLowerCase()))
        && (!filterObj.permission     || !item.permission     || item.permission.toLowerCase().includes(filterObj.permission.toLowerCase()))
        && (!filterObj.principalType  || !item.principalType  || item.principalType.toLowerCase().includes(filterObj.principalType.toLowerCase()))
        && (!filterObj.principalId    || !item.principalId    || item.principalId.toLowerCase().includes(filterObj.principalId.toLowerCase()))
  }
}
