// a action no form por si só não seria suficiente por causa do envio do token
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#sipUploadForm');
    const logoutButton = document.querySelector('#logoutBtn');

    const token = localStorage.getItem('token');
    if (logoutButton) {
      if (!token) {
        logoutButton.style.display = "none";
      } else {
        logoutButton.addEventListener('click', (e) => {
          e.preventDefault();
          // Limpa o token e o tipo de utilizador
          localStorage.removeItem('token');
          localStorage.removeItem('userType');
          alert('Sessão terminada com sucesso!');
          window.location.href = '/auth/login';
        });
      }
    }

    if (!form) return;
  
    form.addEventListener('submit', async e => {
      e.preventDefault();
  
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Autenticação necessária!');
        return;
      }
  
      const formData = new FormData(form);
  
      console.log("Token:", token);
      console.log("FormData:", [...formData.entries()]);


      try {
        const response = await fetch('http://localhost:3000/items/files', {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + token // adiciona o token no cabeçalho Authorization
          },
          body: formData
        });

        const result = await response.json();
        if (response.ok) {
          alert('Sucesso : ' + (result));
          //alert('Item adicionado com sucesso!');
          window.location.href = '/';
        } else {
          alert('Erro: ' + (result.error || 'Erro desconhecido'));
        }
      } catch (err) {
        console.error('Erro ao enviar o ficheiro:', err);
        alert('Erro ao enviar o ficheiro.');
      }      
    });
  });
  