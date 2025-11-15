const createUser = async (req, res) => {
    try {
        const email = req.body.email;
        const findUser = await User.findOne({ email: email });

        if (!findUser) {
            // Create a new user
            const newUser = await User.create(req.body);
            res.status(201).json(newUser);
        } else {
            // User already exists
            res.status(400).json({
                msg: "User already exists",
                success: false, 
            });
        }
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const isMatch = await user.comparePassword(password);

        if (isMatch) {
            res.status(200).json({ msg: "Login Successful" });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
        
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    } 
};

module.exports = { createUser, login };





