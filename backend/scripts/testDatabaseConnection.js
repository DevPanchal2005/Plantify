const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const testDatabaseConnection = async () => {
  try {
    console.log('🔍 Testing database connection...');
    console.log('🔍 MongoDB URI:', process.env.MONGODB_URI);
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB successfully');
    
    // Test finding the user
    console.log('🔍 Looking for user with email: project.karle@gmail.com');
    
    const user = await User.findOne({ email: 'project.karle@gmail.com' });
    console.log('🔍 User found:', user ? 'YES' : 'NO');
    
    if (user) {
      console.log('📧 User email:', user.email);
      console.log('👤 User name:', user.name);
      console.log('🆔 User ID:', user._id);
      console.log('✅ User active:', user.isActive);
    }
    
    // List all users
    const allUsers = await User.find({}, 'email name');
    console.log('📋 All users in database:');
    allUsers.forEach((u, index) => {
      console.log(`  ${index + 1}. ${u.email} (${u.name})`);
    });
    
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
    
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
  }
};

testDatabaseConnection();
