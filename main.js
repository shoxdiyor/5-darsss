let btn = document.getElementById("darkModeToggle");

function switchTheme() {
  let dark = document.documentElement.getAttribute("data-theme") === "dark";
  document.documentElement.setAttribute("data-theme", dark ? "light" : "dark");
  btn.innerHTML = dark ? "🌙" : "☀️";
}

btn.onclick = switchTheme;
btn.innerHTML = "🌙";

let text = document.getElementById("textInput");
let charDisplay = document.getElementById("charCount");
let wordDisplay = document.getElementById("wordCount");
let sentDisplay = document.getElementById("sentenceCount");
let skipSpaces = document.getElementById("excludeSpaces");
let timeDisplay = document.getElementById("readingTime");
let letterDisplay = document.getElementById("letterDensityContainer");

function countText() {
  let content = text.value;

  charDisplay.textContent = skipSpaces.checked
    ? content.replace(/\s/g, "").length
    : content.length;

  let words = content
    .trim()
    .split(" ")
    .filter((w) => w.length > 0);
  wordDisplay.textContent = words.length;

  let sentences = content.split(/[.!?]/).filter((s) => s.trim().length > 0);
  sentDisplay.textContent = sentences.length;

  let time = Math.max(1, Math.ceil(words.length / 200));
  timeDisplay.textContent =
    "Approx. reading time: " + time + (time === 1 ? " minute" : " minutes");

  let letters = {};
  let clean = content.toLowerCase().replace(/[^a-z]/g, "");

  for (let letter of clean) {
    letters[letter] = (letters[letter] || 0) + 1;
  }

  let top5 = Object.entries(letters)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  let html = "";
  for (let [letter, count] of top5) {
    let percent = ((count / clean.length) * 100).toFixed(1);
    html += `
            <div class="density-bar">
                <span>${letter.toUpperCase()}</span>
                <div class="bar" style="width: ${percent}%"></div>
                <span>${count} (${percent}%)</span>
            </div>
        `;
  }
  letterDisplay.innerHTML = html;
}

text.oninput = countText;
skipSpaces.onchange = countText;
countText();
