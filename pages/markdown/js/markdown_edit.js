const textarea = document.getElementById('markdown');

// ページを表示する
async function displayPage() {
    // サーバーからMarkdownを読み込む
    try {
        const response = await fetch(`/markdown/load_markdown/${pathName}`);
        if (response.ok) {
            const markdownContent = await response.text();
            // console.log(marked.parse(markdownContent));
            textarea.value = markdownContent; // テキストエリアに反映
        } 
    } catch (error) {
        alert('エラーが発生しました。');
        console.error(error);
    }
}

// サーバーに保存する
textarea.addEventListener('input', async () => {
    const markdownContent = textarea.value;
    // サーバーにデータを送信
    try {
        const response = await fetch(`/markdown/save_markdown/${pathName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: markdownContent }),
        });
    } catch (error) {
        alert('エラーが発生しました。');
        console.error(error);
    }
});

// 初期表示
displayPage();

textarea.addEventListener('input', () => {
    const rect = textarea.getBoundingClientRect(); // テキストエリアの位置を取得
    const bottomSpace = window.innerHeight - rect.bottom; // テキストエリア下の余白を計算
    const cursorPosition = textarea.selectionEnd; // カーソル位置を取得

    // 行数を計算して、カーソルが下部付近にある場合のみスクロール
    const totalLines = textarea.value.split('\n').length; // カーソルの行数
    const NowLines = textarea.value.substr(0, cursorPosition).split('\n').length; // カーソルの行数
    
    if (NowLines > totalLines - 20) {
        if (bottomSpace < 100) { // 下の余白が100px未満ならスクロール
            window.scrollBy({
                top: 100 - bottomSpace, // 不足分スクロール
                behavior: 'smooth', // スムーズにスクロール
            });
        }
    }
});