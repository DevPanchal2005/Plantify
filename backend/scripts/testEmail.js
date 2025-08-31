const { sendPasswordResetEmail } = require('../services/emailService');
require('dotenv').config();

const testEmail = async () => {
  console.log('🧪 Testing email configuration...');
  console.log('📧 Email User:', process.env.EMAIL_USER);
  console.log('🔑 Has Password:', !!process.env.EMAIL_PASSWORD);
  console.log('🌐 Environment:', process.env.NODE_ENV || 'development');
  
  try {
    const result = await sendPasswordResetEmail(
      'test@example.com', 
      'test-token-123', 
      'Test User'
    );
    
    console.log('✅ Email test successful!');
    console.log('📧 Message ID:', result.messageId);
    
    if (result.previewUrl) {
      console.log('🔗 Preview URL:', result.previewUrl);
      console.log('\n📝 Copy the preview URL above and paste it in your browser to see the email');
    }
    
  } catch (error) {
    console.error('❌ Email test failed:', error.message);
    
    // Provide troubleshooting tips
    console.log('\n🔧 Troubleshooting tips:');
    
    if (error.message.includes('authentication')) {
      console.log('1. Make sure you have enabled 2-factor authentication on your Gmail account');
      console.log('2. Generate an "App Password" in your Google Account settings');
      console.log('3. Use the app password (not your regular password) in EMAIL_PASSWORD');
      console.log('4. App password should be 16 characters without spaces');
    }
    
    if (error.message.includes('connection')) {
      console.log('1. Check your internet connection');
      console.log('2. Make sure Gmail SMTP is not blocked by your firewall');
      console.log('3. Try using a different network');
    }
    
    console.log('\n📚 Gmail App Password Setup:');
    console.log('1. Go to https://myaccount.google.com/');
    console.log('2. Security → 2-Step Verification → App passwords');
    console.log('3. Generate a new app password for "Mail"');
    console.log('4. Copy the 16-character password to your .env file');
  }
};

// Run the test
testEmail();
