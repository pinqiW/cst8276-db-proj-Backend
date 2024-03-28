const username = process.env.USERINFO;
const password = process.env.PASS;
const database = process.env.DATABASE;

//MongoDB connection url

// module.exports = {
//     url:
//         "mongodb+srv://" +
//         username +
//         ":" +
//         password +
//         "@host/" +
//         database,
// };


module.exports = {
    url:
        "mongodb://localhost:27017/CST8276"
};
