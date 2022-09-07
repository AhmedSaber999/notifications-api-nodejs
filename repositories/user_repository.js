const fs = require("fs/promises");
class UserRepository {
  constructor(dao) {
    this.dao = dao;
    this.createUsersTable();
    this.createNotificationsTable();
    this.seedUsersData();
  }

  createUsersTable() {
    const sql = `CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY, name NOT NULL, email NOT NULL UNIQUE)`;
    return this.dao.run(sql);
  }

  createUser(name, email) {
    return this.dao.run("INSERT INTO users(name, email) VALUES (?,?)", [
      name,
      email,
    ]);
  }

  deleteUser(id) {
    return this.dao.run(`DELETE FROM users WHERE id = ?`, [id]);
  }

  getUsers(ids) {
    let sql = `SELECT * FROM users where id IN(${ids
      .map(function () {
        return "?";
      })
      .join(",")})`;
    return this.dao.all(sql, ids);
  }

  getUserById(id) {
    return this.dao.get(`SELECT * FROM users WHERE id = ?`, [id]);
  }

  getAllUsers() {
    return this.dao.all("SELECT * FROM users");
  }

  getUsersCount() {
    return this.dao.all("SELECT Count(id) FROM users");
  }

  createNotificationsTable() {
    const sql = `CREATE TABLE IF NOT EXISTS notifications(id INTEGER PRIMARY KEY, message, user_id INTEGER NOT NULL, FOREIGN KEY (user_id) REFERENCES users (id) )`;
    return this.dao.run(sql);
  }

  createNotification(message, user_id) {
    return this.dao.run(
      "INSERT INTO notifications(message, user_id) VALUES (?,?)",
      [message, user_id]
    );
  }

  deleteNotification(id) {
    return this.dao.run(`DELETE FROM notifications WHERE id = ?`, [id]);
  }

  getAllNotifications() {
    return this.dao.all("SELECT * FROM notifications");
  }

  async seedUsersData() {
    this.getUsersCount().then(async(cnt) => {
      if(cnt === 0){
        const users = JSON.parse(
          await fs.readFile("./seeds/users.json", { encoding: "utf8" })
        );
        users.forEach((user) => {
          this.createUser(user.name, user.email).catch((err) => {
            console.log(err);
          });
        });
      }
    });
  }
}

module.exports = UserRepository;
