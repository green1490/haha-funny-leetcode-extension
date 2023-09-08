// Gets information from background.js and displays it on popup.html
const possibleUnSolvedMessages = [
  'Another day, another LeetCode problem, so go solve it buddy',
  'One LeetCode problem a day keeps the unemployment away',
  'Welcome to your daily dose of LeetCode',
  'Never back down, Never what',
];
const possibleSolvedMessages = [
  'Bro you only solved one problem, chill out',
  'You survived another day of LeetCode, congrats',
  "You're one step closer to getting that job, keep it up",
  'The LeetCode Torture gods are pleased. Rest, for tomorrow brings a new challenge',
  'Solved your problem for the day, nice, go treat yourself',
];
const randomUnsolvedIndex = Math.floor(
  Math.random() * possibleUnSolvedMessages.length
);
const randomSolvedIndex = Math.floor(
  Math.random() * possibleSolvedMessages.length
);
const randomUnSolvedMessage = possibleUnSolvedMessages[randomUnsolvedIndex];
const randomSolvedMessage = possibleSolvedMessages[randomSolvedIndex];
const unsolvedDiv = document.getElementById('unsolved-message')!;
const solvedDiv = document.getElementById('solved-message')!;
unsolvedDiv.textContent = randomUnSolvedMessage;
solvedDiv.textContent = randomSolvedMessage;
chrome.runtime.sendMessage(
  { action: 'getProblemStatus' },
  async function (response) {
    const leetcodeName = document.getElementById('leetcode-problem-name');
    const leetcodeButton = document.getElementById('leetcode-problem-button');
    const questionMsg = document.querySelector('.question-of-day-msg');
    const result = await chrome.storage.local.get([
      'problemName',
      'problemURL',
      'leetCodeProblemSolved',
    ]);
    const currentLeetCodeProblemName = result.problemName;
    const currentLeetCodeProblemURL = result.problemURL;
    const leetcodeProblemSolved = result.leetCodeProblemSolved;
    (leetcodeButton as HTMLAnchorElement).href = currentLeetCodeProblemURL;
    leetcodeName!.textContent = currentLeetCodeProblemName;
    leetcodeButton!.addEventListener('click', function (event) {
      event.preventDefault();
      chrome.tabs.create({ url: (this as HTMLAnchorElement).href });
    });

    if (leetcodeProblemSolved || (response && response.problemSolved)) {
      unsolvedDiv.style.display = 'none';
      solvedDiv.style.display = 'block';
      leetcodeButton!.style.display = 'none';
      (questionMsg as HTMLElement).style!.display = 'none';
      leetcodeName!.textContent = `Today you solved ${currentLeetCodeProblemName}`;
    }
  }
);
