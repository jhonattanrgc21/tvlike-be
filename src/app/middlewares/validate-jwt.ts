import { Payload } from "app/interfaces/auth.interface";
import { NextFunction, Request, Response } from "express";

const jwt = require("jsonwebtoken");

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
	let token = <string>req.header("Authorization");
	token = token.split(" ")[1];
	if (!token) {
		return res.json({
			ok: false,
			error: "Error, no se encontro el token",
		});
	}

	try {
		const payload: Payload = jwt.verify(token, process.env.SECRET_JWT_SEED);
		req.body = payload;
	} catch (error) {
		return res.json({
			ok: false,
			error: "Error, token no válido",
		});
	}

	// TODO OK!
	next();
};
