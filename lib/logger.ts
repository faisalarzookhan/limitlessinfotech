import fs from 'fs/promises';
import path from 'path';

const logFilePath = path.join(process.cwd(), 'error.log');

/**
 * Asynchronously logs an error to a file.
 * It captures the error's stack trace and prepends a timestamp.
 * If writing to the log file fails, it logs a message to the console.
 * @param error - The error object or message to log. Can be of any type.
 */
export async function logError(error: any) {
  const timestamp = new Date().toISOString();
  const errorMessage = `${timestamp} - ${error.stack || error}\n`;
  try {
    await fs.appendFile(logFilePath, errorMessage);
  } catch (err) {
    console.error('Failed to write to log file:', err);
    // In a real-world scenario, you might want a fallback logging mechanism here.
  }
}
