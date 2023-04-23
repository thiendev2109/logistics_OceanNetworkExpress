import db from "../../models/index";

const bookingController = {

    getAllbookings: async(req, res) => {
      try {
        await db.Booking.findAll()
          .then((result) => {
            if (!result) {
              return res
                .status(404)
                .json({ status: "ERR", msg: "Booking not found" });
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

    getBooking: async(req, res) => {
      try {
        await db.Booking.findOne({ where: { id_booking: req.params.id } })
          .then((result) => {
            if (!result) {
              return res
                .status(404)
                .json({ status: "ERR", msg: "Booking not found" });
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

    createBooking: async (req, res) => {
        const {
        id_warehouse,
        id_customer,
        id_service,
        id_merchandiseType,
        origin,
        destination,
        requestDepartureDate,
        requestArrivelDate,
        status,
        bookingNote,
        volumn1PCS,
        totalWeight,
      }= req.body;

      await db.Booking.create({
        id_warehouse,
        id_customer,
        id_service,
        id_merchandiseType,
        origin,
        destination,
        requestDepartureDate,
        requestArrivelDate,
        status,
        bookingNote,
        volumn1PCS,
        totalWeight,
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
    updateBooking: async (req, res) => {
      const id = req.params.id;
      try {
        await db.Booking.update(req.body, { where: { id_booking: id } })
          .then((result) => {
            if (!result) {
              return res
                .status(404)
                .json({ status: "ERR", msg: "Booking not found" });
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

    deleteBooking: async (req, res) => {
      try {
        await db.Booking.destroy({ where: { id_booking: req.params.id } })
          .then((result) => {
            if (!result) {
              return res
                .status(404)
                .json({ status: "ERR", msg: "Booking not found" });
            }
            return res.status(200).json({
              status: "OK",
              msg: "Delete Booking successfully",
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

module.exports = bookingController;