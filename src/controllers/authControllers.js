const register =async (req, res) => {
    // Registration logic here
    res.status(201).json({ message: 'User registered successfully' });
};

export { register };