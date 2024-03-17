
const app = require('./app');
const connectDatabase = require('./config/database');
const dotenv = require('dotenv');
dotenv.config({ path: 'D:/Bitweb/backend/config/config.env' }); // Adjust the path as needed

// Pass DB_LOCAL_URI as parameter to connectDatabase()
connectDatabase(process.env.DB_LOCAL_URI);

app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});
