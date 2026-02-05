export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        status: "error",
        error: "No autenticado"
      });
    }

    if (
      allowedRoles.length &&
      !allowedRoles.includes(req.user.role)
    ) {
      return res.status(403).json({
        status: "error",
        error: "Acceso denegado"
      });
    }

    next();
  };
};
