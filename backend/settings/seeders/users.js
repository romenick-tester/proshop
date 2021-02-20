const bcrypt = require("bcryptjs");
require("dotenv").config();

const users = [
    {
        name: "Admin User",
        email: "admin@exp.com",
        password: bcrypt.hashSync(process.env.PASSWORD, 10),
        isAdmin: true
    },
    {
        name: "Nick Tester",
        email: "nick_tester@exp.com",
        password: bcrypt.hashSync(process.env.PASSWORD, 10),
        isAdmin: false
    },
    {
        name: "Romenick Tester",
        email: "rom_tester@exp.com",
        password: bcrypt.hashSync(process.env.PASSWORD, 10),
        isAdmin: false
    },
    {
        name: "Jane Doe",
        email: "jane_doe@exp.com",
        password: bcrypt.hashSync(process.env.PASSWORD, 10),
        isAdmin: false
    },
    {
        name: "John Doe",
        email: "john_doe@exp.com",
        password: bcrypt.hashSync(process.env.PASSWORD, 10),
        isAdmin: false
    },
    {
        name: "Steven Smith",
        email: "steven_smith@exp.com",
        password: bcrypt.hashSync(process.env.PASSWORD, 10),
        isAdmin: false
    }
]

module.exports = users;