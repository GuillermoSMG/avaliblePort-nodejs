import { createServer } from 'node:net';

/**
 * Get Available Port
 * @param desiredPort Number
 * @returns Desired port if free or random available one
 */

export default function findAvailablePort(desiredPort = 0) {
  const minPort = 0;
  const maxPort = 65_535;
  if (typeof desiredPort !== 'number' || isNaN(desiredPort))
    throw new Error('You should pass a number as parameter.');

  if (desiredPort > maxPort || desiredPort < minPort) {
    throw new Error(
      `Desired port must be a number between ${minPort} and ${maxPort}`
    );
  }

  return new Promise((resolve, reject) => {
    const server = createServer();

    server.listen(desiredPort, () => {
      const { port } = server.address();
      server.close(() => {
        resolve(port);
      });
    });
    server.on('error', err => {
      if (err.code === 'EADDRINUSE') {
        findAvailablePort(0).then(port => resolve(port));
      } else {
        reject(err);
      }
    });
  });
}
