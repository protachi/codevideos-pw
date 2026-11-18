import {router} from '../../core/router.js';

export default
  function init() {
  const container = document.querySelector('#page-login.container');
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

  form.addEventListener("submit", async function (event) {
    event.preventDefault();


    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const cpf = document.getElementById("cpf").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmar-senha").value;
    


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
      const resposta = await fetch("http://localhost:5000/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoUsuario)
      });
      
      if (!resposta.ok) {
        erro.textContent = "Erro ao cadastrar. Tente novamente.";
        return;
      }
      
      const usuarioCriado = await resposta.json();


      const usuarioLogado = {
        id: usuarioCriado.id,
        nome: usuarioCriado.nome,
        email: usuarioCriado.email,
        picture: usuarioCriado.picture
      };
      localStorage.setItem("usuario", JSON.stringify(usuarioLogado));


      router.navigateTo('/sucesso');

    } catch (e) {
      erro.textContent = "Não foi possível conectar ao servidor.";
    }
  });
  
  //login
  const formLogin = document.getElementById("form-login");
  const erroLogin = document.getElementById("erro-login");

  formLogin.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const senha = document.getElementById("login-senha").value;


    if (!email || !senha) {
      erroLogin.textContent = "Preencha e-mail e senha.";
      return;
    }

    erroLogin.textContent = "";

    try {

      const url =
        "http://localhost:3001/usuarios?email=" + encodeURIComponent(email) +
        "&senha=" + encodeURIComponent(senha);

      const resposta = await fetch(url); // GET (padrão)

      if (!resposta.ok) {
        erroLogin.textContent = "Erro ao fazer login. Tente novamente.";
        return;
      }


      const usuarios = await resposta.json();

      if (usuarios.length === 0) {
        erroLogin.textContent = "E-mail ou senha incorretos.";
        return;
      }

      const usuario = usuarios[0];
      console.log("Login ok:", usuario);



    } catch (e) {
      erroLogin.textContent = "Não foi possível conectar ao servidor.";
    }
  });
}

