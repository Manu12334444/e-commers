fetch("./usuarios.json")
  .then((response) => response.json())
  .then((data) => {
    console.log("hola");
    new DataTable("#usuariosTable", {
      data,
      columns: [
        { data: "nombres" },
        { data: "apellidos" },
        { data: "correo" },
        { data: "direccion" },
        { data: "telefono" },
          
      ],
      lengthMenu: [5, 10],
    });
  })
  .catch((error) => console.error("Error loading JSON:", error));
  
  // Modificado en el registro de usuario
registerForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  const registerEmailError = document.getElementById('registerEmailError');
  const registerPasswordError = document.getElementById('registerPasswordError');
  const confirmPasswordError = document.getElementById('confirmPasswordError');

  let valid = true;

  // Validaciones básicas
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  if (users.some(user => user.email === email) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      registerEmailError.style.display = 'block';
      valid = false;
  } else {
      registerEmailError.style.display = 'none';
  }

  if (password.length < 8) {
      registerPasswordError.style.display = 'block';
      valid = false;
  } else {
      registerPasswordError.style.display = 'none';
  }

  if (password !== confirmPassword) {
      confirmPasswordError.style.display = 'block';
      valid = false;
  } else {
      confirmPasswordError.style.display = 'none';
  }

  if (valid) {
      // Crear objeto de usuario con rol
      const role = email === 'admin@example.com' ? 'admin' : 'usuario';  // Puedes ajustar esta lógica para asignar roles según necesidad
      const usuario = { email, password, role };

      users.push(usuario);
      localStorage.setItem('users', JSON.stringify(users));
      alert('Registro exitoso. Ahora puedes iniciar sesión.');
      loginForm.style.display = 'block';
      registerForm.style.display = 'none';
      formTitle.textContent = 'Iniciar Sesión';
  }
});

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  const loginEmailError = document.getElementById('loginEmailError');
  const loginPasswordError = document.getElementById('loginPasswordError');

  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(user => user.email === email && user.password === password);

  if (user) {
      loginEmailError.style.display = 'none';
      loginPasswordError.style.display = 'none';
      alert('Inicio de sesión exitoso.');

      // Almacenar el usuario en sesión
      localStorage.setItem('currentUser', JSON.stringify(user));

      // Cambiar la vista según el rol
      if (user.role === 'admin') {
          window.location.href = 'admin.html';  // Vista para admin
      } else {
          window.location.href = 'usuario.html';  // Vista para usuarios regulares
      }
  } else {
      loginEmailError.style.display = 'block';
      loginPasswordError.style.display = 'block';
  }
});

