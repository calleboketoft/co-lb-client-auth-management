System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: "typescript",
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  packages: {
    "app": {
      "defaultExtension": "ts"
    },
    "common": {
      "defaultExtension": "ts"
    }
  },

  map: {
    "Foxandxss/angular-toastr": "github:Foxandxss/angular-toastr@1.4.1",
    "angular": "github:angular/bower-angular@1.4.3",
    "angular-animate": "github:angular/bower-angular-animate@1.4.3",
    "angular-bootstrap": "github:angular-ui/bootstrap-bower@0.13.2",
    "angular-resource": "github:angular/bower-angular-resource@1.4.3",
    "angular-ui-router": "github:angular-ui/ui-router@0.2.15",
    "angular-ui/bootstrap": "github:angular-ui/bootstrap@0.13.2",
    "bootstrap": "github:twbs/bootstrap@3.3.5",
    "calleboketoft/co-notification": "github:calleboketoft/co-notification@0.0.4",
    "calleboketoft/coAuthenticate": "github:calleboketoft/coAuthenticate@0.1.5",
    "calleboketoft/coDebug": "github:calleboketoft/coDebug@0.1.4",
    "calleboketoft/coSelectableItems": "github:calleboketoft/coSelectableItems@0.1.5",
    "css": "github:systemjs/plugin-css@0.1.13",
    "lodash.difference": "npm:lodash.difference@3.2.2",
    "text": "github:systemjs/plugin-text@0.0.2",
    "typescript": "npm:typescript@1.6.2",
    "github:angular-ui/ui-router@0.2.15": {
      "angular": "github:angular/bower-angular@1.4.3"
    },
    "github:angular/bower-angular-animate@1.4.3": {
      "angular": "github:angular/bower-angular@1.4.3"
    },
    "github:calleboketoft/coAuthenticate@0.1.5": {
      "angular": "github:angular/bower-angular@1.4.3",
      "angular-ui-router": "github:angular-ui/ui-router@0.2.15"
    },
    "github:twbs/bootstrap@3.3.5": {
      "jquery": "github:components/jquery@2.1.4"
    },
    "npm:lodash._basedifference@3.0.3": {
      "lodash._baseindexof": "npm:lodash._baseindexof@3.1.0",
      "lodash._cacheindexof": "npm:lodash._cacheindexof@3.0.2",
      "lodash._createcache": "npm:lodash._createcache@3.1.2"
    },
    "npm:lodash._baseflatten@3.1.4": {
      "lodash.isarguments": "npm:lodash.isarguments@3.0.4",
      "lodash.isarray": "npm:lodash.isarray@3.0.4"
    },
    "npm:lodash._createcache@3.1.2": {
      "lodash._getnative": "npm:lodash._getnative@3.9.1"
    },
    "npm:lodash.difference@3.2.2": {
      "lodash._basedifference": "npm:lodash._basedifference@3.0.3",
      "lodash._baseflatten": "npm:lodash._baseflatten@3.1.4",
      "lodash.restparam": "npm:lodash.restparam@3.6.1"
    }
  }
});
