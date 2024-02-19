function ready(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

let xSpeed = 1;
let ySpeed = 1

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
    const collided = detectCollision();

    if (collided) {
      const nextColor = getNextColor();
      node.style.color = nextColor;
    }
  }, 1 / 26)


  function detectCollision() {
    const box = node.getBoundingClientRect();
    let collided = false;

    if (box.right > width || box.left < 0) { 
      xSpeed = -xSpeed; 
      collided = true;
    }

    if (box.top < 0 || box.bottom > height) {
      ySpeed = -ySpeed;
      collided = true;
    }

    return collided;
  }

  let [r, g, b] = [
  Math.random() * 255, Math.random() * 255, Math.random() * 255
  ];
  function getNextColor() {
    r += 40;
    // g += 0;
    b += 5;

    if (r > 255) { r = Math.random() * 255 }
    if (b > 255) { b = Math.random() * 255 }

    return `rgb(${r}, ${g}, ${b})`;
  }
})
