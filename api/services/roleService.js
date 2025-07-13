const Role = require('../models/Role');
const Permission = require('../models/Permission');
const RolePermission = require('../models/RolePermission');

module.exports = {
  async createRole(name) {
    const [role] = await Role.create(name);
    return role;
  },

  async getAllRoles() {
    return await Role.findAll();
  },

  async assignPermissionsToRole(roleId, permissionIds) {
    return await RolePermission.assign(roleId, permissionIds);
  },

  async updatePermissionsToRole(roleId, permissionIds) {
    if (!Array.isArray(permissionIds) || permissionIds.length === 0) {
      throw new Error('Permission IDs must be a non-empty array');
    }

    return await RolePermission.update(roleId, permissionIds);
  },

  async getPermissionsOfRole(roleId) {
    return await RolePermission.getPermissionsByRoleId(roleId);
  },

  async gerRoleByName(name) {
    return await Role.getRoleByName(name);
  },

  async gerRoleById({ id }) {
    return await Role.getRoleById({ id });
  },
};
