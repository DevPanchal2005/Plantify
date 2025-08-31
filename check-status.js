const http = require("http");

const checkServer = (port, name) => {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:${port}`, (res) => {
      console.log(`✅ ${name} server is running on port ${port}`);
      resolve(true);
    });

    req.on("error", () => {
      console.log(`❌ ${name} server is NOT running on port ${port}`);
      resolve(false);
    });

    req.setTimeout(2000, () => {
      console.log(`⏰ ${name} server timeout on port ${port}`);
      req.destroy();
      resolve(false);
    });
  });
};

async function checkStatus() {
  console.log("🔍 Checking server status...\n");

  const frontendRunning = await checkServer(5174, "Frontend");
  const backendRunning = await checkServer(5000, "Backend");

  console.log("\n📊 Status Summary:");
  console.log(
    `Frontend (React): ${frontendRunning ? "✅ Running" : "❌ Not Running"}`
  );
  console.log(
    `Backend (Express): ${backendRunning ? "✅ Running" : "❌ Not Running"}`
  );

  if (frontendRunning && backendRunning) {
    console.log("\n🎉 All servers are running! Your MERN stack is ready!");
    console.log("🌐 Frontend: http://localhost:5174");
    console.log("🔧 Backend API: http://localhost:5000");
  } else {
    console.log("\n⚠️  Some servers are not running. Please check the setup.");
  }
}

checkStatus();
