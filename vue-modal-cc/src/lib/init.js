let initDefaultTemplate = function() {
	let templates = require.context('./templates', false);
	let defaultTemplates = {};
	templates.keys().map(file => {
		defaultTemplates[templates(file).default.name] = templates(file).default;
	});
	return defaultTemplates;
};

export {
	initDefaultTemplate
}