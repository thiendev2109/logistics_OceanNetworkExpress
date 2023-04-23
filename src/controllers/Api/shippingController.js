import db from "../../models/index";

const shippingController = {
  createShipping: async (req, res) => {
    const {  
        id_employee,
        id_booking,
        shippingArrivelExpectedDate,
        containerCount,
        status,
        requestDepartureDate,
        requestArrivelDate,
        totalCost,
        } = req.body;

    await db.Shippings.create({
        id_employee,
        id_booking,
        shippingArrivelExpectedDate,
        containerCount,
        status,
        requestDepartureDate,
        requestArrivelDate,
        totalCost,
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
  getAllShippings: async (req, res) => {
    try {
      await db.Shippings.findAll()
        .then((result) => {
          if (!result) {
            return res
              .status(404)
              .json({ status: "ERR", msg: "Shippings not found" });
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

  getShipping: async (req, res) => {
    try {
      await db.Shippings.findOne({ where: { id_shipping: req.params.id } })
        .then((result) => {
          if (!result) {
            return res
              .status(404)
              .json({ status: "ERR", msg: "Shippings not found" });
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

  updateShipping: async (req, res) => {
    const id = req.params.id;
    try {
      await db.Shippings.update(req.body, { where: { id_shipping: id } })
        .then((result) => {
          if (!result) {
            return res
              .status(404)
              .json({ status: "ERR", msg: "Shippings not found" });
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

  deleteShipping: async (req, res) => {
    try {
      await db.Shippings.destroy({ where: { id_shipping: req.params.id } })
        .then((result) => {
          if (!result) {
            return res
              .status(404)
              .json({ status: "ERR", msg: "Shippings not found" });
          }
          return res.status(200).json({
            status: "OK",
            msg: "Delete Shippings successfully",
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

module.exports = shippingController;
