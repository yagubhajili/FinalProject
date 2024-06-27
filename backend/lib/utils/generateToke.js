import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (userId, res) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: '10d'
        });

        res.cookie('jwt', token, {
            maxAge: 10 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
        });
    } catch (error) {
        console.error("Error generating token or setting cookie:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
