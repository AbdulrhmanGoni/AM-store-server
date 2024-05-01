import { hashSync } from "bcrypt";

const defaultPasswordHashed = hashSync("default-password", +process.env.HASHING_SALT_ROUNDS);

const defaultAdmin = {
    adminName: "Default Admin",
    adminEmail: "am-store-default-admin-email@am-store.com",
    adminPassword: defaultPasswordHashed
}

export default defaultAdmin;