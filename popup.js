document.getElementById("commit").addEventListener("click", async () => {
  const repo = document.getElementById("repo").value;
  const filename = document.getElementById("filename").value;
  const token = "YOUR_GITHUB_PERSONAL_ACCESS_TOKEN"; // User must replace this

  if (!repo || !filename) {
    document.getElementById("status").innerText = "⚠️ Enter repo and filename!";
    return;
  }

  const fileContent = JSON.stringify(
    { date: new Date().toISOString() },
    null,
    2
  );
  const fileContentBase64 = btoa(fileContent); // Convert to Base64 for GitHub API

  const commitMessage = `Automated commit on ${new Date().toISOString()}`;
  const url = `https://api.github.com/repos/${repo}/contents/${filename}`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: commitMessage,
        content: fileContentBase64,
      }),
    });

    if (response.ok) {
      document.getElementById("status").innerText = "✅ Commit Successful!";
    } else {
      document.getElementById("status").innerText = "❌ Commit Failed!";
    }
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("status").innerText = "❌ Error making commit!";
  }
});
