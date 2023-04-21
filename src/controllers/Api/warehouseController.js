import db from "../../models/index";

const warehouseController = {
  getAllWarehouses: async (req, res) => {
    try {
      await db.Warehouse.findAll()
        .then((result) => {
          if (!result) {
            return res
              .status(404)
              .json({ status: "ERR", msg: "Warehouse not found" });
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

  getWarehouse: async (req, res) => {
    const id = req.params.id;
    try {
      await db.Warehouse.findOne({ where: { id_warehouse: id } })
        .then((result) => {
          if (!result) {
            return res
              .status(404)
              .json({ status: "ERR", msg: "Warehouse not found" });
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

  createWarehouse: async (req, res) => {
    const {
      warehouseName,
      location,
      email,
      phone,
      capacity,
      country,
      address,
      zipcode,
    } = req.body;

    await db.Warehouse.create({
      warehouseName,
      location,
      email,
      phone,
      capacity,
      country,
      address,
      zipcode,
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

  updateWarehouse: async (req, res) => {
    try {
      await db.Warehouse.update(req.body, {
        where: { id_warehouse: req.params.id },
      })
        .then((result) => {
          if (!result) {
            return res
              .status(404)
              .json({ status: "ERR", msg: "Warehouse not found" });
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

  deleteWarehouse: async (req, res) => {
    try {
      await db.Warehouse.destroy({ where: { id_warehouse: req.params.id } })
        .then((result) => {
          if (!result) {
            return res
              .status(404)
              .json({ status: "ERR", msg: "Warehouse not found" });
          }
          return res.status(200).json({
            status: "OK",
            msg: "Delete warehouse successfully",
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

module.exports = warehouseController;
