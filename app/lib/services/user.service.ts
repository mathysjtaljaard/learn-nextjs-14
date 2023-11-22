import { AUser } from "../models/user.model";
import { UserRepository } from "../repositories/user.repository";

class UserService  {
    private repository;
    constructor(repository: UserRepository) {
        this.repository = repository;
    }

    async deleteAll() {
        await this.repository.deleteAll()
    }

    async createOrUpdate(user: AUser) {
        //some validation??
        if (user?.id) {
            return await this.repository.update(user)
        }
        return await this.repository.create(user)
    }

}
const userService = new UserService(new UserRepository());
export { userService };
