import AdminModel from '../../models/Admins.js';

export default async function loggedAdmin(adminId) {
    try {
        return await AdminModel.findById(adminId, { avatar: 1, adminName: 1, adminEmail: 1 });
    } catch (error) {
        console.log(error)
        return;
    }
}
