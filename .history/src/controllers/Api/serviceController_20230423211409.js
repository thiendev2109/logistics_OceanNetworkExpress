import db from "../../models/index";

const serviceController = {
  createService: async (req, res) => {
    const { id_service, serviceName, price } =
      req.body;

    await db.Vehicals.create({
      id_vehical,
      serviceName,
      price,
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
  getAllServices: async (req, res) => {
    try {
      await db.Services.findAll()
        .then((result) => {
          if (!result) {
            return res
              .status(404)
              .json({ status: "ERR", msg: "Service not found" });
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

  getService: async (req, res) => {
    try {
      await db.Services.findOne({ where: { id_service: req.params.id } })
        .then((result) => {
          if (!result) {
            return res
              .status(404)
              .json({ status: "ERR", msg: "Service not found" });
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

  updateService: async (req, res) => {
    const id = req.params.id;
    try {
      await db.Services.update(req.body, { where: { id_vehical: id } })
        .then((result) => {
          if (!result) {
            return res
              .status(404)
              .json({ status: "ERR", msg: "Vehical not found" });
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

  deleteVehical: async (req, res) => {
    try {
      await db.Vehicals.destroy({ where: { id_vehical: req.params.id } })
        .then((result) => {
          if (!result) {
            return res
              .status(404)
              .json({ status: "ERR", msg: "Vehical not found" });
          }
          return res.status(200).json({
            status: "OK",
            msg: "Delete vehical successfully",
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

module.exports = vehicalController;
