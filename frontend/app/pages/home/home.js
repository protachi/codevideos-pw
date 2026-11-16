export default () => {

  console.debug('Home JS works')

  const btn = document.getElementById('test-js');

  if(btn) {
    btn.addEventListener('click', e => {
     console.log('executando evento de clique no botão')
    })  
  }
  
};



