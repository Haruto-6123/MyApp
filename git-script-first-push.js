const simpleGit = require('simple-git');

// 作業ディレクトリを指定
const git = simpleGit();

const runGitCommands = async () => {
  try {
    // 1. リポジトリを初期化
    await git.init();
    console.log('リポジトリを初期化しました');

    // 2. リモートリポジトリを追加
    await git.addRemote('origin', 'https://github.com/Haruto-6123/MyApp.git');
    console.log('リモートリポジトリを追加しました');

    // 3. ファイルをステージング
    await git.add('./*');
    console.log('すべてのファイルをステージングしました');

    // 4. コミット
    await git.commit('初回コミット');
    console.log('コミットしました');

    // 5. プッシュ
    await git.push('origin', 'main'); // mainブランチにプッシュ
    console.log('リモートリポジトリにプッシュしました');
  } catch (error) {
    console.error('エラーが発生しました:', error);
  }
};

runGitCommands();
