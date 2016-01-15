export default angular.module('coApp.home', ['ui.router'])
  .config(configFunction)

configFunction.$inject = ['$stateProvider']
function configFunction ($stateProvider) {
  $stateProvider.state('root.home', {
    url: '/home',
    views: {
      main: {
        template: `<div class="jumbotron">
          <div class="container">
            <h1>A</h1>
          </div>
        </div>`
      }
    }
  })
}