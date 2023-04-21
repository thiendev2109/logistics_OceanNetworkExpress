import jwt from "jsonwebtoken";

const middleware = {
  verifyToken: (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1]; // Result like : Bearer youtoken => youtoken (remove bearer)

    if (!token) {
      return res.status(401).json({ status: "ERR", msg: "Unauthorized" });
    }

    jwt.verify(token, process.env.JWT_SERECTKEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ status: "ERR", msg: "Unauthorized" });
      }

      req.account = decoded;

      next();
    });
  },

  verifyTokenAndAdmin: (req, res, next) => {
    // chỉ có thằng admin system mới pass được vòng này
    // prettier-ignore
    middleware.verifyToken(req, res, () => {
      if ( req.account.adminSystem || (!req.account.adminSystem && req.account.warehouse === req.body.id_warehouse) || req.customer.id === req.params.id) {
        next();
      } else {
        return res
          .status(401)
          .json({ status: "ERR", msg: "You're not allowed to this act" });
      }
    });
  },

  verifyTokenAndAdminBranch: (req, res, next) => {
    // cái này role cho thằng admin chi nhánh
    // prettier-ignore
    if (!req.account.adminSystem && req.account.id_warehouse == req.body.id_warehouse ) {
      next();
    } else {
      return res
        .status(401)
        .json({ status: "ERR", msg: "You're not allowed to this act" });
    }
  },

  verifyTokenAndUser: (req, res, next) => {
    // role for user permission
  },
};

export default middleware;
