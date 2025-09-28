        // --- Sound Effects ---
        const synth = new Tone.Synth().toDestination();
        document.querySelectorAll('.interactive-sound').forEach(el => {
            el.addEventListener('mouseenter', () => {
                // Tone.start() is essential for audio to work in many browsers
                if (Tone.context.state !== 'running') {
                    Tone.start();
                }
                synth.triggerAttackRelease("C5", "8n");
            });
        });

        // --- On-Scroll Animations ---
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    scrollObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.scroll-animate-target').forEach(el => {
            scrollObserver.observe(el);
        });

        // --- Parallax Starfield Effect ---
        const parallaxFarCanvas = document.getElementById('parallax-stars-far');
        const parallaxCloseCanvas = document.getElementById('parallax-stars-close');
        const pFarCtx = parallaxFarCanvas.getContext('2d');
        const pCloseCtx = parallaxCloseCanvas.getContext('2d');

        let starsFar = [];
        let starsClose = [];

        function setupParallax() {
            parallaxFarCanvas.width = window.innerWidth;
            parallaxFarCanvas.height = window.innerHeight;
            parallaxCloseCanvas.width = window.innerWidth;
            parallaxCloseCanvas.height = window.innerHeight;
            starsFar = [];
            starsClose = [];

            // Create far stars
            for (let i = 0; i < 200; i++) {
                starsFar.push({
                    x: Math.random() * parallaxFarCanvas.width,
                    y: Math.random() * parallaxFarCanvas.height,
                    radius: Math.random() * 0.8,
                });
            }
            // Create close stars
            for (let i = 0; i < 50; i++) {
                starsClose.push({
                    x: Math.random() * parallaxCloseCanvas.width,
                    y: Math.random() * parallaxCloseCanvas.height,
                    radius: Math.random() * 1.5 + 0.5,
                });
            }
        }

        function drawParallax() {
            const scrollY = window.scrollY;

            // Draw far stars
            pFarCtx.clearRect(0, 0, parallaxFarCanvas.width, parallaxFarCanvas.height);
            pFarCtx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            starsFar.forEach(star => {
                pFarCtx.beginPath();
                const y = (star.y - scrollY * 0.1) % parallaxFarCanvas.height;
                pFarCtx.arc(star.x, y < 0 ? y + parallaxFarCanvas.height : y, star.radius, 0, Math.PI * 2);
                pFarCtx.fill();
            });

            // Draw close stars
            pCloseCtx.clearRect(0, 0, parallaxCloseCanvas.width, parallaxCloseCanvas.height);
            pCloseCtx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            starsClose.forEach(star => {
                pCloseCtx.beginPath();
                const y = (star.y - scrollY * 0.4) % parallaxCloseCanvas.height;
                pCloseCtx.arc(star.x, y < 0 ? y + parallaxCloseCanvas.height : y, star.radius, 0, Math.PI * 2);
                pCloseCtx.fill();
            });
        }
        
        window.addEventListener('scroll', () => {
             requestAnimationFrame(drawParallax);
        });
        window.addEventListener('resize', () => {
            setupParallax();
            drawParallax();
        });

        setupParallax();
        drawParallax();


        // --- Pac-Man Game Simulation ---
        const canvas = document.getElementById('game-canvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            const btnAiDemo = document.getElementById('btn-ai-demo');
            const btnPlayMode = document.getElementById('btn-play-mode');
            const controlsText = document.getElementById('controls-text');

            const gridSize = 20;
            const tileCount = canvas.width / gridSize;
            let isPlayerControlled = false;
            
            const map = [
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1],
                [1,0,1,1,0,1,1,1,0,1,1,0,1,1,1,0,1,1,0,1],
                [1,0,1,1,0,1,1,1,0,1,1,0,1,1,1,0,1,1,0,1],
                [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                [1,0,1,1,0,1,0,1,1,1,1,1,1,0,1,0,1,1,0,1],
                [1,0,0,0,0,1,0,0,0,1,1,0,0,0,1,0,0,0,0,1],
                [1,1,1,1,0,1,1,1,2,2,2,2,1,1,1,0,1,1,1,1],
                [1,1,1,1,0,1,2,2,2,2,2,2,2,2,1,0,1,1,1,1],
                [1,1,1,1,0,1,2,2,2,2,2,2,2,2,1,0,1,1,1,1],
                [1,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,1],
                [1,0,1,1,0,1,1,1,0,1,1,0,1,1,1,0,1,1,0,1],
                [1,0,1,1,0,1,0,0,0,0,0,0,0,0,1,0,1,1,0,1],
                [1,0,0,0,0,1,0,1,1,1,1,1,1,0,1,0,0,0,0,1],
                [1,1,1,0,1,1,0,0,0,1,1,0,0,0,1,1,0,1,1,1],
                [1,0,0,0,0,0,0,1,0,1,1,0,1,0,0,0,0,0,0,1],
                [1,0,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,0,1],
                [1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1],
                [1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            ];

            const pacman = {
                x: gridSize,
                y: gridSize,
                radius: gridSize / 2 - 2,
                speed: 1.8,
                direction: 'right',
                nextDirection: 'right',
                mouthOpenValue: 40,
                mouthChangeSpeed: 5,
            };
            
            const ghosts = [
                { x: gridSize * 9, y: gridSize * 8, speed: 1.4, direction: 'up', color: '#ef4444'},
                { x: gridSize * 10, y: gridSize * 8, speed: 1.4, direction: 'up', color: '#f472b6'},
                { x: gridSize * 9, y: gridSize * 9, speed: 1.4, direction: 'left', color: '#67e8f9'},
                { x: gridSize * 10, y: gridSize * 9, speed: 1.4, direction: 'right', color: '#f97316'}
            ];

            let pellets = [];

            function resetPacman() {
                pacman.x = gridSize;
                pacman.y = gridSize;
                pacman.direction = 'right';
                pacman.nextDirection = 'right';
            }

            function isWall(x, y, forGhost = false) {
                const gridX = Math.floor(x / gridSize);
                const gridY = Math.floor(y / gridSize);
                if(gridX < 0 || gridX >= tileCount || gridY < 0 || gridY >= tileCount) return true;
                const tile = map[gridY][gridX];
                if (forGhost) return tile === 1;
                return tile === 1 || tile === 2;
            }

            function createPellets() {
                pellets = [];
                for (let y = 0; y < tileCount; y++) {
                    for (let x = 0; x < tileCount; x++) {
                        if (map[y][x] === 0) {
                            pellets.push({ x: x * gridSize + gridSize / 2, y: y * gridSize + gridSize / 2, radius: 2 });
                        }
                    }
                }
            }
            
            function drawWalls() {
                ctx.strokeStyle = '#2563eb';
                ctx.lineWidth = 5;
                ctx.lineCap = 'round';
                for (let y = 0; y < tileCount; y++) {
                    for (let x = 0; x < tileCount; x++) {
                        if (map[y][x] !== 1) continue;
                        const centerX = x * gridSize + gridSize / 2;
                        const centerY = y * gridSize + gridSize / 2;
                        if (x < tileCount - 1 && map[y][x + 1] === 1) {
                            ctx.beginPath();
                            ctx.moveTo(centerX, centerY);
                            ctx.lineTo(centerX + gridSize, centerY);
                            ctx.stroke();
                        }
                        if (y < tileCount - 1 && map[y + 1][x] === 1) {
                            ctx.beginPath();
                            ctx.moveTo(centerX, centerY);
                            ctx.lineTo(centerX, centerY + gridSize);
                            ctx.stroke();
                        }
                    }
                }
            }

            function drawPacman() {
                const angle = 0.2 * Math.PI * (pacman.mouthOpenValue / 40);
                ctx.save();
                ctx.translate(pacman.x + gridSize / 2, pacman.y + gridSize / 2);
                let rotation = 0;
                if (pacman.direction === 'left') rotation = Math.PI;
                if (pacman.direction === 'up') rotation = -0.5 * Math.PI;
                if (pacman.direction === 'down') rotation = 0.5 * Math.PI;
                ctx.rotate(rotation);
                ctx.beginPath();
                ctx.arc(0, 0, pacman.radius, angle, -angle);
                ctx.lineTo(0, 0);
                ctx.fillStyle = '#facc15';
                ctx.fill();
                ctx.closePath();
                ctx.restore();
            }

            function drawGhosts() {
                ghosts.forEach(ghost => {
                    ctx.fillStyle = ghost.color;
                    const bodyHeight = pacman.radius;
                    const bodyWidth = pacman.radius * 2;
                    ctx.beginPath();
                    ctx.arc(ghost.x + gridSize/2, ghost.y + gridSize/2, pacman.radius, Math.PI, 0);
                    ctx.fillRect(ghost.x + (gridSize/2 - pacman.radius), ghost.y + gridSize/2, bodyWidth, bodyHeight);
                    for(let i = 0; i < 3; i++){
                        ctx.arc(ghost.x + (gridSize/2 - pacman.radius) + (i * bodyWidth/3) + bodyWidth/6, ghost.y + gridSize/2 + bodyHeight, bodyWidth/6, 0, Math.PI);
                    }
                    ctx.fill();
                    ctx.closePath();
                    ctx.fillStyle = 'white';
                    ctx.beginPath();
                    ctx.arc(ghost.x + 8, ghost.y + 9, 4, 0, Math.PI * 2);
                    ctx.arc(ghost.x + 16, ghost.y + 9, 4, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.fillStyle = 'black';
                    ctx.beginPath();
                    ctx.arc(ghost.x + 8, ghost.y + 9, 2, 0, Math.PI * 2);
                    ctx.arc(ghost.x + 16, ghost.y + 9, 2, 0, Math.PI * 2);
                    ctx.fill();
                });
            }

            function drawPellets() {
                pellets.forEach(pellet => {
                    ctx.beginPath();
                    ctx.arc(pellet.x, pellet.y, pellet.radius, 0, Math.PI * 2);
                    ctx.fillStyle = '#f9a8d4';
                    ctx.fill();
                    ctx.closePath();
                });
            }

            function updateAI(character, isGhost = false) {
                 const possibleDirections = [];
                 const opposites = { 'up': 'down', 'down': 'up', 'left': 'right', 'right': 'left' };
                 const directions = ['up', 'down', 'left', 'right'];
                 directions.forEach(dir => {
                     if (dir !== opposites[character.direction]) {
                         if (dir === 'up' && !isWall(character.x, character.y - character.speed, isGhost)) possibleDirections.push(dir);
                         if (dir === 'down' && !isWall(character.x, character.y + character.speed + gridSize, isGhost)) possibleDirections.push(dir);
                         if (dir === 'left' && !isWall(character.x - character.speed, character.y, isGhost)) possibleDirections.push(dir);
                         if (dir === 'right' && !isWall(character.x + character.speed + gridSize, character.y, isGhost)) possibleDirections.push(dir);
                     }
                 });
                 let isStuck = true;
                 if (character.direction === 'up' && !isWall(character.x, character.y - character.speed, isGhost)) isStuck = false;
                 if (character.direction === 'down' && !isWall(character.x, character.y + character.speed + gridSize, isGhost)) isStuck = false;
                 if (character.direction === 'left' && !isWall(character.x - character.speed, character.y, isGhost)) isStuck = false;
                 if (character.direction === 'right' && !isWall(character.x + character.speed + gridSize, character.y, isGhost)) isStuck = false;
                 if (isStuck || (character.x % gridSize < 2 && character.y % gridSize < 2 && possibleDirections.length > 0)) {
                      character.direction = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
                 }
                 if (character.direction === 'up') character.y -= character.speed;
                 if (character.direction === 'down') character.y += character.speed;
                 if (character.direction === 'left') character.x -= character.speed;
                 if (character.direction === 'right') character.x += character.speed;
                if (character.x < -gridSize) character.x = canvas.width;
                if (character.x > canvas.width) character.x = -gridSize;
            }
            
            function updatePacman() {
                 pacman.mouthOpenValue += pacman.mouthChangeSpeed;
                 if (pacman.mouthOpenValue > 40 || pacman.mouthOpenValue < 5) {
                     pacman.mouthChangeSpeed *= -1;
                 }

                 if (isPlayerControlled) {
                    // Player logic
                    let nextX = pacman.x, nextY = pacman.y;
                    if (pacman.nextDirection === 'right') nextX += pacman.speed;
                    if (pacman.nextDirection === 'left') nextX -= pacman.speed;
                    if (pacman.nextDirection === 'up') nextY -= pacman.speed;
                    if (pacman.nextDirection === 'down') nextY += pacman.speed;

                    if (!isWall(nextX, pacman.y) && !isWall(nextX + gridSize -1, pacman.y) && !isWall(nextX, pacman.y + gridSize -1) && !isWall(nextX + gridSize -1, pacman.y + gridSize -1)){
                        pacman.direction = pacman.nextDirection;
                    }

                    if (pacman.direction === 'right' && !isWall(pacman.x + pacman.speed + gridSize, pacman.y)) pacman.x += pacman.speed;
                    if (pacman.direction === 'left' && !isWall(pacman.x - pacman.speed, pacman.y)) pacman.x -= pacman.speed;
                    if (pacman.direction === 'up' && !isWall(pacman.x, pacman.y - pacman.speed)) pacman.y -= pacman.speed;
                    if (pacman.direction === 'down' && !isWall(pacman.x, pacman.y + pacman.speed + gridSize)) pacman.y += pacman.speed;
                 } else {
                    // AI logic
                    updateAI(pacman, false);
                 }
            }

            function checkCollisions() {
                for (let i = pellets.length - 1; i >= 0; i--) {
                    const pellet = pellets[i];
                    const p_center_x = pacman.x + gridSize / 2;
                    const p_center_y = pacman.y + gridSize / 2;
                    const dist = Math.sqrt((p_center_x - pellet.x)**2 + (p_center_y - pellet.y)**2);
                    if (dist < pacman.radius + pellet.radius) {
                        pellets.splice(i, 1);
                    }
                }
                 if (pellets.length === 0) {
                    createPellets();
                    resetPacman(); // Reset when all pellets are eaten
                 }

                 // In play mode, ghost collision resets Pac-Man
                 if (isPlayerControlled) {
                     ghosts.forEach(ghost => {
                        const p_center_x = pacman.x + gridSize / 2;
                        const p_center_y = pacman.y + gridSize / 2;
                        const g_center_x = ghost.x + gridSize / 2;
                        const g_center_y = ghost.y + gridSize / 2;
                        const dist = Math.sqrt((p_center_x - g_center_x)**2 + (p_center_y - g_center_y)**2);
                        if (dist < pacman.radius * 1.5) {
                            resetPacman();
                        }
                     });
                 }
            }
            
            function setMode(isPlayer) {
                isPlayerControlled = isPlayer;
                resetPacman();
                if (isPlayer) {
                    btnPlayMode.classList.add('bg-cyan-500', 'text-white');
                    btnPlayMode.classList.remove('border', 'border-cyan-500', 'text-cyan-400');
                    btnAiDemo.classList.remove('bg-cyan-500', 'text-white');
                    btnAiDemo.classList.add('border', 'border-cyan-500', 'text-cyan-400');
                    controlsText.textContent = 'Use Arrow Keys to Control';
                } else {
                    btnAiDemo.classList.add('bg-cyan-500', 'text-white');
                    btnAiDemo.classList.remove('border', 'border-cyan-500', 'text-cyan-400');
                    btnPlayMode.classList.remove('bg-cyan-500', 'text-white');
                    btnPlayMode.classList.add('border', 'border-cyan-500', 'text-cyan-400');
                    controlsText.textContent = '';
                }
            }

            btnAiDemo.addEventListener('click', () => setMode(false));
            btnPlayMode.addEventListener('click', () => setMode(true));

            window.addEventListener('keydown', (e) => {
                if(isPlayerControlled) {
                     switch(e.key) {
                        case 'ArrowUp': e.preventDefault(); pacman.nextDirection = 'up'; break;
                        case 'ArrowDown': e.preventDefault(); pacman.nextDirection = 'down'; break;
                        case 'ArrowLeft': e.preventDefault(); pacman.nextDirection = 'left'; break;
                        case 'ArrowRight': e.preventDefault(); pacman.nextDirection = 'right'; break;
                    }
                }
            });

            function gameLoop() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawWalls();
                drawPellets();
                drawGhosts();
                drawPacman();
                updatePacman();
                ghosts.forEach(ghost => updateAI(ghost, true));
                checkCollisions();
                requestAnimationFrame(gameLoop);
            }
            
            createPellets();
            setMode(false); // Start in AI Demo mode
            gameLoop();
        }
