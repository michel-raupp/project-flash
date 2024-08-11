const generateGameList = () => {
  const gameList = document.getElementById("game-list");
  if (!gameList) return;

  games.forEach((game) => {
    const card = document.createElement("a");
    card.className = "game-card";
    card.setAttribute("data-link", "");
    card.href = `#game=${game.fileName.replace(".swf", "")}`;

    // gera a imagem do jogo, buscando pelo nome definido no arquivo games.js, caso não encontre, usa o nome do arquivo do jogo (.swf) como referência
    const img = document.createElement("img");
    img.src = `assets/images/${game.img || game.fileName.replace(".swf", ".webp")}`;
    img.alt = `imagem do jogo Flash: ${game.name}`;
    card.appendChild(img);

    const title = document.createElement("p");
    title.innerText = `${game.name}`;
    card.appendChild(title);

    gameList.appendChild(card);
  });
};
