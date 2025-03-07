const jsonfile = require("jsonfile");
const moment = require("moment");
const simpleGit = require("simple-git");

const git = simpleGit();
const FILE_PATH = "./data.json";

const makeCommit = async (count) => {
  if (count <= 0) {
    console.log("✅ All commits done!");
    return;
  }

  const { default: randomInt } = await import("random-int");
  const daysAgo = randomInt(0, 365);
  const DATE = moment().subtract(daysAgo, "days").format();

  const data = { date: DATE };

  jsonfile.writeFile(FILE_PATH, data, () => {
    git
      .add([FILE_PATH])
      .commit(DATE, { "--date": DATE })
      .push()
      .then(() => {
        console.log(`📌 Commit ${901 - count}/900 done on ${DATE}`);
        makeCommit(count - 1);
      })
      .catch((err) => console.error("❌ Error pushing commit:", err));
  });
};

// Start with 900 commits
makeCommit(900);
