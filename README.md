# Introdução

Esse projeto propõe em ser uma Prova de Conceito de um site de jogos Flash. Jogos Flash foram muito populares entre os anos 2000 a 2010. Com o [fim de suporte a jogos Flash nos navegadores em 2020](https://www.meupositivo.com.br/doseujeito/dicas/fim-do-adobe-flash-player-o-que-muda/), criaram-se soluções de emulação. 

Estre projeto utiliza uma dessas soluções, a [Ruffle](https://ruffle.rs/).

## Sobre o projeto

O projeto não utiliza nenhum Framework ou Biblioteca de interface, como React.js, Vue ou similares. 

Foram utilizados HTML, CSS e algumas poucas funções em Javascript para cuidar do gerenciamento de rotas, controle de temas ativos e emulação dos jogos via Ruffle.

![](https://img.shields.io/badge/Code-HTML5-informational?style=flat&logo=HTML5&color=E34F26)
![](https://img.shields.io/badge/Style-CSS3-informational?style=flat&logo=CSS3&color=1572B6)
![](https://img.shields.io/badge/Code-JavaScript-informational?style=flat&logo=JavaScript&color=F7DF1E)

### Como funciona a navegação?

O sistema de rotas foi feito para simular um SPA (Single Page Application), no qual existe somente "um ```index.html```" comportando a estilização e estrutura base de todas as páginas, enquanto que os demais arquivos html agem como o conteúdo das páginas em sí.
A navegação em si utiliza-se do conceito de hash-navigation, enquanto que a tela do "jogo" em sí espera receber o nome do jogo, pois através disso é possível fazer a busca corretamente do jogo na pasta ```/assets/games/```.

Exemplo de rota:

```/#game=nome_do_jogo```

Nesse exemplo, a aplicação irá importar o jogo baseado no seguinte path ```/assets/games/nome_do_jogo.swf```.

### Como funciona a emulação do Ruffle?

O Ruffle tem diversas maneiras de ser integrado a sua aplicação, a utilizada nesse projeto é a seguinte:

Importação do Ruffle no ```index.html```

```
<script src="https://unpkg.com/@ruffle-rs/ruffle"></script>
```

A inicialização do player (emulador) espera duas informações, o tamanho do player (largura e altura) e a url do jogo a ser emulado.

```
var swfobject = {};

swfobject.embedSWF = function (url, cont, width, height) { // espera a url do jogo, id do local a qual o player será inserido e o tamanho do player em sí.

  var ruffle = window.RufflePlayer.newest(),
    player = Object.assign(
      document.getElementById(cont).appendChild(ruffle.createPlayer()), 
      {
        width: width,
        height: height,
        style: "width: " + width + "px; height: " + height + "px",
      }
    );

  player.load({ url: url }); // url do jogo com extensão .swf
};
```

Agora quanto a parte de, de fato "rodar o jogo" é feita aqui:

```
const loadGame = (game) => {
  document.getElementById("app").innerHTML = `<div id="ruffle"></div>`;   // Define a área do jogo no HTML
  swfobject.embedSWF(`assets/games/${game.fileName}`, "ruffle", 800, 600);   // Carrega o jogo usando a função embedSWF, passando a url, id, largura e altura
};
```

## Como iniciar o projeto?

Por se tratar de um projeto sem nenhum Framework, basta clonar o repositório ou baixar o projeto e realizar um dos seguintes passos:

- Abrir o arquivo ```index.html``` na raiz do projeto, em ```project-flash/index.html```.
- Iniciar a extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) no VSCode ou similares;

Particularmente prefiro utilizar a segunda opção, mas fique a vontade para utilizar a que preferir ou uma alternativa.

## Como adicionar novos jogos?

Como o projeto é só uma POC, não foi utilizado algum servidor para armazenar os arquivo dos jogos, mas sim, os jogos estão locais em ```assets/games```. 

Neste caso, caso prefira adicionar manualmente os jogos, basta adicioná-los com a extensão ```.swf``` na pasta ```games``` e, adicionar as informações do jogo no array ```games``` dentro de ```data/games.js```.

Exemplo de organização das informações:

```
const games = [
  {
    id: 1, // identificador
    name: "Nome do Jogo", // nome do jogo para identificar no card
    img: "nome_do_jogo.webp", // imagem da capa do jogo, deve ser com a extensão .webp
    fileName: "nome_do_jogo.swf", // arquivo do jogo com a extensão .swf
  },
  {
    id: 2,
    name: "Outro Jogo",
    img: "outro_jogo.webp",
    fileName: "outro_jogo.swf",
  },
]
```

As imagens dos jogos devem estar dispostas em ```assets/images```.

## Como baixar jogos Flash?

Existem diversas maneiras de baixar jogos Flash, seja através do [Flashpoint Archive](https://flashpointarchive.org/), CDs antigos como os da [Digerati](https://lostmediabrasil.miraheze.org/wiki/Digerati), ou até mesmo baixando-os diretamente de sites de jogos que hoje utilizam a Ruffle, como o [CrazyGames](https://www.crazygames.com.br/t/flash)

## Considerações finais

Sinta-se livre para clonar, copiar, melhorar, editar o projeto. Caso tenha algum feedback, pode mandar um email em [michelraupp@outlook.com](mailto:michelraupp@outlook.com) ou entrar em contato comigo via [LinkedIn](https://www.linkedin.com/in/michelraupp/).

## Referências

Acabei utilizando como base o seguinte vídeo no Youtube. [Ver vídeo](https://www.youtube.com/watch?v=TJXMGNxex24) e a documentação do [Ruffle](https://github.com/ruffle-rs/ruffle/).
