// bind function and context
let bind = function(func, context) {
	return function() {
		func.apply(context, arguments);
	}
};

export { bind }