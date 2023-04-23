import db from "../../models/index";

const bookingController = {

    getAllbookings: async(req, res) => {
      
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

      await db.Customer.create({
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
  
    } 
};

module.exports = bookingController;