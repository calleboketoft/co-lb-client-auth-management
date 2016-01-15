import coAddModalTemplate from './coAddModalTemplate.html!text'

export default class CoAddModalService {
  public static $inject = ['$modal']
  constructor(
    private $modal
  ) {}

  public open (options) {
    let modal = this.$modal.open({
      template: coAddModalTemplate,
      controller: 'CoAddModalController as vm',
      resolve: {
        options: function() {
          return options
        }
      }
    })
    modal.result.then((newResource) => {
      if (options.resourceList) {
        options.resourceList.push(newResource)
      }
      if (options.modalComplete) {
        options.modalComplete(newResource)
      }
    })
  }
}
