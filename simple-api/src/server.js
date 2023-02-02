import { createServer } from 'http';
const processId = process.pid;

const server = createServer((req, res) => {
  for (let i = 0; i < 1e7; i++);
  res.end(`ok ::: pid: ${processId}`);
})

server
  .listen(3000)
  .once('listening', () => console.log('run at 3000... ', processId));

process.on('SIGTERM', () => {
  // here close conections ...
  console.log('server ending ', new Date().toISOString())
  server.close(() => process.exit())
})