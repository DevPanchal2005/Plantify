const axios = require('axios');

const testForgotPassword = async () => {
  console.log('🧪 Testing forgot password API...');
  
  try {
    // Test the forgot password endpoint
    const response = await axios.post('http://localhost:5000/api/users/forgot-password', {
      email: 'project.karle@gmail.com'
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ Forgot password API test successful!');
    console.log('📧 Response:', response.data);
    
    if (response.data.previewUrl) {
      console.log('🔗 Email preview URL:', response.data.previewUrl);
    }
    
  } catch (error) {
    console.error('❌ Forgot password API test failed:');
    
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.message);
      console.error('Make sure the backend server is running on port 5000');
    } else {
      console.error('Error:', error.message);
    }
  }
};

// Test if server is reachable first
const testServerHealth = async () => {
  try {
    const response = await axios.get('http://localhost:5000/');
    console.log('✅ Server is running:', response.data.message);
    return true;
  } catch (error) {
    console.error('❌ Server is not reachable:', error.message);
    return false;
  }
};

const runTests = async () => {
  console.log('🚀 Starting forgot password tests...\n');
  
  const serverRunning = await testServerHealth();
  if (serverRunning) {
    console.log('');
    await testForgotPassword();
  }
};

runTests();
