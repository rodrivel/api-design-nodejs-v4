import prisma from '../db';
import { comparePassword, createJWT, hashPassword } from '../modules/auth';

export const createNewUser = async (req, res) => {
    const user = await prisma.user.create({
        data: {
            username: req.body.username,
            password: await hashPassword(req.body.password)
        }
    });

    const token = createJWT(user);
    res.json({ token });
};

export const signin = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username
        }
    });

    const passwordMatch = comparePassword(user.password, req.body.password);
    if (!passwordMatch) {
        req.status(401);
        req.json({ message: 'credentials error' });
        return;
    }

    const token = createJWT(user);
    res.json({ token });
};
