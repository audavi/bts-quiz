const { execFile } = require("child_process");

// Runs a ping against a user-supplied host.
function pingHost(userInput) {
  execFile("ping", ["-c", "1", userInput], (err, stdout) => {
    console.log(stdout);
  });
}

module.exports = { pingHost };
