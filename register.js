// Firebase initialisieren
import firebaseConfig from "./config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Elemente referenzieren
const registerForm = document.getElementById("register-form");

// Registrierung
registerForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Verhindert das Neuladen der Seite

  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  console.log(email, password);

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Erfolgreich registriert
      const user = userCredential.user;
      console.log("Registrierung erfolgreich:", user);
      window.location.href = "Entrytable.html";
    })
    .catch((error) => {
      // Fehlerbehandlung
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Fehler bei der Registrierung:", errorCode, errorMessage);
    });
});
