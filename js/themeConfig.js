document.addEventListener("DOMContentLoaded", function () {
  const themeToggleButton = document.getElementById("theme-toggle");

  // Puxa do localStorage o tema salvo, caso não tenha nada salvo, usa o tema padrão (theme_1)
  const savedTheme = localStorage.getItem("theme") || "theme_1";
  applyTheme(savedTheme);

  // Alterna o tema ao clicar no botão "Temas"
  themeToggleButton.addEventListener("click", function () {
    const currentTheme = localStorage.getItem("theme") || "theme_1";
    const themes = ["theme_1", "theme_2", "theme_3", "theme_4", "theme_5"]; // Lista de temas disponíveis, caso adicione mais um tema, adicione aqui também
    const currentIndex = themes.indexOf(currentTheme);
    const newIndex = (currentIndex + 1) % themes.length;
    const newTheme = themes[newIndex];
    applyTheme(newTheme);
  });
});

function applyTheme(theme) {
  const root = document.documentElement;
  const themePrefix = `--${theme}_`;

  const properties = [
    "black",
    "white",
    "lightGrey",
    "grey",
    "darkGrey",
    "primary",
    "secondary",
    "negative",
    "font",
  ];

  properties.forEach((property) => {
    const varName = `${themePrefix}${property}`;
    root.style.setProperty(`--${property}`, `var(${varName})`);
  });

  document.documentElement.style.fontFamily = `var(--font)`;

  localStorage.setItem("theme", theme);
}
