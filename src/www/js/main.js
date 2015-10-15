require.config({
	baseUrl: 'js/',
	paths: {
		gb24: 'app/index',
		angular: 'lib/angular'
	},
	shim: {
		angular: {
		    exports: "angular"
		}
	}
});

require(['gb24']);