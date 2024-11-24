const preview = document.getElementById('preview');

// ページを表示する
async function displayPage() {
    // サーバーからMarkdownを読み込む
    try {
        const response = await fetch(`/markdown/load_markdown/${pathName}`);
        if (response.ok) {
            const markdownContent = await response.text();
            // console.log(marked.parse(markdownContent));
            preview.innerHTML = marked.parse(markdownContent); // プレビューにも反映
            // alert('サーバーからMarkdownを読み込みました！');
        } 
    } catch (error) {
        alert('エラーが発生しました。');
        console.error(error);
    }
}

// 初期表示
displayPage();