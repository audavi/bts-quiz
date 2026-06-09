const { exec } = require("child_process");

// Runs a ping against a user-supplied host.
function pingHost(userInput) {
  // User input is concatenated directly into a shell command.
  exec("ping -c 1 " + userInput, (err, stdout) => {
    console.log(stdout);
  });
}

module.exports = { pingHost };
