import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../../models/index";

let refreshTokens = [];

const authAdminController = {
  generateToken: async (admin) => {
    const payload = {
      id: admin.id_admin,
      name: admin.adminName,
      email: admin.email,
      phone: admin.phone,
      adminSystem: admin.adminSystem,
      warehouse: admin.id_warehouse ?? null,
    };
    const options = {
      expiresIn: "1h",
    };
    return jwt.sign(payload, process.env.JWT_SERECTKEY, options);
  },

  generateRefreshToken: async (admin) => {
    const payload = {
      id: admin.id_admin,
      name: admin.adminName,
      email: admin.email,
      phone: admin.phone,
      adminSystem: admin.adminSystem,
      warehouse: admin.id_warehouse ?? null,
    };
    const options = {
      expiresIn: "365d",
    };
    return jwt.sign(payload, process.env.JWT_REFRESH_SERECTKEY, options);
  },

  createAdmin: async (req, res) => {
    const { adminName, adminSystem, email, phone, password, id_warehouse } =
      req.body;

    if (
      (!adminSystem && id_warehouse == "") ||
      (!adminSystem && !id_warehouse)
    ) {
      return res.status(412).json({
        status: "ERR",
        msg: "You must add Id warehouse for admin branch account",
      });
    }
    await db.Admin.create({
      adminName,
      adminSystem,
      email,
      phone,
      password,
      id_warehouse,
    })
      .then((result) => {
        return res.status(200).json({
          status: "OK",
          data: result,
        });
      })
      .catch((err) => {
        return res.status(412).json({
          status: "ERR",
          msg: err,
        });
      });
  },

  loginAdmin: async (req, res) => {
    const { email, password } = req.body;
    try {
      const account = await db.Admin.findOne({ where: { email } })
        .then(async (result) => {
          if (!result) {
            return res
              .status(401)
              .json({ status: "ERR", msg: "Invalid email" });
          }

          const isValidPassword = await bcrypt.compare(
            password,
            result.password
          );

          if (!isValidPassword) {
            return res
              .status(401)
              .json({ status: "ERR", msg: "Invalid password" });
          }

          const token = await authAdminController.generateToken(result);
          const refreshToken = await authAdminController.generateRefreshToken(
            result
          );
          refreshTokens.push(refreshToken);
          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            path: "/",
            sameSite: "strict",
          });
         // xóa element password trong json result để trả về kết quả k có password, =>  đảm bảo sự bảo mật
          return res.status(200).json({
            status: "OK",
            data: result,
            token: token,
          });
        })
        .catch((err) => {
          return res.status(412).json({
            status: "ERR",
            msg: err.message,
          });
        });
    } catch (error) {
      return res.status(500).json({
        status: "ERR",
        msg: error.message,
      });
    }
  },

  requestRefreshToken: async (req, res) => {
    // yêu cầu user refresh token
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res
        .status(401)
        .json({ status: "ERR", msg: "You are not authenticated" });
    }

    if (!refreshTokens.includes(refreshToken)) {
      return res
        .status(403)
        .json({ status: "ERR", msg: "Refresh token is not valid" });
    }
    //prettier-ignore
    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SERECTKEY,
      async (err, admin) => {
        if (err) {
          console.log(err);
        }
        console.log('abc');
        console.log(admin);

        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
        const newAccessToken = await authAdminController.generateToken(admin);
        const newRefreshToken = await authAdminController.generateRefreshToken(admin);
        refreshTokens.push(newRefreshToken);
        res.cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        return res.status(200).json({ status: "OK", token: newAccessToken, refreshToken : newRefreshToken });
      }
    );
  },

  logoutAdmin: async (req, res) => {
    res.clearCookie("refreshToken");
    refreshTokens = refreshTokens.filter(
      (token) => token !== req.cookies.refreshToken
    );

    return res.status(200).json({ status: "OK", msg: "Logout success" });
  },
};

module.exports = authAdminController;
