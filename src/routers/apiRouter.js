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
  router.put("/admin:id",middleware.verifyTokenAndAdmin,adminController.updateAdmin);
  router.delete("/admin:id",middleware.verifyTokenAndAdmin,adminController.deleteAdmin);


  //customer auth
  router.post('customer-login' ,middleware.verifyTokenAndAdmin, authCustomerController.loginCustomer);
  //customer
  router.post('/customer', authCustomerController.createCustomer);
  router.get('/customer',  middleware.verifyTokenAndAdmin,customerController.getAllCustomers);
  router.get('/customer:id', middleware.verifyTokenAndAdmin,  customerController.getCustomer);
  router.put('/customer/:id', middleware.verifyTokenAndAdmin, customerController.updateCustomer);
  router.delete('/customer/:id', middleware.verifyTokenAndAdmin, customerController.deleteCustomer);
  
  //employee-type
  router.post('/employee-type',middleware.verifyTokenAndAdmin, employeeTypeCotroller.createEmployeeType);
  router.get('/employee-type', customerController.getAllCustomers);
  router.get('/employee-type:id', employeeTypeCotroller.getEmployeeType);
  router.put('/employee-type:id',middleware.verifyTokenAndAdmin, employeeTypeCotroller.updateEmployeeType);
  router.delete('/employee-type:id',middleware.verifyTokenAndAdmin, employeeTypeCotroller.deleteEmployeeType);


  //employees
  router.post('/employee', employeeController.createEmployee);
  router.get('/employee', employeeController.getAllEmployees);
  router.get('/employee:id', employeeController.getEmployee);
  router.put('/employee:id', employeeController.updateEmployee);
  router.delete('/employee:id', employeeController.deleteEmployee);


  //warehouse

  //warehouse router
  router.get('/warehouse', middleware.verifyTokenAndAdmin, warehouseController.getAllWarehouses);
  router.get('/warehouse:id', warehouseController.getWarehouse);
  router.put('/warehouse:id', middleware.verifyTokenAndAdmin, warehouseController.updateWarehouse);
  router.delete('/warehouse:id', middleware.verifyTokenAndAdmin, warehouseController.deleteWarehouse);
  router.post("/warehouse", middleware.verifyTokenAndAdmin , warehouseController.createWarehouse);

  //vehical 
  router.post('/vehical', vehicalController.createVehical);
  router.get('/vehical', vehicalController.getAllVehicals);
  router.get('/vehical:id', vehicalController.getVehical);
  router.put('/vehical:id', vehicalController.updateVehical);
  router.delete('/vehical:id', vehicalController.deleteVehical);

  //container
  router.post('/container', containerController.createContainer);
  router.get('/container', containerController.getAllContainers);
  router.get('/container:id', containerController.getContainer);
  router.put('/container:id', containerController.updateContainer);
  router.delete('/container:id', containerController.deleteContainer);


  return app.use("/api", router);
};

export default initialApiRouter;
