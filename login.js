import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAKXrxWXEr-8Kg3OOyj4NnFK_e4I5tpeRw",
  authDomain: "centraismaisenergia.firebaseapp.com",
  projectId: "centraismaisenergia",
  storageBucket: "centraismaisenergia.appspot.com",
  messagingSenderId: "39890355306",
  appId: "1:39890355306:web:3edcac8637e77e062c7613",
  measurementId: "G-0F2T0027X4",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginContainer = document.getElementById("login-container");
const appContainer = document.getElementById("app-container");
const loginButton = document.getElementById("login-button");
const logoutButton = document.getElementById("logout-button");
const resetPasswordLink = document.getElementById("reset-password-link");
const errorElement = document.getElementById("error");

const loginHandler = async () => {
  const email = document.getElementById("email").value;
  const passwordInput = document.getElementById("password"); // Captura o elemento do campo de senha
  const password = passwordInput.value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    errorElement.textContent = "";
  } catch (error) {
    // Limpa o campo de senha em caso de erro
    passwordInput.value = "";

    if (error.code === "auth/wrong-password") {
      errorElement.textContent = "Senha incorreta.";
    } else if (error.code === "auth/user-not-found") {
      errorElement.textContent = "Usuário não encontrado.";
    } else {
      errorElement.textContent = "Erro: " + error.message;
    }
  }
};

loginButton.addEventListener("click", loginHandler);
document.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    loginHandler();
  }
});

resetPasswordLink.addEventListener("click", async () => {
  const email = prompt("Insira seu e-mail para redefinir a senha:");
  if (email) {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("E-mail de redefinição de senha enviado com sucesso.");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        errorElement.textContent = "E-mail não cadastrado.";
      } else {
        errorElement.textContent = "Erro ao enviar e-mail: " + error.message;
      }
    }
  }
});

logoutButton.addEventListener("click", async () => {
  await signOut(auth);
  appContainer.style.display = "none";
  loginContainer.style.display = "block";
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    loginContainer.style.display = "none";
    appContainer.style.display = "block";
    carregarDados();
  } else {
    loginContainer.style.display = "block";
    appContainer.style.display = "none";
  }
});

const carregarDados = () => {
  console.log("Carregando dados...");
  // Aqui você pode adicionar a lógica para carregar dados específicos das centrais
};
