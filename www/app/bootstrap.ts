import angular from 'angular'
import app from './app_module'

angular.element(document).ready(() => {
  let appContainer = document.querySelector('body')
  let uiViewEl = document.createElement('div')
  uiViewEl.setAttribute('ui-view', '')
  appContainer.appendChild(uiViewEl)
  angular.bootstrap(appContainer, [app.name], {
    strictDi: true
  })
})