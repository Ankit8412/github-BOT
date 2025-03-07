const jsonfile = require("jsonfile");
const moment = require("moment");
const simpleGit = require("simple-git");
const random = require("random");

const git = simpleGit();
const FILE_PATH = "./data.json";

const makeCommit = (count) => {
  if (count <= 0) {
    console.log("✅ All commits done!");
    return;
  }

  const daysAgo = random.int(0, 365); // Select a random past day within a year
  const DATE = moment().subtract(daysAgo, "days").format(); // Format the timestamp

  const data = { date: DATE };

  jsonfile.writeFile(FILE_PATH, data, () => {
    git
      .add([FILE_PATH])
      .commit(DATE, { "--date": DATE }) // Commit with a backdated timestamp
      .push()
      .then(() => {
        console.log(`📌 Commit ${901 - count}/900 done on ${DATE}`);
        makeCommit(count - 1); // Recursively call for the next commit
      })
      .catch((err) => console.error("❌ Error pushing commit:", err));
  });
};

// Start with 900 commits
makeCommit(900);
