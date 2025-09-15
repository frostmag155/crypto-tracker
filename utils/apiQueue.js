class ApiQueue {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
    this.lastRequestTime = 0;
    this.MIN_REQUEST_DELAY = 5000; // 5 секунд между запросами
  }

  async add(requestFn, priority = false) {
    return new Promise((resolve, reject) => {
      const request = {
        requestFn,
        resolve,
        reject,
        priority,
        timestamp: Date.now()
      };

      if (priority) {
        this.queue.unshift(request); // Высокий приоритет в начало
      } else {
        this.queue.push(request); // Обычный приоритет в конец
      }

      this.processQueue();
    });
  }

  async processQueue() {
    if (this.isProcessing || this.queue.length === 0) return;

    this.isProcessing = true;

    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    const delay = Math.max(0, this.MIN_REQUEST_DELAY - timeSinceLastRequest);

    await new Promise(resolve => setTimeout(resolve, delay));

    const request = this.queue.shift();
    
    try {
      const result = await request.requestFn();
      request.resolve(result);
    } catch (error) {
      request.reject(error);
    } finally {
      this.lastRequestTime = Date.now();
      this.isProcessing = false;
      this.processQueue();
    }
  }

  clear() {
    this.queue = [];
  }
}

export const apiQueue = new ApiQueue();