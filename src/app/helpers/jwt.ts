import { Payload } from "../interfaces/auth.interface";
import jwt  from 'jsonwebtoken'


export const createToken = (id: number, username: string, email: string) => {
	const payload: Payload = {
		id,
		username,
		email,
	};

	return new Promise((resolve, reject) => {
		jwt.sign(
			payload,
			process.env.SECRET_JWT_SEED,
			{
				expiresIn: "24h",
			},
			(err: any, token: string) => {
				if (err) {
					// TODO MAL
					reject(err);
				} else {
					// TODO BIEN
					resolve('Bearer ' + token);
				}
			}
		);
	});
};
