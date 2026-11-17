export default
function init() {

  const aulaID = getLessonId();

  if(!aulaID) {
    const page = document.getElementById('page-aula');

    page.innerHTML = `<h1>Erro ao tentar obter a lição!</h1>`;
  }

  const lesson = getLessonData(aulaID);

  if(!lesson) {
    const page = document.getElementById('page-aula');

    page.innerHTML = `<h1>Erro ao tentar obter a lição!</h1>`;
  }

  //TO-DO

}

function getLessonId() {
  return parseInt(sessionStorage.getItem('currentLessonId'));
}

function getLessonData(lessonId){

}