const express = require("express");
const app = express();
app.use(express.json());

const notification_queue = require("./queues/notification");

app.post("/api/notifications/send", function (req, res) {
  notification_queue.add({
    type: "database",
    users: req.body.users,
    message: req.body.message,
  });

  res.json("success");
});

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
