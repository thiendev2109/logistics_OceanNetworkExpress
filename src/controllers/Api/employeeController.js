import db from "../../models/index";

const employeeController = {
  createEmployee: async (req, res) => {
    const {
      firstname,
      lastname,
      email,
      phone,
      city,
      country,
      address,
      cardIndentify,
      birthday,
      sex,
      id_warehouse,
      id_employeeType,
    } = req.body;

    await db.Employees.create({
      firstname,
      lastname,
      email,
      phone,
      city,
      country,
      address,
      cardIndentify,
      birthday,
      sex,
      id_warehouse,
      id_employeeType,
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
  // Get all admin
  getAllEmployees: async (req, res) => {
    try {
      await db.Employees.findAll()
        .then((result) => {
          if (!result) {
            return res
              .status(404)
              .json({ status: "ERR", msg: "Employee not found" });
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

  getEmployee: async (req, res) => {
    try {
      await db.Employees.findOne({ where: { id_employee: req.params.id } })
        .then((result) => {
          if (!result) {
            return res
              .status(404)
              .json({ status: "ERR", msg: "Employee not found" });
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

  updateEmployee: async (req, res) => {
    const id = req.params.id;
    try {
      await db.Employees.update(req.body, { where: { id_employee: id } })
        .then((result) => {
          if (!result) {
            return res
              .status(404)
              .json({ status: "ERR", msg: "Employee not found" });
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

  deleteEmployee: async (req, res) => {
    try {
      await db.Employees.destroy({ where: { id_employee: req.params.id } })
        .then((result) => {
          if (!result) {
            return res
              .status(404)
              .json({ status: "ERR", msg: "Employee not found" });
          }
          return res.status(200).json({
            status: "OK",
            msg: "Delete employee successfully",
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

module.exports = employeeController;
