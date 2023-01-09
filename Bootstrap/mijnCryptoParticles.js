/*
Copyright (c) 2022 Yunus Sahin. All rights reserved.

This JavaScript code is protected by copyright law and international treaties. 
Unauthorized reproduction or distribution of this code, or any portion of it, 
may result in severe civil and criminal penalties, and will be prosecuted 
to the maximum extent possible under the law.
*/

 // Set up canvas
 const canvas = document.getElementById('canvas');
 const yns = canvas.getContext('2d');
 let width, height;

 // Set up variables for the background effect
 const numParticles = 77;
 const particles = [];
 let angle = 0;
 const imageUrls = [
 'https://s2.coinmarketcap.com/static/img/coins/200x200/1.png',
 'https://s2.coinmarketcap.com/static/img/coins/200x200/1027.png',
 'https://s3.coinmarketcap.com/static/img/portraits/630c5fcaf8184351dc5c6ee5.png',
 'https://s2.coinmarketcap.com/static/img/coins/200x200/52.png',
 'https://s3.coinmarketcap.com/static/img/portraits/62837c68ab0e763d5f77e9a6.png'
 ];

 // Set up a particle object
 class Particle {
   constructor() {
     this.x = Math.random() * width;
     this.y = Math.random() * height;
     this.vx = Math.random() * 2 - 1;
     this.vy = Math.random() * 2 - 1;
     this.radius = Math.random() * 20 + 1;
     this.imageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];
     this.image = null;
     this.loadImage();
   }

   // Load the image for the particle
   loadImage() {
     this.image = new Image();
     this.image.src = this.imageUrl;
   }
 }

 // Initialize the particles
 function initParticles() {
   for (let i = 0; i < numParticles; i++) {
     particles.push(new Particle());
   }
 }

 // Update the particle positions
 function updateParticles() {
   for (let i = 0; i < numParticles; i++) {
     const p1 = particles[i];
     // Check for collisions with other particles
     for (let j = i + 1; j < numParticles; j++) {
       const p2 = particles[j];
       const dx = p1.x - p2.x;
       const dy = p1.y - p2.y;
       const distance = Math.sqrt(dx * dx + dy * dy);
       if (distance < p1.radius + p2.radius) {
         // Calculate new velocities for p1 and p2 after collision
         const m1 = p1.radius;
         const m2 = p2.radius;
         let v1 = p1.vx;
         let v2 = p2.vx;
         p1.vx = (v1 * (m1 - m2) + 2 * m2 * v2) / (m1 + m2);
         p2.vx = (v2 * (m2 - m1) + 2 * m1 * v1) / (m1 + m2);
v1 = p1.vy;
v2 = p2.vy;
p1.vy = (v1 * (m1 - m2) + 2 * m2 * v2) / (m1 + m2);
p2.vy = (v2 * (m2 - m1) + 2 * m1 * v1) / (m1 + m2);
}
}
// Update position
p1.x += p1.vx;
p1.y += p1.vy;
// Check for collisions with the edges of the canvas
if (p1.x > width || p1.x < 0) p1.vx = -p1.vx;
if (p1.y > height || p1.y < 0) p1.vy = -p1.vy;
}
}

// Draw the particles onto the canvas
function drawParticles() {
yns.clearRect(0, 0, width, height);
yns.globalAlpha = 0.2;
for (let i = 0; i < numParticles; i++) {
const p = particles[i];
yns.drawImage(p.image, p.x - p.radius, p.y - p.radius, p.radius * 2, p.radius * 2);
}
}

// Animate the particles
function animate() {
updateParticles();
drawParticles();
requestAnimationFrame(animate);
}

// Resize the canvas when the window is resized
function onResize() {
width = canvas.width = window.innerWidth;
height = canvas.height = window.innerHeight;
initParticles();
}

// Initialize the canvas and start the animation
onResize();
animate();
window.addEventListener('resize', onResize);










