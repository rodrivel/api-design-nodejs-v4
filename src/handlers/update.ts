import prisma from '../db';

export const getUpdate = async (req, res) => {
    const update = await prisma.update.findUnique({
        where: {
            id: req.params.productId
        }
    });

    res.json({ data: update });
};

export const getUpdates = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    });

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates];
    }, []);

    res.json({
        data: updates
    });
};

export const createUpdate = async (req, res) => {
    const product = await prisma.product.findUnique({
        where: {
            id: req.body.id
        }
    });

    if (!product) {
        res.json({ message: 'no product' });
    }

    const update = await prisma.update.create({
        data: req.body
    });

    res.json({ data: update });
};

export const updateUpdate = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    });

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates];
    }, []);

    const match = updates.find((update) => update.id === req.params.id);

    if (!match) {
        res.json({ message: 'no match' });
    }

    const updated = await prisma.update.update({
        where: {
            id: req.params.id
        },
        data: req.body
    });

    res.json({ data: updated });
};

export const deleteUpdate = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    });

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates];
    }, []);

    const match = updates.find((update) => update.id === req.params.id);

    if (!match) {
        res.json({ message: 'no match' });
    }

    const deleted = await prisma.update.delete({
        where: {
            id: req.params.id
        }
    });

    res.json({ data: deleted });
};
