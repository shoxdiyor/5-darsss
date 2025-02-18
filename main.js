const darkModeToggle = document.getElementById("darkModeToggle");
const htmlElement = document.documentElement;

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  htmlElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme === "dark");
}

function updateThemeIcon(isDark) {
  darkModeToggle.querySelector(".toggle-icon").textContent = isDark
    ? "☀️"
    : "🌙";
}

darkModeToggle.addEventListener("click", () => {
  const isDark = htmlElement.getAttribute("data-theme") === "dark";
  const newTheme = isDark ? "light" : "dark";

  htmlElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon(!isDark);
});

const textInput = document.getElementById("textInput");
const charCount = document.getElementById("charCount");
const wordCount = document.getElementById("wordCount");
const sentenceCount = document.getElementById("sentenceCount");
const excludeSpaces = document.getElementById("excludeSpaces");
const charLimit = document.getElementById("charLimit");
const readingTime = document.getElementById("readingTime");
const densityMessage = document.getElementById("densityMessage");

function updateCounts() {
  const text = textInput.value;

  const chars = excludeSpaces.checked
    ? text.replace(/\s/g, "").length
    : text.length;
  charCount.textContent = chars.toString().padStart(2, "0");

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  wordCount.textContent = words.toString().padStart(2, "0");

  const sentences = text.trim()
    ? text.split(/[.!?]+/).filter(Boolean).length
    : 0;
  sentenceCount.textContent = sentences.toString().padStart(2, "0");

  const minutes = Math.ceil(words / 200);
  readingTime.textContent = minutes;

  if (text.trim()) {
    densityMessage.style.display = "none";
  } else {
    densityMessage.style.display = "block";
  }
}

textInput.addEventListener("input", updateCounts);
excludeSpaces.addEventListener("change", updateCounts);
charLimit.addEventListener("input", () => {
  const limit = parseInt(charLimit.value) || 300;
  textInput.maxLength = limit;
});

updateCounts();
