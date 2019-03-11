let bind = function(func, context) {
	return function() {
		return func.apply(context, arguments);
	}
};

let checkIfDataAnObject = function(data) {
	return Object.prototype.toString.call(data) === '[object Object]';
};

let checkIfDataAnArray = function() {
	return Object.prototype.toString.call(data) === '[object Array]';
};

let throttle = function(func, context, interval) {
	let methodId = null;
	return function() {
		let args = arguments;
		if(!methodId) {
			methodId = setTimeout(function() {
				methodId = null;
				func.call(context,...args);
			}, interval)
		}

	}
};

export { bind, checkIfDataAnObject, checkIfDataAnArray, throttle }