document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('form[action="http://localhost:3000/utilizadores/login"]');
  const registerForm = document.querySelector('form[action="http://localhost:3000/utilizadores/register"]');

  if (loginForm) {
    console.log('Formulário de login encontrado');
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const _id = loginForm.username.value;
      const password = loginForm.password.value;
      
      console.log('ID:', _id);
      console.log('Password:', password);

      // Envia a solicitação de login para o backend
      const res = await fetch('http://localhost:3000/utilizadores/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ username: _id, password }),
      });

      const data = await res.json();

      if (res.ok) {
        const token = data.token; 
        localStorage.setItem('token', token);
        const userType = data.perfil;
        localStorage.setItem('userType', userType);
        alert('Login efetuado com sucesso!');
        window.location.href = '/';
      } else {
        alert(data.error || 'Erro ao fazer login.');
      }
    });
  }

  if (registerForm) {
    console.log('Formulário de registo encontrado');
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      try {
        const formData = new URLSearchParams({
          _id: registerForm._id.value,
          nome: registerForm.nome.value,
          email: registerForm.email.value,
          perfil: 'produtor',
          password: registerForm.password.value,
        });

        const res = await fetch('http://localhost:3000/utilizadores/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: formData
        });

        const data = await res.json();  

        if (res.ok) {
          alert('Registo feito com sucesso. Podes agora iniciar sessão.');
          window.location.href = '/auth/login'; 
        } else {
          alert('Erro ao registar: ' + data.error || 'Erro desconhecido');
        }

      } catch(err) {
        console.error('Erro na requisição:', err);
        alert('Erro inesperado ao submeter o formulário.');
      }
    });
  }
});
