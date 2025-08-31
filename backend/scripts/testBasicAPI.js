const http = require('http');

const testBasicAPI = () => {
  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/',
    method: 'GET'
  };

  console.log('🧪 Testing basic API endpoint...');

  const req = http.request(options, (res) => {
    console.log(`📊 Status Code: ${res.statusCode}`);

    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      try {
        const response = JSON.parse(data);
        console.log('📧 Response:', response);
        
        if (res.statusCode === 200) {
          console.log('✅ Basic API test successful!');
          
          // Now test the forgot password endpoint
          testForgotPasswordEndpoint();
        } else {
          console.log('❌ Basic API test failed');
        }
      } catch (error) {
        console.log('❌ Failed to parse response:', data);
      }
    });
  });

  req.on('error', (error) => {
    console.error('❌ Request error:', error.message);
  });

  req.end();
};

const testForgotPasswordEndpoint = () => {
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

  console.log('\n🧪 Testing forgot password endpoint...');

  const req = http.request(options, (res) => {
    console.log(`📊 Status Code: ${res.statusCode}`);

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

testBasicAPI();
