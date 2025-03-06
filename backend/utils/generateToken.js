import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
    // This code is generating a JSON Web Token (JWT) and setting it as an HTTP-only cookie in the user's browser.
        // Creates a new JWT
        const token = jwt.sign(
            // payload
            {userId},

            // secret key for signing the token
             process.env.JWT_SECRET, 
             {
            expiresIn: '5d'
        });

        // Set jwt as Http- Only cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 1 * 24 * 60 * 60 * 1000 // 1day
        });
}

export default generateToken;