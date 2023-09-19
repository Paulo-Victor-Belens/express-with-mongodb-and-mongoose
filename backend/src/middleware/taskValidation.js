const validateFields = (req, res, next) => {
    const { title, description, status } = req.body;

    if (!title || !description || !status) {
        return res.status(400).json({ message: 'Invalid fields' });
    }
    next();
};
const validationLengthFields = (req, res, next) => {
    const { title } = req.body;
    if (title.length < 3) {
        return res.status(400)
        .json({ message: 'The size of the title is too short, should be more than 2 characters' });
    }
    if (title.length > 50) {
        return res.status(400)
        .json({ message: 'The size of the title is too long, should be more than 50 characters' });
    }
    next();
};

const validationLengthFields2 = (req, res, next) => {
    const msgShort = 'The size of the description is too short, should be more than 2 characters';
    const msgLong = 'The size of the description is too long, should be more than 200 characters';
    const { description } = req.body;
    if (description.length < 3) {
        return res.status(400)
        .json({ message: msgShort });
    }
    if (description.length > 200) {
        return res.status(400)
        .json({ message: msgLong });
    }
    next();
};

module.exports = [validateFields, validationLengthFields, validationLengthFields2];