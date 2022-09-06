// Modules
import { Column, Entity, Index } from 'typeorm';
import bcrypt from "bcryptjs";

// Entities
import UuidEntity from "./uuid.entity";

// User Entity
@Entity("users")
export default class User extends UuidEntity {
	@Index("user_username_unique", { unique: true })
	@Column({
		type: "varchar",
		length: 20,
	})
	public username!: string;

	@Index("user_email_unique", { unique: true })
	@Column({
		type: "varchar",
		length: 191,
	})
	public email!: string;

	@Column({
		type: "varchar",
		length: 191,
	})
	public password!: string;

	@Column({
		type: "varchar",
		length: 191,
		comment: "Nombres.",
	})
	public first_name!: string;

	@Column({
		type: "varchar",
		length: 191,
		comment: "Apellidos.",
	})
	public last_name!: string;

	@Column({
		type: "bool",
		comment: "Estatus del usuario.",
		default: true,
		nullable: true,
	})
	public active?: boolean;

	@Column({
		type: "text",
		comment: "Token de recuperacion.",
		nullable: true,
	})
	public resetToken?: string;

	// Encrypt Password
	public encryptPassword() {
		const salt = bcrypt.genSaltSync(10);
		this.password = bcrypt.hashSync(this.password, salt);
	}

	// ======================================
	//			Match Password
	// ======================================
	public matchPassword(receivedPassword: string) {
		return bcrypt.compareSync(receivedPassword, this.password);
	}
}
