const table = document.getElementById("table");

function editPerson(button) {
    table.querySelectorAll("td").forEach(cell => {
        if (cell.id == button.value) {
            const currentValue = cell.textContent;
            switch (cell.className) {
                case "date" :
                    cell.innerHTML = `<input type="date" id="editDate" value="${currentValue}">`;
                    cell.classList.remove("date");
                    cell.classList.add("edit-mode-date");
                    break;
                case "name" :
                    cell.innerHTML = `<input type="name" id="editName" value="${currentValue}">`;
                    cell.classList.remove("name");
                    cell.classList.add("edit-mode-name");
                    break;
                case "place" :
                    cell.innerHTML = `<input type="name" id="editplace" value="${currentValue}">`;
                    cell.classList.remove("place");
                    cell.classList.add("edit-mode-place");
                    break;
                case "impression" :
                    cell.innerHTML = `<input type="impression" id="editImpression" value="${currentValue}">`;
                    cell.classList.remove("impression");
                    cell.classList.add("edit-mode-impression");
                    break;
                case "memo" :
                    cell.innerHTML = `<input type="memo" id="editMemo" value="${currentValue}">`;
                    cell.classList.remove("memo");
                    cell.classList.add("edit-mode-memo");
                    break;
            }
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

function savePerson(button) {
    table.querySelectorAll("td").forEach(cell => {
        if (cell.id == button.value) {
            cell.querySelectorAll(`.${cell.className} input`).forEach(input => {
                const value = input.value;
                input.parentElement.textContent = value;
            });
            switch (cell.className) {
                case "edit-mode-date" :
                    cell.classList.remove("edit-mode-date");
                    cell.classList.add("date");
                    break;
                case "edit-mode-name" :
                    cell.classList.remove("edit-mode-name");
                    cell.classList.add("name");
                    break;
                case "edit-mode-place" :
                    cell.classList.remove("edit-mode-place");
                    cell.classList.add("place");
                    break;
                case "edit-mode-impression" :
                    cell.classList.remove("edit-mode-impression");
                    cell.classList.add("impression");
                    break;
                case "edit-mode-memo" :
                    cell.classList.remove("edit-mode-memo");
                    cell.classList.add("memo");
                    break;
            }
            postPerson(`${cell.id}`, `${cell.textContent}`, `${cell.className}`);
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

async function postPerson(id, value, column) {
    try {
        const response = await fetch(`/person/edit_person/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ value: value, column: column }),
        });
    } catch (error) {
        alert('エラーが発生しました。');
        console.error(error);
    }
}