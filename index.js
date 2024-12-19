  import firebaseConfig from "./config.js";
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

const loginBtn = document.getElementById('login-btn');

loginBtn.addEventListener('click', (event) => {
  event.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('Login erfolgreich:', user);
      alert('Willkommen, ' + user.email);
      window.location.href = 'Entrytable.html';
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Fehler beim Einloggen:', errorCode, errorMessage);
      alert('Login fehlgeschlagen: ' + errorMessage);
    });
});