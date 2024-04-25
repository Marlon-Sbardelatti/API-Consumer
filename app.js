const PORT = "http://127.0.0.1:8000/";
const authToken = "bWFybG9uQGdtYWlsLmNvbTptYXJsb24xMjM0";

function getAllUsers(event) {
    const path = PORT + "users";

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
        })
        .catch((error) => {
            console.error("Error:", error);
        });
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
            alert("Usuário criado com sucesso!");
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
            alert("Usuário encontrado com sucesso!");
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
        })
        .catch((error) => {
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
            alert("Usuário atualizado com sucesso!");
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

//Render functions

function renderGetAll(data) {
    let table = document
        .getElementById("result-getAll")
        .getElementsByTagName(table)[0];
    console.log(table);
}
