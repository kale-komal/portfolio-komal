const typedText = document.querySelector('.typed-text');
const phrases = ['Frontend Developer', '.NET MVC Developer', 'Full Stack Developer'];
let index = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const current = phrases[index];
  if (isDeleting) {
    charIndex--;
    typedText.textContent = current.substring(0, charIndex);
    if (charIndex === 0) {
      isDeleting = false;
      index = (index + 1) % phrases.length;
    }
  } else {
    charIndex++;
    typedText.textContent = current.substring(0, charIndex);
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(type, 1000);
      return;
    }
  }
  setTimeout(type, isDeleting ? 50 : 100);
}

document.addEventListener('DOMContentLoaded', type);
