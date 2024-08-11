document.addEventListener("DOMContentLoaded", function () {
  const blackScreen = document.querySelector(".black-bars");
  const desktopDiv = document.querySelector(".desktop");
  const effectToggleButton = document.getElementById("effect-toggle");

  // Caso não tenha nada salvo em localStorage, salva os efeitos como ativado
  if (!localStorage.getItem("effect")) {
    localStorage.setItem("effect", "enabled");
  }

  // Ativa/desativa os efeitos baseado no localStorage
  const savedEffect = localStorage.getItem("effect");

  if (savedEffect === "enabled") {
    desktopDiv.classList.add("crt");
    blackScreen.classList.remove("hidden");
  } else {
    desktopDiv.classList.remove("crt");
    blackScreen.classList.add("hidden");
  }

  // Altera o estado do efeito e salva no localStorage
  effectToggleButton.addEventListener("click", function () {
    if (desktopDiv.classList.contains("crt")) {
      desktopDiv.classList.remove("crt");
      blackScreen.classList.add("hidden");
      localStorage.setItem("effect", "disabled");
    } else {
      desktopDiv.classList.add("crt");
      blackScreen.classList.remove("hidden");
      localStorage.setItem("effect", "enabled");
    }
  });
});
