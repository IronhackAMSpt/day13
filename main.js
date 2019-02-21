var canvas, ctx

var frames = 0;

var obstacles = [];

var discoColor = {
  random: function() {
    return Math.floor(Math.random() * 255);
  },
  color: function() {
    return (
      "rgb(" + this.random() + "," + this.random() + "," + this.random() + ")"
    );
  }
};

var cube = {
    x: 125,
    y: 30,
    width: 60,
    height: 45,
    speed: 10
}

function Obstacle() {
    this.x = canvas.width;
    this.y = Math.random() * canvas.height
    this.height = 50;
    this.width = 50;
    this.draw = function () {
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fill();
    }
}

window.onkeydown = function(e) {
    switch(e.key) {
        case "ArrowLeft":
            cube.x -= 10
            console.log("left")
            break;
        case "ArrowRight":
            cube.x += 10
            console.log("right");
            break;
    }
}

window.onload = function() {
  canvas = document.getElementById("mycanvas");
  ctx = canvas.getContext("2d");

  window.requestAnimationFrame(updateCanvas);
};

function updateCanvas() {
  frames++;

  if(frames % 200 === 0) {
    obstacles.push(new Obstacle());
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for(var i = 0; i < obstacles.length; i++) {
      obstacles[i].draw();
      obstacles[i].x -= 10;
  }


  cube.y += cube.speed;

  if(cube.y + cube.height >= canvas.height) {
      cube.speed *= -1;
  }

  if(cube.y < 0) {
      cube.speed *= -1;
  }

  ctx.fillStyle = discoColor.color();
  ctx.fillRect(cube.x, cube.y, cube.width, cube.height);

  window.requestAnimationFrame(updateCanvas);
}
