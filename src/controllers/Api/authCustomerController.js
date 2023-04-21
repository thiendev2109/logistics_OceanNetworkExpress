import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../../models/index";

let refreshToken = [];

const authCustomerController = {
  generateToken: async (customer) => {
    const payload = {
      id: customer.id_customer,
      firstname: customer.firstname,
      lastname: customer.lastname,
      email: customer.email,
      phone: customer.phone,
    };
    const options = {
      expiresIn: "1h",
    };
    return jwt.sign(payload, process.env.JWT_SERECTKEY, options);
  },

  createCustomer: async (req, res) => {
    const {
      firstname,
      lastname,
      email,
      phone,
      city,
      country,
      address,
      password,
      company,
      birthday,
      sex,
    } = req.body;

    await db.Customer.create({
      firstname,
      lastname,
      email,
      phone,
      city,
      country,
      address,
      password,
      company,
      birthday,
      sex,
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

  loginCustomer: async (req, res) => {
    const { email, password } = req.body;
    try {
      const account = await db.Customer.findOne({ where: { email } })
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

          const token = await authCustomerController.generateToken(result);
          delete result.dataValues["password"]; // xóa element password trong json result để trả về kết quả k có password, =>  đảm bảo sự bảo mật
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
};

module.exports = authCustomerController;
