const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://hamstersophia:hthSgURVggHvdt8h@cluster0-tnb5u.mongodb.net/restaurant?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true});
        console.log('Database connection success');
    } catch (err) {
        console.log(err);
    }
}
module.exports = connectDB;