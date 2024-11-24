const simpleGit = require('simple-git');
const git = simpleGit();

const runGitCommands = async () => {
  try {
    // リポジトリを初期化
    await git.init();
    console.log('リポジトリを初期化しました');

    // ステータスを取得
    const status = await git.status();
    console.log('現在のステータス:', status);
  } catch (error) {
    console.error('エラーが発生しました:', error);
  }
};

runGitCommands();