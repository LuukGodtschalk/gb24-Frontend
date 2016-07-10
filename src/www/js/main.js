require.config({
  baseUrl: 'js/',
  paths: {
    gb24: 'app/index',
    components: 'app/components',
    angular: 'lib/angular',
    'angular-route': 'lib/angular-route'
  },
  shim: {
    angular: {
      exports: 'angular'
    },
    'angular-route': {
      deps: []
    }
  }
});

require(['gb24', 'components']);
