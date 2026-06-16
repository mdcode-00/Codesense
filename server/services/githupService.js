import axios from 'axios';

const getPRDDiff = async (token, repo, prNumber) => {
  const cleanRepo = repo.trim();
  const [owner, repoName] = cleanRepo.split("/");

  // console.log("Fetching PR diff:", owner, repoName, prNumber);
  // console.log("Using token:", token ? "Provided" : "Not provided");

  const response = await axios.get(
    `https://api.github.com/repos/${owner}/${repoName}/pulls/${prNumber}/files`,
    {
      headers: {
        Authorization: `token ${token}`, 
        Accept: "application/vnd.github+json", 
      }
    }
  );

  const files = response.data;

  const diffText = files
    .map(file =>
      `File: ${file.filename}\n${file.patch || "Binary file, no diff"}`
    )
    .join("\n\n---\n\n");

  return diffText;
};

export default getPRDDiff;