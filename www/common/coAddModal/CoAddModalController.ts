export default class CoAddModalController {
  public static $inject = ['$modalInstance', 'options']
  constructor (
    private $modalInstance,
    public options,
    public isSaving
  ) { }

    cancelNew = this.$modalInstance.dismiss

    public saveNew () {
      this.isSaving = true

      let createPromise
      if (this.options.resourceType === 'dependent') {
        createPromise = this.options.Resource.create({
          id: this.options.newData.id
        }, this.options.newData.data).$promise
      } else if (this.options.resourceType === 'independent') {
        createPromise = this.options.Resource.create(this.options.newData.data).$promise
      }

      createPromise.then((res) => {
        this.$modalInstance.close(res)
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        this.isSaving = false
      })
    }
}
