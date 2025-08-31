const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const checkUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Check if user exists
    const user = await User.findOne({ email: 'project.karle@gmail.com' });
    
    if (user) {
      console.log('✅ User found:');
      console.log('  - Name:', user.name);
      console.log('  - Email:', user.email);
      console.log('  - Created:', user.createdAt);
      console.log('  - Active:', user.isActive);
    } else {
      console.log('❌ User not found. Creating test user...');
      
      const newUser = new User({
        name: 'Test User',
        email: 'project.karle@gmail.com',
        password: 'password123'
      });
      
      await newUser.save();
      console.log('✅ Test user created successfully!');
    }
    
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
};

checkUser();
