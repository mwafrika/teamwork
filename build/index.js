"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _userRoute = _interopRequireDefault(require("./Server/routes/userRoute"));

var _articleRoutes = _interopRequireDefault(require("./Server/routes/articleRoutes"));

_dotenv.default.config();

const app = (0, _express.default)();
app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use(_bodyParser.default.json());
app.use(_userRoute.default);
app.use(_articleRoutes.default);
const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`listening to the port ${port} ...`);
});
var _default = app;
exports.default = _default;