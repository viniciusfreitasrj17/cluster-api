import { createServer } from 'http';
const processId = process.pid;

const server = createServer((req, res) => {
  try {
    for (let i = 0; i < 1e7; i++);
    res.end(`ok ::: pid: ${processId}`);
    
    // it's in other context, no throw in catch
    setTimeout(() => {
      throw new Error('no treated on uncaught')
    }, 1500)
    
    // it's in other context, no throw in catch (here need put await)
    Promise.reject('no treated on promise')
  } catch (error) {
    console.log(`Error: ${error} on catch`)
  }
})

server
  .listen(3000)
  .once('listening', () => console.log('run at 3000... ', processId));

// capture errors no treated on uncaught
process.on('uncaughtException', (error, origin) => {
  console.log(`\n${origin} signal received. \n${error}`)
})

// capture errors no treated on prommise
process.on('unhandledRejection', (error) => {
  console.log(`\nunhandledRejection signal received. \n${error}`)
})

// Kill a processo random minutes
setTimeout(() => {
  process.kill(processId)
}, Math.random() * 1e4)


// --- graceful shutdown

function gracefulShutdown(event) {
  return (code) => {
    console.log(`${event} received! ${new Date().toISOString()} with ${code}`)
    server.close(() => {
      console.log('http server closed')

      // ... closing db
      console.log('DB connection closed')
      process.exit(code)
    })
  }
}

// Ctrl + C
process.on('SIGINT', gracefulShutdown('SIGINT'))

// kill
process.on('SIGTERM', gracefulShutdown('SIGTERM'))

// exit
process.on('exit', (code) => {
  console.log('exit signal received ', code)
})
