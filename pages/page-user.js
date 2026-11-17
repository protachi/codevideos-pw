alert(document.getElementById("btn-confirmar-senha") + " | " + document.getElementById("senha") + " | " + document.getElementById("edt-username"));

const btnAlterarSenha = document.getElementById("btn-confirmar-senha");
const secaoSenha = document.getElementById("senha");

btnAlterarSenha.addEventListener("click", function () {
    secaoSenha.hidden = !secaoSenha.hidden;
});

const spanNome = document.getElementById("username");
const btnEditarNome = document.getElementById("edt-username");
let campoNome = null;

btnEditarNome.addEventListener("click", function () {
    if (campoNome === null) {
        campoNome = document.createElement("input");
        campoNome.type = "text";
        campoNome.value = spanNome.textContent;
        spanNome.replaceWith(campoNome);
        campoNome.focus();
        btnEditarNome.textContent = "editar";
    } else {
        const novoNome = campoNome.value.trim();
        if (novoNome !== "") {
            spanNome.textContent = novoNome;
        }
        campoNome.replaceWith(spanNome);
        campoNome = null;
        btnEditarNome.textContent = "";
    }
});

const formSenha = document.querySelector("#senha form");

formSenha.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const senhaAtual = document.getElementById("senha-atual").value;
    const novaSenha = document.getElementById("senha-nova").value;
    const confirmarSenha = document.getElementById("confirmar-senha").value;

    if (senhaAtual === "" || novaSenha === "" || confirmarSenha === "") {
        alert("Preencha todos os campos.");
        return;
    }

    if (novaSenha !== confirmarSenha) {
        alert("A nova senha e a confirmação precisam ser iguais.");
        return;
    }

    alert("Senha alterada com sucesso!");

    formSenha.reset();
    secaoSenha.hidden = true;
});

const featuresFeitas = 5;
const featuresTotal = 10;
const porcentagem = (featuresFeitas / featuresTotal) * 100;

document.getElementById("barra-progresso").value = porcentagem;
document.getElementById("porcentagem").textContent = porcentagem + "%";
document.getElementById("features").textContent = featuresFeitas + "/" + featuresTotal;
