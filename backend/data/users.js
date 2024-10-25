import bcrypt from 'bcryptjs';
import exp from 'constants';

const users = [
    {
        name: 'Admin User',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },

    {
        name: 'Akshaya',
        email: 'akshaya@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false
    },

    {
        name: 'Prawin',
        email: 'prawin@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false
    },
];

export default users;