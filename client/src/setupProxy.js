const proxy = require("http-proxy-middleware");

module.exports = function(app) {
	app.use(proxy("/todos", { target: "http://localhost:5000" }));
	app.use(proxy("/counter", { target: "http://localhost:5000" }));
	app.use(proxy("/users", { target: "http://localhost:5000" }));
};
