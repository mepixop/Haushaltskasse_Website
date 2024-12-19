import firebaseConfig from "./config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const logoutBtn = document.getElementById('logout-btn');

// Logout-Event-Listener
logoutBtn.addEventListener('click', () => {
    signOut(auth)
      .then(() => {
        // Erfolgreiches Logout
        console.log('Logout erfolgreich');
        alert('Sie wurden erfolgreich ausgeloggt.');
        // Weiterleitung zur Login-Seite
        window.location.href = 'Index.html';
      })
      .catch((error) => {
        // Fehler beim Logout
        console.error('Fehler beim Logout:', error);
        alert('Logout fehlgeschlagen: ' + error.message);
      });
  });