const autocannon = require('autocannon');
const { io } = require('socket.io-client');

async function runTest() {
  console.log('Starting load test on API...');
  
  const instance = autocannon({
    url: 'http://localhost:5000',
    connections: 200, 
    pipelining: 1, 
    duration: 15,
    requests: [
      {
        method: 'GET',
        path: '/api/match/candidates?salaryMin=50000&salaryMax=100000&location=NY',
      },
      {
        method: 'GET',
        path: '/api/search/jobs?salary=60000&remote=true',
      },
      {
        method: 'GET',
        path: '/health',
      }
    ]
  }, console.log);

  // track autocannon progress
  autocannon.track(instance, {renderProgressBar: true});
  
  // also test websocket connections
  console.log('Starting WebSocket stress test...');
  const sockets = [];
  let connections = 0;
  for (let i = 0; i < 500; i++) {
    const socket = io('http://localhost:5000', { reconnection: false });
    socket.on('connect', () => {
      connections++;
      socket.emit('subscribeNotifications', `user_${i}`);
    });
    socket.on('disconnect', () => {
      // console.log(`Socket disconnected`);
    });
    sockets.push(socket);
  }

  instance.on('done', (result) => {
    console.log(`Completed API load test.`);
    console.log(`Websocket connections established: ${connections}/500`);
    
    // clean up sockets
    sockets.forEach(s => s.disconnect());
    process.exit(0);
  });
}

runTest();
