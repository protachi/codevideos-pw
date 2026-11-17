class HttpClient {
  base = 'http://localhost:5000'

  cursoEndpoint = this.base + '/curso'

  async getCurso() {
    const response = await fetch(this.cursoEndpoint);
    
    if(!response.ok) {
      console.error("Erro ao tentar obter dados do curso. Status: ", response.status);
      return null;
    }

    return response.json();
  }

}

export const api = new HttpClient(); 