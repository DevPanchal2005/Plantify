const http = require('http');

const testForgotPassword = () => {
  const postData = JSON.stringify({
    email: 'project.karle@gmail.com'
  });

  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/users/forgot-password',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  console.log('🧪 Testing forgot password API...');
  console.log('📧 Email:', 'project.karle@gmail.com');

  const req = http.request(options, (res) => {
    console.log(`📊 Status Code: ${res.statusCode}`);
    console.log(`📋 Headers:`, res.headers);

    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      try {
        const response = JSON.parse(data);
        console.log('📧 Response:', response);
        
        if (response.success) {
          console.log('✅ Forgot password test successful!');
          if (response.previewUrl) {
            console.log('🔗 Preview URL:', response.previewUrl);
          }
        } else {
          console.log('❌ Forgot password test failed:', response.message);
        }
      } catch (error) {
        console.log('❌ Failed to parse response:', data);
      }
    });
  });

  req.on('error', (error) => {
    console.error('❌ Request error:', error.message);
  });

  req.write(postData);
  req.end();
};

testForgotPassword();
