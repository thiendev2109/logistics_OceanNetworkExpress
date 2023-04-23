import express from "express";
import authAdminController from "../controllers/Api/authAdminController";
import adminController from "../controllers/Api/adminController";
import authCustomerController from "../controllers/Api/authCustomerController";
import customerController from "../controllers/Api/customerController";
import warehouseController from "../controllers/Api/warehouseController";
import employeeTypeCotroller from "../controllers/Api/employeeTypeController";
import employeeController from "../controllers/Api/employeeController";
import vehicalController from "../controllers/Api/vehicalController";
import containerController from "../controllers/Api/containerController";
import serviceController from "../controllers/Api/serviceController";
import merchandiseTypeController from "../controllers/Api/merchandiseTypeController";
import bookingController from "../controllers/Api/bookingController";
import paymentController from "../controllers/Api/paymentController";
import shippingController from "../controllers/Api/shippingController"
//middleware
import middleware from "../middlewares/middleware";

let router = express.Router();
// prettier-ignore
const initialApiRouter = (app) => {
  //admin auth
  router.post("/admin",middleware.verifyTokenAndAdmin,authAdminController.createAdmin);
  router.post("/admin-login", authAdminController.loginAdmin);
  router.post("/admin-logout",middleware.verifyToken, authAdminController.logoutAdmin);
  router.post('/admin-refresh', authAdminController.requestRefreshToken)
  // admin
  router.get("/admin", middleware.verifyTokenAndAdmin, adminController.getAllAdmin);
  router.put("/admin/:id",middleware.verifyTokenAndAdmin,adminController.updateAdmin);
  router.delete("/admin/:id",middleware.verifyTokenAndAdmin,adminController.deleteAdmin);


  //customer auth
  router.post('customer-login' ,middleware.verifyTokenAndAdmin, authCustomerController.loginCustomer);
  //customer
  router.post('/customer', authCustomerController.createCustomer);
  router.get('/customer',  customerController.getAllCustomers);
  router.get('/customer:id', middleware.verifyTokenAndAdmin,  customerController.getCustomer);
  router.put('/customer/:id', middleware.verifyTokenAndAdmin, customerController.updateCustomer);
  router.delete('/customer/:id', middleware.verifyTokenAndAdmin, customerController.deleteCustomer);
  
  //employee-type
  router.post('/employee-type',middleware.verifyTokenAndAdmin, employeeTypeCotroller.createEmployeeType);
  router.get('/employee-type', employeeTypeCotroller.getAllEmployeeType);
  router.get('/employee-type:id', employeeTypeCotroller.getEmployeeType);
  router.put('/employee-type/:id',middleware.verifyTokenAndAdmin, employeeTypeCotroller.updateEmployeeType);
  router.delete('/employee-type/:id',middleware.verifyTokenAndAdmin, employeeTypeCotroller.deleteEmployeeType);


  //employees
  router.post('/employee',middleware.verifyTokenAndAdmin, employeeController.createEmployee);
  router.get('/employee',middleware.verifyTokenAndAdmin, employeeController.getAllEmployees);
  router.get('/employee:id', employeeController.getEmployee);
  router.put('/employee/:id',middleware.verifyTokenAndAdmin, employeeController.updateEmployee);
  router.delete('/employee/:id',middleware.verifyTokenAndAdmin, employeeController.deleteEmployee);


  //warehouse

  //warehouse router
  router.get('/warehouse', middleware.verifyTokenAndAdmin, warehouseController.getAllWarehouses);
  router.get('/warehouse:id', warehouseController.getWarehouse);
  router.put('/warehouse/:id', middleware.verifyTokenAndAdmin, warehouseController.updateWarehouse);
  router.delete('/warehouse/:id', middleware.verifyTokenAndAdmin, warehouseController.deleteWarehouse);
  router.post("/warehouse", middleware.verifyTokenAndAdmin , warehouseController.createWarehouse);

  //vehical 
  router.post('/vehical', middleware.verifyTokenAndAdmin, vehicalController.createVehical);
  router.get('/vehical', middleware.verifyTokenAndAdmin, vehicalController.getAllVehicals);
  router.get('/vehical:id', vehicalController.getVehical);
  router.put('/vehical/:id', middleware.verifyTokenAndAdmin, vehicalController.updateVehical);
  router.delete('/vehical/:id', middleware.verifyTokenAndAdmin, vehicalController.deleteVehical);

  //container
  router.post('/container', containerController.createContainer);
  router.get('/container', containerController.getAllContainers);
  router.get('/container:id', containerController.getContainer);
  router.put('/container/:id', containerController.updateContainer);
  router.delete('/container/:id', containerController.deleteContainer);

  //service
  router.post('/service', serviceController.createService);
  router.get('/service', serviceController.getAllServices);
  router.get('/service:id', serviceController.getService);
  router.put('/service/:id', serviceController.updateService);
  router.delete('/service/:id', serviceController.deleteService);

  //merchandiseType
  router.post('/merchandise-type', merchandiseTypeController.createMerchandiseType);
  router.get('/merchandise-type', merchandiseTypeController.getAllMerchandiseTypes);
  router.get('/merchandise-type:id', merchandiseTypeController.getMerchandiseType);
  router.put('/merchandise-type/:id', merchandiseTypeController.updateMerchandiseType);
  router.delete('/merchandise-type/:id', merchandiseTypeController.deleteMerchandiseType);

  //booking 
  router.post('/booking', bookingController.createBooking);
  router.get('/booking', bookingController.getAllbookings);
  router.get('/booking:id', bookingController.getBooking);
  router.put('/booking/:id', bookingController.updateBooking);
  router.delete('/booking/:id', bookingController.deleteBooking);


  router.put('/booking-to-status/:id', bookingController.bookingToStatus);
  router.post('booking-to-shipping', bookingController.bookingToShipping);
  router.post('booking-to-payment', bookingController.bookingToPayment);

  //payment
  //merchandiseType
  router.post('/payment', paymentController.createPayment);
  router.get('/payment', paymentController.getAllPayments);
  router.get('/payment:id', paymentController.getPayment);
  router.put('/payment/:id', paymentController.updatePayment);
  router.delete('/payment/:id', paymentController.deletePayment);

   //merchandiseType
   router.post('/shipping', shippingController.createMerchandiseType);
   router.get('/shipping', shippingController.getAllMerchandiseTypes);
   router.get('/shipping:id', shippingController.getMerchandiseType);
   router.put('/shipping/:id', shippingController.updateMerchandiseType);
   router.delete('/shipping/:id', shippingController.deleteMerchandiseType);

  return app.use("/api", router);
};

export default initialApiRouter;
