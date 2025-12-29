(function () {
  // Simple ripple particle effect as a lightweight substitute for the provided complex fluid effect.
  // It attaches initFluid to window and uses a canvas with id 'fluid'.
  function initFluid() {
    const canvas = document.getElementById("fluid");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = Math.floor(window.innerWidth * devicePixelRatio));
    let h = (canvas.height = Math.floor(window.innerHeight * devicePixelRatio));
    canvas.style.width = "100dvw";
    canvas.style.height = "100dvh";
    ctx.scale(devicePixelRatio, devicePixelRatio);

    const particles = [];

    function resize() {
      const DPR = devicePixelRatio || 1;
      canvas.width = Math.floor(window.innerWidth * DPR);
      canvas.height = Math.floor(window.innerHeight * DPR);
      canvas.style.width = "100dvw";
      canvas.style.height = "100dvh";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    window.addEventListener("resize", resize);

    function addParticle(x, y) {
      particles.push({
        x,
        y,
        r: 4 + Math.random() * 8,
        life: 1,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        hue: Math.floor(200 + Math.random() * 120),
      });
    }

    let lastMove = 0;
    window.addEventListener("mousemove", (e) => {
      const now = Date.now();
      const x = e.clientX;
      const y = e.clientY;
      addParticle(x, y);
      lastMove = now;
    });

    window.addEventListener("touchstart", (e) => {
      const t = e.touches[0];
      addParticle(t.clientX, t.clientY);
    });

    function frame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // translucent overlay for trailing
      ctx.fillStyle = "rgba(0,0,0,0.12)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= 0.02;
        p.x += p.vx;
        p.y += p.vy;
        p.r += 0.3;
        const alpha = Math.max(0, p.life);

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2);
        grad.addColorStop(0, `hsla(${p.hue},90%,60%,${alpha})`);
        grad.addColorStop(0.5, `hsla(${p.hue},70%,40%,${alpha * 0.6})`);
        grad.addColorStop(1, `hsla(${p.hue},70%,20%,0)`);

        ctx.globalCompositeOperation = "lighter";
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        if (p.life <= 0 || p.r > 200) particles.splice(i, 1);
      }

      requestAnimationFrame(frame);
    }

    frame();
  }

  if (typeof window !== "undefined") {
    window.initFluid = initFluid;
    // auto-init on load when script is included directly
    if (
      document.readyState === "complete" ||
      document.readyState === "interactive"
    ) {
      setTimeout(initFluid, 0);
    } else {
      window.addEventListener("load", initFluid);
    }
  }
})();
