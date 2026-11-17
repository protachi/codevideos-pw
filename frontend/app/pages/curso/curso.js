import { router } from "../../core/router.js";
import { api } from "../../core/http.js";

export default async function init() {
  //busca os dados do curso
  const curso = await carregarInfoCurso();
  
  console.log('aquiii')
  //atualiza o html
  atualizarDadosPagina(curso);
  
  //adiciona os listeners de clique dos links
  addLessonLinkListener();
}

async function carregarInfoCurso() {
  //busca no localstorage
  const dadosCurso = localStorage.getItem('curso-data');

  if (dadosCurso) {
    return JSON.parse(dadosCurso);
  }

  //se não tem no localstorage, busca na api e salva local
  const curso = await api.getCurso();

  if (!curso) {
    const page = document.getElementById('page-curso');

    page.innerHTML = `<h1>Não foi possível obter o curso</h1>`;
    return null;
  }

  localStorage.setItem('curso-data', JSON.stringify(curso));

  return curso;
}

function atualizarDadosPagina(curso) {
  // seta o título principal do curso
  const tituloCurso = document.getElementById('titulo-curso');
  tituloCurso.textContent = curso.titulo;

  // limpa o conteúdo estático de exemplo e prepara o container
  const conteudoCurso = document.querySelector('.conteudo-curso');
  conteudoCurso.innerHTML = '';

  // percorre as seções do curso
  curso.secoes.forEach(secao => {
    const sectionEl = document.createElement('section');
    sectionEl.className = 'topico card';


    let cont = 0;

    // monta a lista dos links das aulas da seção
    const aulasHtml = secao.aulas.map(aula => {
    cont += 1;

    return `
      <a class="link-aula aula card" href="/aula" data-page data-lesson-id="${aula.id}">
        <div class="">
          <h3 class="titulo">Aula ${cont}: ${aula.nome}</h3>
        </div>
      </a>
    `}).join('');
    

    // coloca o cabeçalho da seção + todas as aulas dentro dela
    sectionEl.innerHTML = `
      <header>
        <h2>${secao.titulo}</h2>
      </header>
      <div class="aulas">${aulasHtml}</div>      
    `;

    //insere no container html da página
    conteudoCurso.appendChild(sectionEl);
  });
}

function addLessonLinkListener() {
  const linksAulas = document.querySelectorAll('a.link-aula[data-page]');

  console.log(linksAulas)

  linksAulas.forEach(a => {
    a.addEventListener('click', e => {
      console.log('chegueei')

      e.preventDefault();

      sessionStorage.setItem('currentLessonId', 5);

      router.navigateTo('/aula');
    });
  })
}