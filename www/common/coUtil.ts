class CoUtilService {
  public static $inject = ['$q']
  constructor(private $q) {}

  findResource (list, resId) {
    return this.$q((resolve, reject) => {
      // since Array.prototype.find is not available,
      // use 'some' instead since it stops when finding
      var foundResource = null
      list.some((listItem) => {
        if (listItem.id.toString() === resId.toString()) {
          foundResource = listItem
          return true
        }
      })
      if (foundResource) {
        resolve(foundResource)
      } else {
        reject({
          header: 'Error: Not Found',
          body: 'Item not found'
        })
      }
    })
  }
}

export default angular.module('coUtil', [])
  .service('coUtilService', CoUtilService)