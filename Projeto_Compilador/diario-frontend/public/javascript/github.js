window.addEventListener("DOMContentLoaded", () => {
    // Apanhar token do GitHub na URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
  
    if (token) {
      // Guardar no localStorage
      localStorage.setItem("token", token);
  
      // Limpar URL
      window.history.replaceState({}, document.title, "/");
  
      alert("Login com GitHub efetuado com sucesso!");
      window.location.href = "/";
    }
  
    // Formulário de login local
    const loginForm = document.querySelector('form[action="http://localhost:3000/utilizadores/login"]');
    if (loginForm) {
      loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = loginForm.username.value;
        const password = loginForm.password.value;
  
        const res = await fetch('http://localhost:3000/utilizadores/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ username, password })
        });
  
        const data = await res.json();
  
        if (res.ok) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('userType', data.perfil);
          alert('Login efetuado com sucesso!');
          window.location.href = '/';
        } else {
          alert(data.error || 'Erro ao fazer login.');
        }
      });
    }
  
    // Formulário de registo (se existir)
    const registerForm = document.querySelector('form[action="http://localhost:3000/utilizadores/register"]');
    if (registerForm) {
      registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
  
        const formData = new URLSearchParams({
          _id: registerForm._id.value,
          nome: registerForm.nome.value,
          email: registerForm.email.value,
          perfil: 'produtor',
          password: registerForm.password.value
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
          alert('Erro ao registar: ' + (data.error || 'Erro desconhecido'));
        }
      });
    }
  });
  