var swfobject = {};

swfobject.embedSWF = function (url, cont, width, height) {
  console.log("sfwobject.embedSWF", url, cont, width, height);
  var ruffle = window.RufflePlayer.newest(),
    player = Object.assign(
      document.getElementById(cont).appendChild(ruffle.createPlayer()),
      {
        width: width,
        height: height,
        style: "width: " + width + "px; height: " + height + "px",
      }
    );

  player.load({ url: url });
};

const loadGame = (game) => {
  // Define a área do jogo no HTML
  document.getElementById("app").innerHTML = `<div id="ruffle"></div>`;

  // Carrega o jogo usando a função embedSWF
  swfobject.embedSWF(`assets/games/${game.fileName}`, "ruffle", 800, 600);
};

// Função para carregar o conteúdo de uma página
const loadContent = async (url) => {
  const res = await fetch(url);
  const content = await res.text();
  document.getElementById("app").innerHTML = content;
};

// Função para gerenciar a navegação
const navigateTo = (hash) => {
  window.location.hash = hash;
};

// Função que faz o roteamento
const router = async () => {
  const routes = {
    "": "/pages/home.html",
    "#about": "/pages/about.html",
    "#list": "/pages/list.html",
  };

  const hash = window.location.hash;
  let gameRoute;

  // Se a rota for um jogo, redireciona para a página do jogo
  if (hash.startsWith("#game=")) {
    gameRoute = "/pages/game.html";
  }

  const route = gameRoute || routes[hash] || "/pages/home.html";
  await loadContent(route);

  if (hash === "#list") {
    generateGameList();
  }

  // Se a rota for de um jogo, pega o hash com o nome do jogo e busca o jogo na lista de jogos
  if (hash.startsWith("#game=")) {
    const gameName = hash.split("=").pop();
    const game = games.find((g) => g.fileName.replace(".swf", "") === gameName);

    if (game) {
      loadGame(game);
    }
  }
};

// Intercepta cliques nos links com data-link
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.getAttribute("href"));
    }
  });

  window.addEventListener("hashchange", router);

  router();
});
