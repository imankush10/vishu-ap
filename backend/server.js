const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

async function main()
{
    await mongoose.connect('mongodb+srv://admin:imankush10@cluster0.no6rkve.mongodb.net/');

    const UserSchema = new mongoose.Schema({
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    });
    
    const User = mongoose.model('User', UserSchema);
    
    app.post('/api/signup', async (req, res) => {
        try {
            const { email, password } = req.body;
            
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }
    
            const hashedPassword = await bcrypt.hash(password, 12);
            
            const user = new User({
                email,
                password: hashedPassword
            });
            
            await user.save();
            
            res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong' });
        }
    });
    
    app.post('/api/login', async (req, res) => {
        try {
            const { email, password } = req.body;
            
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }
            
            const token = jwt.sign(
                { userId: user._id },
                'secret',
                { expiresIn: '1h' }
            );
            
            res.status(200).json({ token });
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong' });
        }
    });
    
    app.listen(5000, () => {
        console.log('Server running on port 5000');
    });
}

main();
