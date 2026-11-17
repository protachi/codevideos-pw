
const container = document.querySelector('.container');
const cadastroBtn = document.querySelector('.cadastro-btn');
const loginBtn = document.querySelector('.login-btn');

cadastroBtn.addEventListener('click', () => {
  container.classList.add('active');
});

loginBtn.addEventListener('click', () => {
  container.classList.remove('active');
});

//cadastro

const form = document.getElementById("form-cadastro");
const erro = document.getElementById("erro");

async function cadastrarUsuario(novoUsuario) {
  const resposta = await fetch("http://localhost:3001/usuarios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(novoUsuario)
  });

  if (!resposta.ok) {
    throw new Error("Erro ao cadastrar. Tente novamente.");
  }

  return await resposta.json();
}

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const cpf = document.getElementById("cpf").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const senha = document.getElementById("senha").value;
  const confirmarSenha = document.getElementById("confirmar-senha").value;
  const termos = document.getElementById("term").checked;

  
  if (!nome || !email || !cpf || !telefone || !senha || !confirmarSenha) {
    erro.textContent = "Preencha todos os campos.";
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    erro.textContent = "Digite um e-mail válido.";
    return;
  }

  if (cpf.length !== 11) {
    erro.textContent = "O CPF precisa ter 11 números.";
    return;
  }

  if (senha.length < 6) {
    erro.textContent = "A senha precisa ter pelo menos 6 caracteres.";
    return;
  }

  if (senha !== confirmarSenha) {
    erro.textContent = "As senhas não são iguais.";
    return;
  }

  if (!termos) {
    erro.textContent = "Você precisa aceitar os Termos de Serviços.";
    return;
  }

  erro.textContent = "";

  
  const novoUsuario = {
    nome: nome,
    email: email,
    cpf: cpf,
    telefone: telefone,
    senha: senha,
    picture: "https://i.pravatar.cc/150?img=12"
  };

  
  try {
    const usuarioCriado = await cadastrarUsuario(novoUsuario);

    const usuarioLogado = {
      id: usuarioCriado.id,
      nome: usuarioCriado.nome,
      email: usuarioCriado.email,
      picture: usuarioCriado.picture
    };

    localStorage.setItem("usuario", JSON.stringify(usuarioLogado));

    router.navigateTo("/sucesso");

  } catch (e) {
    erro.textContent = e.message;
  }
});

//login

const formLogin = document.getElementById("form-login");
const erroLogin = document.getElementById("erro-login");


function validarLogin(email, senha) {
  if (!email || !senha) {
    return "Preencha e-mail e senha.";
  }

  return null;
}

n
async function login(email, senha) {
  const url =
    "http://localhost:3001/usuarios?email=" +
    encodeURIComponent(email) +
    "&senha=" +
    encodeURIComponent(senha);

  const resposta = await fetch(url);

  if (!resposta.ok) {
    throw new Error("Erro ao fazer login. Tente novamente.");
  }

  const usuarios = await resposta.json();

  if (usuarios.length === 0) {
    throw new Error("E-mail ou senha incorretos.");
  }

  return usuarios[0];
}


formLogin.addEventListener("submit", async function (event) {
  event.preventDefault();

  const email = document.getElementById("login-email").value.trim();
  const senha = document.getElementById("login-senha").value;

 
  const erro = validarLogin(email, senha);

  if (erro) {
    erroLogin.textContent = erro;
    return;
  }

  erroLogin.textContent = "";

  try {
   
    const usuario = await login(email, senha);

    console.log("Login ok:", usuario);

  } catch (e) {
    erroLogin.textContent = e.message;
  }
});
