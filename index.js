const websocket_url = "ws://wildfire-server.onrender.com:8000/ws"


const hamburgerBtn = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburgerBtn && navMenu) {
  hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu when a link is clicked
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburgerBtn.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

// Create WebSocket connection.
const socket = new WebSocket(websocket_url);

// Connection opened
socket.addEventListener("open", (event) => {
  socket.send("Hello Server!");
});

// Listen for messages
socket.addEventListener("message", (event) => {
  data = JSON.parse(event.data);
  console.log(data);
});