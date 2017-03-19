SystemJS.config({
  paths: {
    "npm:": "jspm_packages/npm/",
    "github:": "jspm_packages/github/",
    "new_train/": ""
  },
  browserConfig: {
    "baseURL": "/"
  },
  devConfig: {
    "map": {
      "plugin-babel": "npm:systemjs-plugin-babel@0.0.21"
    }
  },
  transpiler: "plugin-babel",
  packages: {
    "new_train": {
      "main": "index.js",
      "meta": {
        "*.js": {
          "loader": "plugin-babel"
        }
      }
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  map: {
    "angular": "github:angular/bower-angular@1.6.3",
    "angular/angular-messages": "github:angular/bower-angular-messages@1.6.3",
    "angular/angular-route": "github:angular/bower-angular-route@1.6.3",
    "angular/angular-sanitize": "github:angular/bower-angular-sanitize@1.6.3",
    "angular/material": "github:angular/bower-material@1.1.3",
    "css": "github:systemjs/plugin-css@0.1.33",
    "ng-template": "npm:plugin-ng-template@0.1.1"
  },
  packages: {
    "github:angular/bower-angular-messages@1.6.3": {
      "map": {
        "angular": "github:angular/bower-angular@1.6.3"
      }
    },
    "github:angular/bower-angular-sanitize@1.6.3": {
      "map": {
        "angular": "github:angular/bower-angular@1.6.3"
      }
    },
    "github:angular/bower-material@1.1.3": {
      "map": {
        "css": "github:systemjs/plugin-css@0.1.33",
        "angular-aria": "github:angular/bower-angular-aria@1.6.3",
        "angular-animate": "github:angular/bower-angular-animate@1.6.3",
        "angular": "github:angular/bower-angular@1.6.3"
      }
    },
    "github:angular/bower-angular-aria@1.6.3": {
      "map": {
        "angular": "github:angular/bower-angular@1.6.3"
      }
    },
    "github:angular/bower-angular-animate@1.6.3": {
      "map": {
        "angular": "github:angular/bower-angular@1.6.3"
      }
    },
    "github:angular/bower-angular-route@1.6.3": {
      "map": {
        "angular": "github:angular/bower-angular@1.6.3"
      }
    }
  }
});
