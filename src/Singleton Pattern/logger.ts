// Private the Constructor
// Create Static Varibale instanace
// Globla Access Method

class Logger {
  private static instance: Logger;

  private constructor() {
    console.log("Logger instance created");
  }

  static getInstance(): Logger {
    if (!Logger.instance) Logger.instance = new Logger();

    return Logger.instance;
  }

  log(data: string): void {
    console.log(`[LOG] data : ${data}`);
  }
}

const logger = Logger.getInstance();
logger.log("Test");

//Trade Off : Difficult to Unit test

class Logger2 {
  log(message: string): void {
    console.log(`[LOG]: ${message}`);
  }
}

// Create ONE instance manually, in one place
const logger2 = new Logger2();
module.exports = logger2;
