import jsonwebtoken from 'jsonwebtoken';
import authConfig from '@/main/config/auth';

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jsonwebtoken.verify(token, authConfig.jwt.secret);

        req.userId = decoded.sub;

        console.log({ decoded })

        next();
    } catch (error: any) {
        return res.status(403).json({ message: 'Failed to authenticate token' });
    }
}