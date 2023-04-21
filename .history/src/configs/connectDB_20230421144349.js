import Sequelize from "sequelize";


// Cấu hình kết nối tới server 1
const logistics_VN = new Sequelize('Logi_OceanNetworkExpress', 'sa', '1234', {
  host: 'DESKTOP-OJJ1N40',
  dialect: 'mssql',
});

// Cấu hình kết nối tới server 2
const logistics_SG = new Sequelize('Logi_OceanNetworkExpress', 'sa', '12345', {
  host: 'DESKTOP-OJJ1N40',
  dialect: 'mssql',
  port : 1434
});

// Cấu hình kết nối tới server 3
const logistics_KR = new Sequelize('Logi_OceanNetworkExpress', 'sa', '12345', {
  host: 'DESKTOP-OJJ1N40',
  dialect: 'mssql',
  port : 1435
});


let connectDB = async () =>{
  try { 
      // Kiểm tra kết nối tới từng server SQL
      logistics_VN
      .authenticate()
      .then(() => {
        console.log('Connect to ONE VIETNAM success');
      })
      .catch(err => {
        console.error('Unable to connect to ONE VIETNAM : ', err);
      });

      // logistics_SG
      // .authenticate()
      // .then(() => {
      //   console.log('Connect to ONE SINGAPORE success');
      // })
      // .catch(err => {
      //   console.error('Unable to connect to ONE SINGAPORE : ', err);
      // });

      // logistics_KR
      // .authenticate() 
      // .then(() => {
      //   console.log('Connect to ONE KOREA success');
      // })
      // .catch(err => {
      //   console.error('Unable to connect to ONE KOREA : ', err);
      // });
    } catch (error) {
      console.error('Unable to connect to the database:', error);
  }
}

export default {connectDB, logistics_VN};