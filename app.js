const PORT = "http://127.0.0.1:8000/";
const authToken = "bWFybG9uQGdtYWlsLmNvbTptYXJsb24xMjM0";

async function getAllUsers(event) {
    try {
        const path = PORT + "users";
        const res = await fetch(path);

        if (!res.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await res.json();
        console.log(data);
        let table = document.getElementById("my-table");
        let tbody = table.getElementsByTagName("tbody")[0];
        tbody.innerHTML = "";
        for (const user of data) {
            let tr = document.createElement("tr");
            let id = document.createElement("td");
            id.innerText = user.id;
            let nome = document.createElement("td");
            nome.innerText = user.name;
            let email = document.createElement("td");
            email.innerText = user.email;
            let created = document.createElement("td");
            created.innerText = user.created_at;
            tr.appendChild(id);
            tr.appendChild(nome);
            tr.appendChild(email);
            tr.appendChild(created);
            tbody.appendChild(tr);
        }
    } catch (error) {
        console.log("Error: ", error);
    }
}

function createUser(event) {
    const path = PORT + "users";

    let inputs = document
        .getElementById("user-form")
        .getElementsByTagName("input");

    for (const input of inputs) {
        if (input.value == null || input.value == undefined || input.value == "") {
            alert("Preencha todos os campos");
            return;
        }
    }

    let nome = inputs[0].value;
    let email = inputs[1].value;
    let senha = inputs[2].value;

    const userData = {
        name: nome,
        email: email,
        password: senha,
    };

    fetch(path, {
        method: "POST",
        headers: {
            Authorization: `Basic ${authToken}`,
            "Content-Type": "application/json",
        },

        body: JSON.stringify(userData),
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
            return res.json();
        })
        .then((data) => {
            console.log(data);

            let container = document.getElementsByClassName("result-criar")[0];
            let h3s = container.getElementsByTagName("h3");
            h3s[0].innerText = "ID: " + data.id;
            h3s[1].innerText = "Nome: " + data.name;
            h3s[2].innerText = "Email: " + data.email;
            h3s[3].innerText = "Data de Criacão: " + data.created_at;
            container.setAttribute("style", "display: block");

            alert("Usuário criado com sucesso!");
            getAllUsers();
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

function getUserByID(event) {
    let userID = document.getElementById("user-id-input").value;
    if (userID == null || userID == "" || userID == undefined) {
        alert("Preencha todos os campos");
        return;
    }

    let path = PORT + `users/${userID}`;

    fetch(path, {
        headers: {
            Authorization: `Basic ${authToken}`,
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);

            let container = document.getElementsByClassName("result-get-id")[0];
            let h3s = container.getElementsByTagName("h3");
            h3s[0].innerText = "ID: " + data.id;
            h3s[1].innerText = "Nome: " + data.name;
            h3s[2].innerText = "Email: " + data.email;
            h3s[3].innerText = "Data de Criacão: " + data.created_at;
            container.setAttribute("style", "display: block");

            alert("Usuário encontrado com sucesso!");
            getAllUsers();
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

function deleteUser(event) {
    let userID = document.getElementById("delete-user-id-input").value;
    if (userID == null || userID == "" || userID == undefined) {
        alert("Preencha todos os campos");
        return;
    }

    let path = PORT + `users/${userID}`;

    fetch(path, {
        method: "DELETE",
        headers: {
            Authorization: `Basic ${authToken}`,
        },
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
            return res.json();
        })
        .then((data) => {
            console.log(data);
            alert("Usuário deletado com sucesso!");
            document.getElementById("delete-user-id-input").value = "";
            getAllUsers();
        })
        .catch((error) => {
            alert("Usuário não encontrado");
            document.getElementById("delete-user-id-input").value = "";
            console.error("Error:", error);
        });
}

function searchUser() {
    let userID = document.getElementById("update-user-id-input").value;
    if (userID == null || userID == "" || userID == undefined) {
        alert("Preencha todos os campos");
        return;
    }

    let path = PORT + `users/${userID}`;

    fetch(path, {
        headers: {
            Authorization: `Basic ${authToken}`,
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            updateUser();
        })
        .catch((error) => {
            alert("Usuário não encontrado");
            console.error("Error:", error);
        });
}

function updateUser(event) {
    let userID = document.getElementById("update-user-id-input").value;
    if (userID == null || userID == "" || userID == undefined) {
        alert("Preencha todos os campos");
        return;
    }

    let path = PORT + `users/${userID}`;

    let inputs = document
        .getElementById("update-user-form")
        .getElementsByTagName("input");

    for (const input of inputs) {
        if (input.value == null || input.value == undefined || input.value == "") {
            alert("Preencha todos os campos");
            return;
        }
    }

    let nome = inputs[0].value;
    let email = inputs[1].value;
    let senha = inputs[2].value;

    const userData = {
        name: nome,
        email: email,
        password: senha,
    };

    fetch(path, {
        method: "PUT",
        headers: {
            Authorization: `Basic ${authToken}`,
            "Content-Type": "application/json",
        },

        body: JSON.stringify(userData),
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
            return res.json();
        })
        .then((data) => {
            console.log(data);

            let container = document.getElementsByClassName("result-update")[0];
            let h3s = container.getElementsByTagName("h3");
            h3s[0].innerText = "ID: " + data.id;
            h3s[1].innerText = "Nome: " + data.name;
            h3s[2].innerText = "Email: " + data.email;
            h3s[3].innerText = "Data de Criacão: " + data.created_at;
            container.setAttribute("style", "display: block");

            alert("Usuário atualizado com sucesso!");
            getAllUsers();
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

function clearTable() {
    let table = document.getElementById("my-table");
    let tbody = table.getElementsByTagName("tbody")[0];
    tbody.innerHTML = "";
}
function clearCreated() {
    document.getElementsByClassName("result-criar")[0].innerHTML = "";
    let inputs = document
        .getElementById("user-form")
        .getElementsByTagName("input");
    inputs[0].value = "";
    inputs[1].value = "";
    inputs[2].value = "";
}

function clearUpdate() {
    document.getElementsByClassName("result-update")[0].innerHTML = "";
    let inputs = document
        .getElementById("update-user-form")
        .getElementsByTagName("input");
    inputs[0].value = "";
    inputs[1].value = "";
    inputs[2].value = "";
}

function clearID() {
    document.getElementsByClassName("result-get-id")[0].innerHTML = "";
    document.getElementById("user-id-input").value = "";
}
