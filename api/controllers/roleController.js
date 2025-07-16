const roleService = require('../services/roleService');
const { db } = require('../../config/db');

module.exports = {
  async createRole(req, res) {
    try {
      const { name, permissions } = req.body;

      const exists = await roleService.gerRoleByName(name);

      if (!exists[0]) {
        const role = await roleService.createRole({ name });
        if (permissions.length > 0) {
          var permissionIds = await db('permissions')
            .whereIn('id', permissions)
            .select('*');
          if (permissionIds.length > 0) {
            const pIds = permissionIds.map((id) => id.id);

            const result = await roleService.assignPermissionsToRole(
              role.id,
              pIds
            );
          }
        }
        return res.status(201).json({ role, permission_ids: permissionIds });
      }

      return res.json({ error: 'role already exists' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async getAllRoles(req, res) {
    try {
      const roles = await roleService.getAllRoles();
      res.status(200).json(roles);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async updatePermissions(req, res) {
    try {
      const { roleId, permissions } = req.body;
      const exists = await roleService.gerRoleById({ id: roleId });

      if (exists[0]) {
        if (permissions.length > 0) {
          var permissionIds = await db('permissions')
            .whereIn('id', permissions)
            .select('*');

          if (permissionIds.length > 0) {
            const pIds = permissionIds.map((id) => id.id);

            const result = await roleService.updatePermissionsToRole(
              exists[0].id,
              pIds
            );
          }
        }
        return res
          .status(201)
          .json({ role: exists[0], permission_ids: permissionIds });
      }

      return res.json({ error: "role doesn't exists" });
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.message });
    }
  },

  async getAllRoles(req, res) {
    try {
      const roles = await roleService.getAllRoles();
      res.status(200).json(roles);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getRolePermissions(req, res) {
    try {
      const { roleId } = req.params;
      const permissions = await roleService.getPermissionsOfRole(roleId);
      res.status(200).json(permissions);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
