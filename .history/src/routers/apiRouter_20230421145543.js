import express from "express";
import authAdminController from "../controllers/Api/authAdminController";
import adminController from "../controllers/Api/adminController";
import authCustomerController from "../controllers/Api/authCustomerController";
import customerController from "../controllers/Api/customerController";
import warehouseController from "../controllers/Api/warehouseController";
//middleware
import middleware from "../middlewares/middleware";

let router = express.Router();
// prettier-ignore
const initialApiRouter = (app) => {
  //admin auth
  router.post("/admin",middleware.verifyTokenAndAdmin,authAdminController.createAdmin);
  router.post("/admin-lg", authAdminController.loginAdmin);
  // admin
  router.get("/admin", middleware.verifyTokenAndAdmin, adminController.getAllAdmin);
  router.put("/admin:id",middleware.verifyTokenAndAdmin,adminController.updateAdmin);
  router.delete("/admin:id",middleware.verifyTokenAndAdmin,adminController.deleteAdmin);


  //customer auth
  router.post('customer-lg', authCustomerController.loginCustomer);
  //customer
  router.post('/customer', authCustomerController.createCustomer);
  router.get('/customer', customerController.getAllCustomers);
  router.get('/customer:id', middleware.verifyTokenAndAdmin,  customerController.getCustomer);
  router.put('/customer:id', middleware.verifyTokenAndAdmin, customerController.updateCustomer);
  router.delete('/customer:id', middleware.verifyTokenAndAdmin, customerController.deleteCustomer);
  
  //employee-type
  //employees


  //warehouse

  //warehouse router
  router.get('/warehouse', middleware.verifyTokenAndAdmin, warehouseController.getAllWarehouses);
  router.get('/warehouse:id', warehouseController.getWarehouse);
  router.put('/warehouse:id', middleware.verifyTokenAndAdmin, warehouseController.updateWarehouse);
  router.delete('/warehouse:id', middleware.verifyTokenAndAdmin, warehouseController.deleteWarehouse);
  router.post("/warehouse", middleware.verifyTokenAndAdmin , warehouseController.createWarehouse);

  //

  return app.use("/api", router);
};

export default initialApiRouter;
