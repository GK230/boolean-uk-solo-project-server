import dbClient from "../../utils/database";
import { hash } from "bcrypt";
import { compare } from "bcrypt";

export type NewUser = {
	email: string;
    username: string;
	password: string;
	avatar: string;
};

const createWithHash = async (newUser: NewUser) => {
	const plainTextPassword = newUser.password;

	const hashedPassword = await hash(plainTextPassword, 10);

	const savedUser = await dbClient.user.create({
		data: { ...newUser, password: hashedPassword },
	});

	return savedUser;
};

const userClient = {
	...dbClient.user,
	createWithHash,
};

export default userClient;
