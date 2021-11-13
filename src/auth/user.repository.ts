import { ConflictException, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from 'bcrypt'
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        const { username, password } = authCredentialsDto;
        
        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);

        try {
            await user.save();
        } catch (error) {
            if (error.code === "23505") {
                throw new ConflictException("username already exists!");
            }
            throw new InternalServerErrorException();
        }

        return user;
    }

    async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string | null> {
        const { username, password } = authCredentialsDto;
        const user = await this.findOne({ username });

        return (user && await user.validatePassword(password)) ? user.username : null;
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return await bcrypt.hash(password, salt);
    }
}