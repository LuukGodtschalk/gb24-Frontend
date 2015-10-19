require.config({
	baseUrl: 'js/',
	paths: {
		app: 'app',
		angular: 'lib/angular'
	},
	shim: {
		angular: {
		    exports: "angular"
		}
	}
});

require(['app/index', 'app/components']);
