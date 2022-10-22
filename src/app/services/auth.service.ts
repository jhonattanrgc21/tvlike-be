import User from "../entities/users.entity";
import { AppDataSource } from "../../config/database";
import { UserInterface } from "../interfaces/users.interface";

export const createUser = async (newUser: UserInterface) => {
	let entity = new User();
	const userRepository = AppDataSource.getRepository(User);
	entity.username = newUser.username;
	entity.email = newUser.email;
	entity.password = newUser.password;
	entity.firstName = newUser.first_name;
	entity.lastName = newUser.last_name;
	entity.encryptPassword();
	await userRepository.save(entity);
};

export const login = async (user: User) => {

}
