require.config({
	baseUrl: 'js/',
	paths: {
		gb24: 'app/index',
		components: 'app/components',
		angular: 'lib/angular'
	},
	shim: {
		angular: {
		    exports: "angular"
		}
	}
});

require(['gb24', 'components']);
