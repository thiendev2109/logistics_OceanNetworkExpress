import db from "../../models/index";

const adminController = {
  // Get all admin
  getAllAdmin: async (req, res) => {
    try {
      await db.Admin.findAll()
        .then((result) => {
          if (!result) {
            return res
              .status(404)
              .json({ status: "ERR", msg: "Admin not found" });
          }

          return res.status(200).json({
            status: "OK",
            data: result,
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

  updateAdmin: async (req, res) => {
    const id = req.params.id;
    try {
      await db.Admin.update(req.body, { where: { id_admin: id } })
        .then((result) => {
          if (!result) {
            return res
              .status(404)
              .json({ status: "ERR", msg: "Account not found" });
          }
          return res.status(200).json({
            status: "OK",
            data: result,
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

  deleteAdmin: async (req, res) => {
    try {
      await db.Admin.destroy({ where: { id_admin: req.params.id } })
        .then((result) => {
          if (!result) {
            return res
              .status(404)
              .json({ status: "ERR", msg: "Account not found" });
          }
          return res.status(200).json({
            status: "OK",
            msg: "Delete account successfully",
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

module.exports = adminController;
