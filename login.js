/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


// ========================
//   MOSTRAR USUARIO LOGEADO
// ========================

// Verificar si hay usuario guardado
document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("login-btn");
    const userNameSpan = document.getElementById("user-name");

    const usuario = localStorage.getItem("usuario");

    if (usuario) {
        // Ocultar botón de login
        if (loginBtn) loginBtn.style.display = "none";

        // Mostrar nombre del usuario
        if (userNameSpan) {
            userNameSpan.style.display = "inline-block";
            userNameSpan.textContent = "👤 " + usuario;
            userNameSpan.style.color = "var(--main-color)";
            userNameSpan.style.fontWeight = "600";
            userNameSpan.style.marginLeft = "15px";
            userNameSpan.style.cursor = "pointer";
        }
    }
});


// ========================
//   PROCESAR FORMULARIO LOGIN
// ========================

const formLogin = document.querySelector(".form-box form");

if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
        e.preventDefault();

        // Obtener valores
        const inputs = formLogin.querySelectorAll("input");
        const usuario = inputs[0].value;

        // Guardar en localStorage
        localStorage.setItem("usuario", usuario);

        // Redirigir al home
        window.location.href = "index.html";
    });
}
