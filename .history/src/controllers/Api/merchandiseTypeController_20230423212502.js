import db from "../../models/index";

const merchandiseTypeController = {
  createVehical: async (req, res) => {
    const { id_merchandiseType, merchandiseTypeName, price } =
      req.body;

    await db.Vehicals.create({
      id_merchandiseType,
      licensePlate,
      vehicalLocation,
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
  // Get all admin
  getAllVehicals: async (req, res) => {
    try {
      await db.Vehicals.findAll()
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

  getVehical: async (req, res) => {
    try {
      await db.Vehicals.findOne({ where: { id_vehical: req.params.id } })
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

  updateVehical: async (req, res) => {
    const id = req.params.id;
    try {
      await db.Vehicals.update(req.body, { where: { id_vehical: id } })
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
