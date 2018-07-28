exports.index = function(req, res, next){
	res.jsonp({
		code: 200,
		data: "hello"
	});
};
