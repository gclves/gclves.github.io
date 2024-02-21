function ready(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

let xSpeed = 0.4
let ySpeed = 0.4

function pageDimensions() {
  const { width, height } = document.querySelector('body').getBoundingClientRect();
  return { width, height };
}

ready(() => {
  const node = document.querySelector('#bounce')

  let { width, height } = pageDimensions();

  window.addEventListener('resize', () => {
    const dimensions = pageDimensions();
    width = dimensions.width;
    height = dimensions.height;

    detectCollision();
  });

  let x = Math.random() * width / 2;
  let y = Math.random() * height / 2;

  let paused = false;
  window.addEventListener('click', () => {
      paused = !paused;
      });

  setInterval(() => {
    if (paused) { return; }

    x += xSpeed;
    y += ySpeed;

    node.style.transform = `translateX(${x}px) translateY(${y}px)`;
    detectCollision();
  }, 1 / 26)


  function detectCollision() {
    const box = node.getBoundingClientRect();

    if (box.right > width || box.left < 0) { 
      xSpeed = -xSpeed; 
    }
    if (box.top < 0 || box.bottom > height) {
      ySpeed = -ySpeed;
    }
  }
})
