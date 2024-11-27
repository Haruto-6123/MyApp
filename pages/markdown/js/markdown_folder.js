const table = document.getElementById("table");

function editFolderName(button) {
    table.querySelectorAll("td").forEach(cell => {
        if (cell.id == button.value) {
            const currentValue = cell.textContent;
            cell.innerHTML = `<input type="text" id="editFolderName" value="${currentValue}">`;
            cell.classList.remove("name");
            cell.classList.add("edit-mode");
            button.disabled = true;
        }
        if (cell.classList == "operate-wrapper") {
            cell.querySelectorAll(".operate button").forEach(btn => {
                if (btn.id == "done" && btn.value == button.value) {
                    btn.disabled = false;
                }
            });
        }
    });
}

function saveFolderName(button) {
    table.querySelectorAll("td").forEach(cell => {
        if (cell.id == button.value) {
            cell.querySelectorAll(".edit-mode input").forEach(input => {
                const value = input.value;
                input.parentElement.textContent = value;
                postFolderName(button.value, value);
            });
            cell.classList.remove("edit-mode");
            cell.classList.add("name");
            button.disabled = true;
        }
        if (cell.classList == "operate-wrapper") {
            cell.querySelectorAll(".operate button").forEach(btn => {
                if (btn.id == "edit" && btn.value == button.value) {
                    btn.disabled = false;
                }
            });
        }
    });
}

async function postFolderName(id, name) {
    try {
        const response = await fetch(`/markdown/edit_file/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: name }),
        });
    } catch (error) {
        alert('エラーが発生しました。');
        console.error(error);
    }
}