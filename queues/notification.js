const Queue = require("bull");

const queue = new Queue("notification-queue", {
  redis: { host: process.env.REDIS_HOST, port: process.env.REDIS_PORT },
});

const databaseWorker = require("../workers/database");

queue.process(async (job, done) => {
  const type = job.data.type;
  switch (type) {
    case "database":
      databaseWorker.addNotification(job.data.users, job.data.message);
      break;
    default:
      console.log("other");
  }

  done();
});

queue.on("completed", function (job, result) {
  console.log("Completed: Job-" + job.id);
});

module.exports = queue;
