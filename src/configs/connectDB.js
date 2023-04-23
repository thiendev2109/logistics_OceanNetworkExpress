import Sequelize from "sequelize";

// Cấu hình kết nối tới server 1
const logistics_ONE = new Sequelize("Logi_OceanNetworkExpress", "sa", "12345", {
  host: "SITHIEN",
  dialect: "mssql",
});

let connectDB = async (app) => {
  try {
    // Kiểm tra kết nối tới từng server SQL
    logistics_ONE
      .authenticate()
      .then(() => {
        console.log("Connect to ONE VIETNAM success");
      })
      .catch((err) => {
        console.error("Unable to connect to ONE VIETNAM : ", err);
      });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  app.post("/api/change-port", (req, res) => {
    const newPort = req.body.port;
    logistics_ONE.config.port = newPort;
    logistics_ONE
      .close()
      .then(() => logistics_ONE.authenticate())
      .then(() => {
        console.log("Connection has been established successfully.");
        res.sendStatus(200);
      })
      .catch((err) => {
        console.error("Unable to connect to the database:", err);
        res.sendStatus(500);
      });
  });
};

export default { connectDB };
