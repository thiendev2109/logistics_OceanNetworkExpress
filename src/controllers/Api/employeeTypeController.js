import db from "../../models/index";

const employeeTypeController = {
  getAllEmployeeType: async (req, res) => {
    try {
      await db.EmployeeType.findAll()
        .then((result) => {
          if (!result) {
            return res
              .status(404)
              .json({ status: "ERR", msg: "Employee type not found" });
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

  getEmployeeType: async (req, res) => {
    const id = req.params.id;
    try {
      await db.EmployeeType.findOne({ where: { id_employeeType: id } })
        .then((result) => {
          if (!result) {
            return res
              .status(404)
              .json({ status: "ERR", msg: "Employee type not found" });
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

  createEmployeeType: async (req, res) => {
    const { employeeTypeName } = req.body;

    await db.EmployeeType.create({
      employeeTypeName,
    })
      .then((result) => {
        return res.status(200).json({
          status: "OK",
          data: result,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(412).json({
          status: "ERR",
          msg: err,
        });
      });
  },

  updateEmployeeType: async (req, res) => {
    try {
      await db.EmployeeType.update(req.body, {
        where: { id_employeeType: req.params.id },
      })
        .then((result) => {
          if (!result) {
            return res
              .status(404)
              .json({ status: "ERR", msg: "Employee type not found" });
          }
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
    } catch (error) {
      return res.status(500).json({
        status: "ERR",
        msg: error,
      });
    }
  },

  deleteEmployeeType: async (req, res) => {
    try {
      await db.EmployeeType.destroy({
        where: { id_employeeType: req.params.id },
      })
        .then((result) => {
          if (!result) {
            return res
              .status(404)
              .json({ status: "ERR", msg: "Employee type not found" });
          }
          return res.status(200).json({
            status: "OK",
            msg: "Delete employee type successfully",
          });
        })
        .catch((err) => {
          return res.status(412).json({ status: "ERR", msg: err.message });
        });
    } catch (error) {
      return res.status(500).json({ status: "ERR", msg: error });
    }
  },
};

module.exports = employeeTypeController;
