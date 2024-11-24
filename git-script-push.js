const simpleGit = require('simple-git');
// 作業ディレクトリを指定
const git = simpleGit();

const runGitCommands = async () => {
  try {
    // ステータスを確認
    const status = await git.status();

    if (status.isClean()) {
      console.log('変更はありません。');
      return;
    }

    // 1. ステージング
    await git.add('./*');
    console.log('変更をステージングしました。');

    // 2. コミット
    const commitMessage = '更新: ' + new Date().toISOString(); // 日時をコミットメッセージに追加
    await git.commit(commitMessage);
    console.log(`コミットしました: "${commitMessage}"`);

    // 3. プッシュ
    await git.push('origin', 'main'); // 必要に応じてブランチを変更
    console.log('変更をリモートリポジトリにプッシュしました。');
  } catch (error) {
    console.error('エラーが発生しました:', error);
  }
};

runGitCommands();