import db from "../../models/index";

const merchandiseTypeController = {
  createMerchandiseType: async (req, res) => {
    const { id_merchandiseType, merchandiseTypeName, price } =
      req.body;

    await db.MerchandiseType.create({
      id_merchandiseType,
      merchandiseTypeName,
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
  getAllMerchandiseTypes: async (req, res) => {
    try {
      await db.MerchandiseType.findAll()
        .then((result) => {
          if (!result) {
            return res
              .status(404)
              .json({ status: "ERR", msg: "MerchandiseType not found" });
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

  getMerchandiseType: async (req, res) => {
    try {
      await db.MerchandiseType.findOne({ where: { id_merchandiseType: req.params.id } })
        .then((result) => {
          if (!result) {
            return res
              .status(404)
              .json({ status: "ERR", msg: "MerchandiseType not found" });
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

  updateMerchandiseType: async (req, res) => {
    const id = req.params.id;
    try {
      await db.MerchandiseType.update(req.body, { where: { id_merchandiseType: id } })
        .then((result) => {
          if (!result) {
            return res
              .status(404)
              .json({ status: "ERR", msg: "MerchandiseType not found" });
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
      await db.MerchandiseType.destroy({ where: { id_merchandiseType: req.params.id } })
        .then((result) => {
          if (!result) {
            return res
              .status(404)
              .json({ status: "ERR", msg: "MerchandiseType not found" });
          }
          return res.status(200).json({
            status: "OK",
            msg: "Delete MerchandiseType successfully",
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

module.exports = merchandiseTypeController;
