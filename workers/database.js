const sqlite3 = require("sqlite3").verbose();
const AppDAO = require("../dao");

const UserRepository = require("../repositories/user_repository");

class DatabaseWorker {
    
  constructor() {
    this.dao = new AppDAO("./notifications.db");
    this.userRepo = new UserRepository(this.dao);
  }

  addNotification(users_ids, message) {
    users_ids.forEach((id) => {
      this.userRepo
        .createNotification(message, id)
        .then(() =>
          console.log(`meesage ${message} added to user with id=${id} added.`)
        );
    });
  }

}

var Singleton = (function () {
  var instance;

  function createInstance() {
      var object = new DatabaseWorker();
      return object;
  }

  return {
      getInstance: function () {
          if (!instance) {
              instance = createInstance();
          }
          return instance;
      }
  };
})();


module.exports = Singleton.getInstance();