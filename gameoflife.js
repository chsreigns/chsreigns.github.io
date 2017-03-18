// document.addEventListener("DOMContentLoaded", function() {
//   var canvas = document.createElement("canvas");
//   var ratio = window.devicePixelRatio || 1;
//   canvas.id = "canvas";
//   document.body.appendChild(canvas);
//   var width;
//   var height;
//   var grid = [];
//   var ctx;
//   var alive;
//   var intervalId;
//   var cycle;

//   function checkNeighbors(i, j, xMax, yMax, isLive){

//     var neighborCount = 0;

//     // Check left
//     if (i - 1 >= 0){
//       neighborCount += grid[(i-1) + j*xMax];
//     }

//     // Check right
//     if (i + 1 <= xMax){
//       neighborCount += grid[(i+1) + j*xMax];
//     }

//     // Check up
//     if (j - 1 >= 0){
//       neighborCount += grid[i + (j-1)*xMax];
//     }

//     // Check down
//     if (j + 1 <= yMax){
//       neighborCount += grid[i + (j+1)*xMax];
//     }

//     // Check upper left
//     if ( (i - 1 >= 0) && (j - 1 >= 0) ){
//       neighborCount += grid[(i-1) + (j-1)*xMax];
//     }

//     // Check upper right
//     if ( (i + 1 <= xMax) && (j - 1 >= 0) ){
//       neighborCount += grid[(i+1) + (j-1)*xMax];
//     }

//     // Check lower left
//     if ( (i - 1 >= 0) && (j + 1 <= yMax) ){
//       neighborCount += grid[(i - 1) + (j+1)*xMax];
//     }

//     // Check lower right
//     if ( (i + 1 <= xMax) && (j + 1 <= yMax) ){
//       neighborCount += grid[(i + 1) + (j+1)*xMax];
//     }

//     // Any live cell w/ < 2 neighbors dies
//     if ( neighborCount < 2 && isLive == 1){
//       return 0;
//     }

//     // Any live cell w/ 2 or 3 neighbors lives
//     else if ( neighborCount == 2 && isLive == 1){
//       return 1;
//     }

//     else if ( neighborCount == 3 && isLive == 1){
//       return 1;
//     }

//     // Any live cell w/ > 3 neighbors dies
//     else if ( neighborCount > 3 && isLive == 1){
//       return 0;
//     }

//     // Any dead cell w/ exactly 3 live neighbors lives
//     if ((neighborCount == 3) && (isLive == 0)){
//       return 1;
//     }

//     else {
//       return 0;
//     }

//   }

//   function Cell(i, j, r, alive){
//     ctx.beginPath();
//     ctx.arc(i, j, r, 0, 2*Math.PI);
//     ctx.strokeStyle = "#fff";
//     ctx.stroke();
//     if (alive) {
//       ctx.fillStyle = "#000";
//       ctx.fill();
//     }
//   }

//   function setupGame(xMax, yMax, r, n){
//     grid = [];
//     cycle = 0;
//     ctx.clearRect(0, 0, width, height);
//     for (var y = 0; y < yMax; y++){
//       for (var x = 0; x < xMax; x++){
//         alive = Math.floor(Math.random()*2.2);
//         alive = Math.floor(alive/2);
//         // Cell(x*n+n/2, y*n+n/2, r, alive);
//         grid.push(alive);
//       }
//     }
//     cycle++;
//   }


//   function playGame(xMax, yMax, r, n){
//     ctx.clearRect(0, 0, width, height);
//     var gridCopy = [];
//     for (var y = 0; y < yMax; y++){
//       for (var x = 0; x < xMax; x++){
//         gridCopy[x+y*xMax] = checkNeighbors(x, y, xMax, yMax, grid[x+y*xMax]);
//         /*Cell(x*n+n/2, y*n+n/2, r, gridCopy[x+y*xMax]);*/
//       }
//     }
//     grid = gridCopy.slice(0);
//     for (var y = 0; y < yMax; y++){
//       for (var x = 0; x < xMax; x++){
//         Cell(x*n+n/2, y*n+n/2, r, grid[x+y*xMax]);
//       }
//     }
//     cycle++;
//   }

//   function init() {
//     canvas.width = window.innerWidth * ratio;
//     canvas.height = window.innerHeight * ratio;
//     canvas.style.width = window.innerWidth;
//     canvas.style.height = window.innerHeight;

//     ctx = document.querySelector("#canvas").getContext('2d');
//     height = document.querySelector("#canvas").innerWidth;
//     width = document.querySelector("#canvas").innerHeight;

//     // These values are the most aesthetically pleasing
//     var n = 10;

//     var xMax = 75;
//     var yMax = 75;
//     var r = 1;

//     cycle = 0;
//     // setTimeout(function() {
//       setupGame(xMax, yMax, r, n);
//       intervalId = setInterval(function() {playGame(xMax, yMax, r, n)}, 75);
//     // }, 10);
//     // intervalId = setInterval(function() {playGame(xMax, yMax, r, n)}, 75);
//   }

//   init();
//   window.addEventListener("resize", function() {
//     canvas.width = window.innerWidth * ratio;
//     canvas.height = window.innerHeight * ratio;
//     canvas.style.width = window.innerWidth;
//     canvas.style.height = window.innerHeight;
//   });
//   // window.addEventListener("click", function() {
//   //   var n = 10;

//   //   var xMax = 75;
//   //   var yMax = 75;
//   //   var r = 1;

//   //   // cycle = 0;
//   //   // setupGame(xMax, yMax, r, n);
//   //   // console.log('shit')
//   //   // grid = [];
//   //   clearInterval(intervalId);
//   //   setupGame(xMax, yMax, r, n);
//   //   intervalId = setInterval(function() {playGame(xMax, yMax, r, n)}, 75);
//   // });
// });

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-93860822-1', 'auto');
  ga('send', 'pageview');
