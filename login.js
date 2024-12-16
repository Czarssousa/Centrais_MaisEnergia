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
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    errorElement.textContent = "";
  } catch (error) {
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
const carregarDados = async () => {
  try {
    await buscarDados("dados", "https://centraismaisenergia.vercel.app/api/receber-dados", {
      pressao: { label: "Pressão", unit: "bar" },
      vazao: { label: "Vazão", unit: "ton/h" },
    });
    await buscarDados("geribamog", "https://centraismaisenergia.vercel.app/api/geribamog", {
      pressao: { label: "Pressão", unit: "bar" },
      vazao: { label: "Vazão", unit: "ton/h" },
    });
    await buscarDados("geribavap", "https://centraismaisenergia.vercel.app/api/geribavap", {
      pressao: { label: "Pressão", unit: "bar" },
      vazao: { label: "Vazão", unit: "ton/h" },
    });
    await buscarDados("bluetree", "https://centraismaisenergia.vercel.app/api/bluetree", {
      temperatura: { label: "Temperatura", unit: "°C" },
      tr: { label: "TR", unit: "" },
    });
    await buscarDados("sgai", "https://centraismaisenergia.vercel.app/api/sgai", {
      geracao: { label: "Potência", unit: "kW" },
      irradiacao: { label: "IR", unit: "W/m²" },
    });
    await buscarDados("sgaii", "https://centraismaisenergia.vercel.app/api/sgaii", {
      geracao: { label: "Potência", unit: "kW" },
      irradiacao: { label: "IR", unit: "W/m²" },
    });
    await buscarDados("sgaiii", "https://centraismaisenergia.vercel.app/api/sgaiii", {
      geracao: { label: "Potência", unit: "kW" },
      irradiacao: { label: "IR", unit: "W/m²" },
    });
    await buscarDados("lapi", "https://centraismaisenergia.vercel.app/api/lapi", {
      geracao: { label: "Potência", unit: "kW" },
      irradiacao: { label: "IR:", unit: "W/m²" },
    });
    await buscarDados("lapii", "https://centraismaisenergia.vercel.app/api/lapii", {
      geracao: { label: "Potência", unit: "kW" },
      irradiacao: { label: "IR", unit: "W/m²" },
    });
    await buscarDados("divii", "https://centraismaisenergia.vercel.app/api/divii", {
      geracao: { label: "Potência", unit: "kW" },
      irradiacao: { label: "IR", unit: "W/m²" },
    });
  } catch (error) {
    console.error("Erro ao carregar os dados:", error);
  }
};

const buscarDados = async (elementId, apiUrl, units) => {
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar os dados da API ${elementId}`);
    }

    const dados = await response.json();
    const elemento = document.getElementById(elementId);
    elemento.innerHTML = Object.entries(dados)
      .map(([key, value]) => {
        const label = units[key]?.label || key;
        const unit = units[key]?.unit || "";
        // Formata o valor com duas casas decimais, se for um número
        const formattedValue =
          typeof value === "number" ? value.toFixed(2) : value || "N/A";
        return `<p>${label}: ${formattedValue} ${unit}</p>`;
      })
      .join("");
  } catch (error) {
    const elemento = document.getElementById(elementId);
    elemento.textContent = `Erro: ${error.message}`;
  }
};


// Atualiza os dados automaticamente a cada 5 segundos
setInterval(carregarDados, 5000);
