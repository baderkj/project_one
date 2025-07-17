const { db } = require('../config/db');

function hasPermission(permissionName) {
  return async (req, res, next) => {
    console.log('object');
    try {
      const user = req.user;
      if (!user || !user.role_id)
        return res.status(403).json({ error: 'No role assigned' });

      const result = await db('role_permissions')
        .join('permissions', 'role_permissions.permission_id', 'permissions.id')
        .where('role_permissions.role_id', user.role_id)
        .select('permissions.name');

      const userPermissions = result.map((p) => p.name);

      if (userPermissions.includes(permissionName)) return next();
      return res.status(403).json({ error: 'Permission denied' });
    } catch (err) {
      console.error('Permission check failed:', err.message);
      res.status(500).json({ error: 'Server error' });
    }
  };
}

module.exports = hasPermission;
