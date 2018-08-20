const router = require("express").Router();
const UserController = require("../controllers/userControllers");
const ItemController = require("../controllers/itemControllers");
const UserMiddleware = require("../middlewares/userAuth");

router.get("/", function(req, res) {
	res.send("connected");
});
router.post("/request_token", UserController.login);
router.post("/register", UserController.create);
router.get("/items", ItemController.getAll);
router.post(
	"/items",
	UserMiddleware.checkToken,
	UserMiddleware.checkifTokenValid,
	ItemController.create
);

module.exports = router;
