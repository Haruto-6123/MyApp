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