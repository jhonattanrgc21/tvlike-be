import { validateInputs } from "../middlewares/validate-inputs";
import { Router } from "express";
import { check } from "express-validator";

// Routes
import {
	registerController,
	loginController,
	refreshTokenController,
} from "../controllers/auth.controller";
import { validateToken } from "../middlewares/validate-jwt";

const routes = Router();

routes.post(
	"/register",
	[
		check('username', 'El username es requerido').not().isEmpty(),
		check('email', 'El email es requerido').isEmail(),
		check('password', 'El password es requerido').isLength({ min: 8 }),
		check('first_name', 'El username es requerido').not().isEmpty(),
		check('last_name', 'El username es requerido').not().isEmpty(),
		validateInputs,
	],
	registerController
);

routes.post(
	'/login',
	[
		check('username', 'El username es requerido').not().isEmpty(),
		check('password', 'El password es requerido').isLength({ min: 8 }),
		validateInputs,
	],
	loginController
);

routes.get("/refresh-token", validateToken, refreshTokenController);

export default routes;
