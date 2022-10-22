import { createToken } from "../helpers/jwt";
import { Request, Response } from "express";
import { AppDataSource } from "../../config/database";
import User from "../entities/users.entity";
import { LoginInterface, Payload } from "../interfaces/auth.interface";
import { UserInterface } from "../interfaces/users.interface";
import { createUser } from "../services/auth.service";

const userRepository = AppDataSource.getRepository(User);

export const registerController = (req: Request, res: Response) => {
	const newUser: UserInterface = req.body;
	try {
		createUser(newUser);

		return res.json({
			ok: true,
			messgae: "Usuario registrado con exito!",
		});
	} catch (error) {
		return res.json({
			message: "Error, No se pudo registrar al usuario",
		});
	}
};

export const loginController = async (req: Request, res: Response) => {
	const input: LoginInterface = req.body;
	let user: User;
	try {
		user = await userRepository.findOneByOrFail({
			username: input.username,
		});
	} catch (error) {
		res.json({
			ok: false,
			error: "Error, el username es incorrecto",
		});
	}

	if (!user.matchPassword(input.password)) {
		return res.json({
			ok: false,
			error: "Contraseña incorrecta.",
		});
	}

	const token = await createToken(user.id, user.username, user.email);

	return res.json({
		ok: true,
		uid: user.id,
		username: user.username,
		token,
	});
};

export const refreshTokenController = async (req: Request, res: Response) => {
	const payload: Payload = req.body;

	// Generar el JWT
	let token = await createToken(payload.id, payload.username, payload.email);
	return res.json({
		ok: true,
		id: payload.id,
		username: payload.username,
		token,
	});
};
