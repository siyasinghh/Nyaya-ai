// Fade hero text as user scrolls
window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero-content");
  const scrollY = window.scrollY;
  hero.style.opacity = 1 - scrollY / 400;
});

// Smooth scroll to features on button click
document.getElementById("getStarted").addEventListener("click", () => {
  const features = document.querySelector("#features");
  window.scrollTo({
    top: features.offsetTop - 50,
    behavior: 'smooth'
  });
});
const helpBotToggle = document.getElementById('helpBotToggle');
const helpBot = document.getElementById('helpBot');
const closeHelpBot = document.getElementById('closeHelpBot');

helpBotToggle.addEventListener('click', () => {
  helpBot.style.display = 'flex';
});

closeHelpBot.addEventListener('click', () => {
  helpBot.style.display = 'none';
});