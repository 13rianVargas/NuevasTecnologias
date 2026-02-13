const canvas = document.getElementById('webCanvas');
const ctx = canvas.getContext('2d');

let particles = []; // Kept for compatibility if needed, but unused in new logic
const mouse = {x: null, y: null};
let score = 0;
let countElement;

// Ajustar el año automáticamente
const yearElement = document.getElementById('year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Configuración de la Telaraña
let nodes = [];
let spiders = [];
const SPIDER_COUNT = 5; // Cantidad de arañas
const WEB_COLOR = 'rgba(255, 255, 255, 0.1)';
const SPIDER_COLOR = '#a30000'; // Rojo Spider-Man

function updateScore() {
    if (!countElement) {
        countElement = document.getElementById('count');
    }
    if (countElement) {
        countElement.textContent = score;
    }
}

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.connections = []; // Lista de nodos conectados
    }

    connect(node) {
        if (!this.connections.includes(node)) {
            this.connections.push(node);
            // La conexión es bidireccional
            if (!node.connections.includes(this)) {
                node.connections.push(this);
            }
        }
    }
}

class Spider {
    constructor() {
        this.reset();
    }

    reset() {
        // Empezar en un nodo aleatorio
        if (nodes.length > 0) {
            this.currentNode = nodes[Math.floor(Math.random() * nodes.length)];
            this.targetNode = this.pickRandomNeighbor(this.currentNode);
            this.x = this.currentNode.x;
            this.y = this.currentNode.y;
            this.progress = 0;
            this.speed = 0.005 + Math.random() * 0.01; // Velocidad aleatoria
            this.pauseTime = 0;
            this.isSquashed = false;
        } else {
            this.x = 0; this.y = 0;
        }
    }

    pickRandomNeighbor(node) {
        if (node && node.connections.length > 0) {
            return node.connections[Math.floor(Math.random() * node.connections.length)];
        }
        return node;
    }

    update() {
        if (this.isSquashed || !this.currentNode || !this.targetNode) return;

        // Si está en pausa (esperando en un nodo)
        if (this.pauseTime > 0) {
            this.pauseTime--;
            return;
        }

        // Moverse hacia el objetivo
        this.progress += this.speed;
        
        if (this.progress >= 1) {
            // Llegó al nodo destino
            this.currentNode = this.targetNode;
            this.targetNode = this.pickRandomNeighbor(this.currentNode);
            this.progress = 0;
            
            // Pausa aleatoria al llegar a un nodo
            if (Math.random() < 0.3) {
                this.pauseTime = Math.floor(Math.random() * 50); 
            }
        }

        // Interpolar posición
        this.x = this.currentNode.x + (this.targetNode.x - this.currentNode.x) * this.progress;
        this.y = this.currentNode.y + (this.targetNode.y - this.currentNode.y) * this.progress;
    }

    draw() {
        if (!this.currentNode) return;

        ctx.save();
        ctx.translate(this.x, this.y);

        // Rotar hacia la dirección del movimiento
        const dx = this.targetNode.x - this.currentNode.x;
        const dy = this.targetNode.y - this.currentNode.y;
        const angle = Math.atan2(dy, dx);
        
        // Scaling factor for larger spiders
        const s = 2.5; 

        if (this.isSquashed) {
            // Dibujar araña aplastada (estripada)
            // No rotamos para que quede como mancha o mantenemos rotación original
             ctx.rotate(angle + Math.PI / 2);

            ctx.fillStyle = '#8a0000'; // Color más oscuro
            
            // Mancha irregular
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.ellipse(0, 0, 6 * s, 4 * s, Math.PI / 4, 0, Math.PI * 2);
            ctx.fill();
            
            // Patas desordenadas
            ctx.strokeStyle = '#8a0000';
            ctx.lineWidth = 1.5 * s;
            
            ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-8 * s, -2 * s); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(8 * s, 2 * s); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-5 * s, 6 * s); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(7 * s, -5 * s); ctx.stroke();
            
        } else {
            // Dibujar araña normal
            ctx.rotate(angle + Math.PI / 2);

            // Dibujar cuerpo de la araña
            ctx.fillStyle = SPIDER_COLOR;
            ctx.beginPath();
            ctx.ellipse(0, 0, 3 * s, 5 * s, 0, 0, Math.PI * 2); // Cuerpo
            ctx.fill();
            
            ctx.beginPath();
            ctx.arc(0, -4 * s, 2 * s, 0, Math.PI * 2); // Cabeza
            ctx.fill();

            // Patas
            ctx.strokeStyle = SPIDER_COLOR;
            ctx.lineWidth = 1.5 * s;
            ctx.lineCap = 'round';
            
            // Pata L1
            ctx.beginPath(); ctx.moveTo(0, -2 * s); ctx.lineTo(-6 * s, -6 * s); ctx.stroke();
            // Pata R1
            ctx.beginPath(); ctx.moveTo(0, -2 * s); ctx.lineTo(6 * s, -6 * s); ctx.stroke();
            // Pata L2
            ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-8 * s, 0); ctx.stroke();
            // Pata R2
            ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(8 * s, 0); ctx.stroke();
            // Pata L3
            ctx.beginPath(); ctx.moveTo(0, 2 * s); ctx.lineTo(-6 * s, 6 * s); ctx.stroke();
            // Pata R3
            ctx.beginPath(); ctx.moveTo(0, 2 * s); ctx.lineTo(6 * s, 6 * s); ctx.stroke();
        }

        ctx.restore();
    }
}

// Click interaction logic
window.addEventListener('click', (e) => {
    const clickX = e.clientX;
    const clickY = e.clientY;
    
    spiders.forEach(spider => {
        if (spider.isSquashed) return; // Ya está muerta

        const dx = clickX - spider.x;
        const dy = clickY - spider.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        // Hitbox radius based on size (approx 20px radius with scale 2.5)
        if (dist < 40) { 
             spider.isSquashed = true;
             score++;
             updateScore();

             // Hacer que la araña reaparezca después de 3 segundos
             setTimeout(() => {
                 spider.isSquashed = false;
                 spider.reset();
             }, 3000);
        }
    });
});

function generateWeb() {
    nodes = [];
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const centerNode = new Node(centerX, centerY);
    nodes.push(centerNode);

    const rings = 7;
    const spokes = 12;
    const maxRadius = Math.max(canvas.width, canvas.height) * 0.7;

    let previousRing = [];

    // Generar anillos y radios
    for (let r = 1; r <= rings; r++) {
        const radius = (maxRadius / rings) * r * (0.8 + Math.random() * 0.4); // Irregularidad
        const currentRing = [];

        for (let s = 0; s < spokes; s++) {
            const angle = (Math.PI * 2 / spokes) * s;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            const newNode = new Node(x, y);
            nodes.push(newNode);
            currentRing.push(newNode);

            // Conectar con anillo anterior (Crea los radios)
            if (r === 1) {
                centerNode.connect(newNode);
            } else {
                previousRing[s].connect(newNode);
            }

            // Conectar con vecino en el mismo anillo (Crea la espiral/polígono)
            if (s > 0) {
                currentRing[s-1].connect(newNode);
            }
        }
        // Cerrar el círculo del anillo
        currentRing[currentRing.length - 1].connect(currentRing[0]);
        previousRing = currentRing;
    }
}

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    generateWeb();
    
    spiders = [];
    for (let i = 0; i < SPIDER_COUNT; i++) {
        const spider = new Spider();
        spiders.push(spider);
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Dibujar Telaraña
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = WEB_COLOR;
    ctx.beginPath();
    nodes.forEach(node => {
        node.connections.forEach(conn => {
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(conn.x, conn.y);
        });
    });
    ctx.stroke();

    // Dibujar y actualizar arañas
    spiders.forEach(spider => {
        spider.update();
        spider.draw();
    });

    requestAnimationFrame(animate);
}

window.addEventListener('resize', init);
init();
animate();

