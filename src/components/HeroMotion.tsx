"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type HeroMotionProps = {
  index: string;
  scrollLabel: string;
  pauseLabel: string;
  playLabel: string;
  children: ReactNode;
};

interface Node3D {
  bx: number;
  by: number;
  bz: number;
  r: number;
  isHub: boolean;
  color: string;
  glowColor: string;
  ping: number;
  phase: number;
  speed: number;
}

interface Edge {
  source: number;
  target: number;
  isTrunk: boolean;
}

interface DataPacket {
  edgeIndex: number;
  direction: 1 | -1;
  progress: number;
  speed: number;
  color: string;
  size: number;
  trail: { x: number; y: number; alpha: number }[];
}

export function HeroMotion({ index, scrollLabel, pauseLabel, playLabel, children }: HeroMotionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("motion-paused", paused);
    return () => document.body.classList.remove("motion-paused");
  }, [paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)");

    let width = 0;
    let height = 0;
    let frame = 0;
    let started = performance.now();
    let lastTime = performance.now();

    // Mouse parallax tracking
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;
    let isDesktop = false;

    // Topology state
    let nodes: Node3D[] = [];
    let edges: Edge[] = [];
    let packets: DataPacket[] = [];
    let adjacency: number[][] = [];

    function buildTopology(w: number, h: number) {
      isDesktop = w >= 768;
      nodes = [];
      edges = [];
      packets = [];

      // 1. Core Enterprise Hubs (distinct architectural pillars)
      const hubDefinitions = [
        { bx: -0.36 * w, by: -0.16 * h, bz: 40, r: 5.5, color: "#347fcc", glow: "rgba(52, 127, 204, 0.45)" }, // Cloud Platform
        { bx: -0.3 * w, by: 0.22 * h, bz: -25, r: 5.0, color: "#22d3ee", glow: "rgba(34, 211, 238, 0.4)" },   // Data & ERP
        { bx: 0.06 * w, by: -0.34 * h, bz: 30, r: 5.2, color: "#347fcc", glow: "rgba(52, 127, 204, 0.4)" },  // Integration API
        { bx: 0.36 * w, by: -0.14 * h, bz: 45, r: 5.4, color: "#38bdf8", glow: "rgba(56, 189, 248, 0.45)" }, // Mobile / Web
        { bx: 0.31 * w, by: 0.22 * h, bz: -20, r: 5.0, color: "#347fcc", glow: "rgba(52, 127, 204, 0.4)" },  // Automation Core
        { bx: -0.05 * w, by: 0.36 * h, bz: 25, r: 4.8, color: "#6399b9", glow: "rgba(99, 153, 185, 0.35)" }, // Ops & Intelligence
      ];

      const activeHubs = isDesktop ? hubDefinitions : hubDefinitions.slice(0, 4);

      activeHubs.forEach((hub, i) => {
        nodes.push({
          bx: hub.bx,
          by: hub.by,
          bz: hub.bz,
          r: hub.r,
          isHub: true,
          color: hub.color,
          glowColor: hub.glow,
          ping: 0,
          phase: (i * Math.PI) / 3,
          speed: 0.8 + (i % 3) * 0.2,
        });
      });

      // 2. Peripheral Cluster Nodes (distributed around hubs and flanks, leaving center uncluttered)
      const satelliteCount = isDesktop ? 34 : 14;
      const seedRandom = (seed: number) => {
        const x = Math.sin(seed * 9999) * 10000;
        return x - Math.floor(x);
      };

      for (let i = 0; i < satelliteCount; i++) {
        const s = i + 1;
        // Distribute predominantly in left and right halves and edges
        const side = i % 2 === 0 ? -1 : 1;
        const flankSpreadX = (0.16 + seedRandom(s * 1.3) * 0.32) * w * side;
        const flankSpreadY = (seedRandom(s * 2.7) - 0.5) * 0.82 * h;
        const depthZ = (seedRandom(s * 3.1) - 0.5) * 220;

        // Colors chosen from Frentex technical palette
        const colors = ["#347fcc", "#6399b9", "#22d3ee", "#536b7e"];
        const color = colors[i % colors.length];

        nodes.push({
          bx: flankSpreadX,
          by: flankSpreadY,
          bz: depthZ,
          r: 2.0 + seedRandom(s * 4.9) * 1.8,
          isHub: false,
          color,
          glowColor: "rgba(52, 127, 204, 0.25)",
          ping: 0,
          phase: seedRandom(s * 5.7) * Math.PI * 2,
          speed: 0.6 + seedRandom(s * 6.1) * 0.8,
        });
      }

      // 3. Construct Edges (Trunk routes between hubs + local cluster edges)
      const hubCount = activeHubs.length;
      // Connect key hubs in an architectural loop and cross-links
      for (let i = 0; i < hubCount; i++) {
        const nextHub = (i + 1) % hubCount;
        edges.push({ source: i, target: nextHub, isTrunk: true });
        if (hubCount > 4 && i % 2 === 0) {
          edges.push({ source: i, target: (i + 2) % hubCount, isTrunk: true });
        }
      }

      // Connect satellites to nearest hubs and nearest satellites
      const maxDist = isDesktop ? 230 : 170;
      for (let i = hubCount; i < nodes.length; i++) {
        let connectedCount = 0;
        // Connect to nearest hub
        let nearestHub = 0;
        let minDistHub = Infinity;
        for (let hIdx = 0; hIdx < hubCount; hIdx++) {
          const dx = nodes[i].bx - nodes[hIdx].bx;
          const dy = nodes[i].by - nodes[hIdx].by;
          const dz = nodes[i].bz - nodes[hIdx].bz;
          const d = Math.hypot(dx, dy, dz);
          if (d < minDistHub) {
            minDistHub = d;
            nearestHub = hIdx;
          }
        }
        if (minDistHub < maxDist * 1.35) {
          edges.push({ source: i, target: nearestHub, isTrunk: false });
          connectedCount++;
        }

        // Connect to nearby satellites
        for (let j = hubCount; j < nodes.length; j++) {
          if (i === j) continue;
          const dx = nodes[i].bx - nodes[j].bx;
          const dy = nodes[i].by - nodes[j].by;
          const dz = nodes[i].bz - nodes[j].bz;
          const d = Math.hypot(dx, dy, dz);
          if (d < maxDist && connectedCount < 3) {
            // Check if edge already exists
            const exists = edges.some(
              (e) => (e.source === i && e.target === j) || (e.source === j && e.target === i)
            );
            if (!exists) {
              edges.push({ source: i, target: j, isTrunk: false });
              connectedCount++;
            }
          }
        }
      }

      // Pre-compute adjacency map for packet routing
      adjacency = Array.from({ length: nodes.length }, () => []);
      edges.forEach((edge, edgeIdx) => {
        adjacency[edge.source].push(edgeIdx);
        adjacency[edge.target].push(edgeIdx);
      });

      // 4. Spawn Active Data Packets
      const packetCount = isDesktop ? 14 : 6;
      for (let p = 0; p < packetCount; p++) {
        const edgeIdx = Math.floor(seedRandom(p * 7.7) * edges.length);
        const packetColors = ["#22d3ee", "#38bdf8", "#347fcc"];
        packets.push({
          edgeIndex: edgeIdx,
          direction: p % 2 === 0 ? 1 : -1,
          progress: seedRandom(p * 8.3),
          speed: 0.28 + seedRandom(p * 9.1) * 0.45,
          color: packetColors[p % packetColors.length],
          size: 2.2 + seedRandom(p * 11.2) * 1.0,
          trail: [],
        });
      }
    }

    function resize() {
      if (!canvas || !container) return;
      const bounds = container.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);
      context?.setTransform(scale, 0, 0, scale, 0, 0);

      buildTopology(width, height);
    }

    function handleMouseMove(e: MouseEvent) {
      if (!isDesktop || !container) return;
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      targetRotY = normX * 0.12;
      targetRotX = -normY * 0.08;
    }

    function handleMouseLeave() {
      targetRotX = 0;
      targetRotY = 0;
    }

    function drawTechGrid(ctx: CanvasRenderingContext2D, w: number, h: number) {
      // 1. Subtle horizontal and vertical tech coordinate grid
      ctx.save();
      ctx.strokeStyle = "rgba(52, 127, 204, 0.045)";
      ctx.lineWidth = 1;

      const gridSize = isDesktop ? 64 : 48;
      const startX = (w % gridSize) / 2;
      const startY = (h % gridSize) / 2;

      ctx.beginPath();
      for (let x = startX; x <= w; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = startY; y <= h; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();

      // 2. Micro-crosshairs (+) at alternating intersections
      ctx.strokeStyle = "rgba(52, 127, 204, 0.16)";
      ctx.lineWidth = 1;
      const crossSize = 4;
      ctx.beginPath();
      for (let x = startX; x <= w; x += gridSize * 2) {
        for (let y = startY; y <= h; y += gridSize * 2) {
          ctx.moveTo(x - crossSize, y);
          ctx.lineTo(x + crossSize, y);
          ctx.moveTo(x, y - crossSize);
          ctx.lineTo(x, y + crossSize);
        }
      }
      ctx.stroke();

      // 3. Faint orbital depth circles
      ctx.strokeStyle = "rgba(52, 127, 204, 0.035)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(w / 2, h * 0.45, Math.min(w, h) * 0.38, 0, Math.PI * 2);
      ctx.arc(w / 2, h * 0.45, Math.min(w, h) * 0.58, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();
    }

    function draw(seconds: number, dt: number) {
      if (!context || width === 0 || height === 0) return;
      context.clearRect(0, 0, width, height);

      const isStatic = reduced.matches || paused;
      const t = isStatic ? 1.4 : seconds;

      // 1. Draw Digital Background Grid & Coordinate Matrix
      drawTechGrid(context, width, height);

      // Smooth camera parallax
      currentRotX += (targetRotX - currentRotX) * 0.06;
      currentRotY += (targetRotY - currentRotY) * 0.06;

      // Subtle autonomous floating yaw & pitch
      const autoRotY = Math.sin(t * 0.22) * 0.04;
      const autoRotX = Math.cos(t * 0.18) * 0.025;
      const rotX = isStatic ? 0 : currentRotX + autoRotX;
      const rotY = isStatic ? 0 : currentRotY + autoRotY;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const cx = width / 2;
      const cy = height * 0.48;
      const fov = 720;

      // Elliptical center text protection zone
      const textRadiusX = width * (isDesktop ? 0.32 : 0.42);
      const textRadiusY = height * (isDesktop ? 0.28 : 0.34);
      const textCenterY = height * 0.46;

      // 2. Project 3D Nodes to 2D Screen
      interface ProjectedNode {
        sx: number;
        sy: number;
        sz: number;
        scale: number;
        alpha: number;
        node: Node3D;
      }

      const projected: ProjectedNode[] = nodes.map((node) => {
        // Natural micro-harmonic drift
        const driftX = isStatic ? 0 : Math.sin(t * node.speed + node.phase) * 6;
        const driftY = isStatic ? 0 : Math.cos(t * node.speed * 0.8 + node.phase) * 5;
        const driftZ = isStatic ? 0 : Math.sin(t * node.speed * 0.6 + node.phase) * 8;

        const x0 = node.bx + driftX;
        const y0 = node.by + driftY;
        const z0 = node.bz + driftZ;

        // Apply 3D rotation
        const x1 = x0 * cosY + z0 * sinY;
        const z1 = -x0 * sinY + z0 * cosY;
        const y1 = y0 * cosX - z1 * sinX;
        const z2 = y0 * sinX + z1 * cosX;

        const scale = fov / (fov + z2);
        const sx = cx + x1 * scale;
        const sy = cy + y1 * scale;

        // Text proximity attenuation: seamlessly soften elements behind the headline
        const ndx = (sx - cx) / textRadiusX;
        const ndy = (sy - textCenterY) / textRadiusY;
        const distSq = ndx * ndx + ndy * ndy;
        const textFade = Math.min(1, Math.max(0.18, Math.pow(distSq, 0.75)));

        const depthFade = Math.max(0.3, Math.min(1.0, (z2 + 250) / 450));
        const alpha = depthFade * textFade;

        // Ping decay
        if (!isStatic && node.ping > 0) {
          node.ping = Math.max(0, node.ping - dt * 1.8);
        }

        return { sx, sy, sz: z2, scale, alpha, node };
      });

      // 3. Render Interconnecting Edges
      edges.forEach((edge) => {
        const p1 = projected[edge.source];
        const p2 = projected[edge.target];
        if (!p1 || !p2) return;

        const edgeAlpha = Math.min(p1.alpha, p2.alpha);
        if (edgeAlpha <= 0.02) return;

        context.save();
        context.beginPath();
        context.moveTo(p1.sx, p1.sy);
        context.lineTo(p2.sx, p2.sy);

        // Trunk edges are slightly firmer, satellite edges are razor thin
        if (edge.isTrunk) {
          context.lineWidth = 1.35 * Math.min(p1.scale, p2.scale);
          context.strokeStyle = `rgba(52, 127, 204, ${edgeAlpha * 0.4})`;
        } else {
          context.lineWidth = 0.9 * Math.min(p1.scale, p2.scale);
          context.strokeStyle = `rgba(99, 153, 185, ${edgeAlpha * 0.25})`;
        }
        context.stroke();
        context.restore();
      });

      // 4. Update & Render Active Data Packets (flowing along connections)
      if (!isStatic) {
        packets.forEach((pkt) => {
          const edge = edges[pkt.edgeIndex];
          if (!edge) return;
          const pSource = projected[pkt.direction === 1 ? edge.source : edge.target];
          const pTarget = projected[pkt.direction === 1 ? edge.target : edge.source];
          if (!pSource || !pTarget) return;

          pkt.progress += pkt.speed * dt;

          const currX = pSource.sx + (pTarget.sx - pSource.sx) * pkt.progress;
          const currY = pSource.sy + (pTarget.sy - pSource.sy) * pkt.progress;
          const currScale = pSource.scale + (pTarget.scale - pSource.scale) * pkt.progress;
          const currAlpha = Math.min(pSource.alpha, pTarget.alpha);

          // Update motion trail
          pkt.trail.unshift({ x: currX, y: currY, alpha: currAlpha });
          if (pkt.trail.length > 4) pkt.trail.pop();

          // Render trail
          context.save();
          for (let ti = pkt.trail.length - 1; ti >= 0; ti--) {
            const tr = pkt.trail[ti];
            const trailAlpha = tr.alpha * (1 - ti / pkt.trail.length) * 0.55;
            context.beginPath();
            context.arc(tr.x, tr.y, (pkt.size * 0.65 + (4 - ti) * 0.25) * currScale, 0, Math.PI * 2);
            context.fillStyle = pkt.color.replace(")", `, ${trailAlpha})`).replace("rgb", "rgba");
            context.fill();
          }

          // Render packet head
          context.beginPath();
          context.arc(currX, currY, pkt.size * currScale, 0, Math.PI * 2);
          context.fillStyle = "#ffffff";
          context.shadowColor = pkt.color;
          context.shadowBlur = 8 * currScale;
          context.fill();

          context.beginPath();
          context.arc(currX, currY, (pkt.size + 1.2) * currScale, 0, Math.PI * 2);
          context.fillStyle = pkt.color.replace(")", `, ${currAlpha * 0.8})`).replace("rgb", "rgba");
          context.fill();
          context.restore();

          // When packet reaches destination node, trigger ripple and route to next edge
          if (pkt.progress >= 1.0) {
            const targetNodeIdx = pkt.direction === 1 ? edge.target : edge.source;
            nodes[targetNodeIdx].ping = 1.0;

            const possibleEdges = adjacency[targetNodeIdx];
            if (possibleEdges && possibleEdges.length > 0) {
              const nextEdgeIdx = possibleEdges[Math.floor(Math.random() * possibleEdges.length)];
              const nextEdge = edges[nextEdgeIdx];
              pkt.edgeIndex = nextEdgeIdx;
              pkt.direction = nextEdge.source === targetNodeIdx ? 1 : -1;
              pkt.progress = 0;
              pkt.trail = [];
            } else {
              pkt.progress = 0;
            }
          }
        });
      }

      // 5. Render Nodes (sorted by depth Z for correct perspective occlusion)
      const sorted = [...projected].sort((a, b) => a.sz - b.sz);

      sorted.forEach(({ sx, sy, scale, alpha, node }) => {
        if (alpha <= 0.02) return;

        context.save();

        const baseR = node.r * scale;

        if (node.isHub) {
          // Major Enterprise Hub: Concentric pulsing rings + luminous core
          const pulse = Math.sin(t * 2.2 + node.phase) * 0.15;
          const outerR = baseR * (1.8 + pulse);
          const innerR = baseR * (1.3 + pulse * 0.5);

          // Ping shockwave ripple
          if (node.ping > 0) {
            const pingR = baseR * (2.2 + (1 - node.ping) * 2.6);
            context.beginPath();
            context.arc(sx, sy, pingR, 0, Math.PI * 2);
            context.strokeStyle = `rgba(34, 211, 238, ${node.ping * 0.65 * alpha})`;
            context.lineWidth = 1.5;
            context.stroke();
          }

          // Outer atmospheric aura
          const auraGrad = context.createRadialGradient(sx, sy, baseR * 0.3, sx, sy, outerR * 2.2);
          auraGrad.addColorStop(0, node.glowColor.replace(/[\d.]+\)$/, `${0.55 * alpha})`));
          auraGrad.addColorStop(0.5, node.glowColor.replace(/[\d.]+\)$/, `${0.2 * alpha})`));
          auraGrad.addColorStop(1, "rgba(52, 127, 204, 0)");
          context.beginPath();
          context.arc(sx, sy, outerR * 2.2, 0, Math.PI * 2);
          context.fillStyle = auraGrad;
          context.fill();

          // Outer thin tech ring
          context.beginPath();
          context.arc(sx, sy, outerR, 0, Math.PI * 2);
          context.strokeStyle = `rgba(52, 127, 204, ${0.45 * alpha})`;
          context.lineWidth = 1;
          context.stroke();

          // Inner ring
          context.beginPath();
          context.arc(sx, sy, innerR, 0, Math.PI * 2);
          context.strokeStyle = `rgba(34, 211, 238, ${0.7 * alpha})`;
          context.lineWidth = 1.2;
          context.stroke();

          // Core node body
          context.beginPath();
          context.arc(sx, sy, baseR, 0, Math.PI * 2);
          context.fillStyle = node.color;
          context.shadowColor = node.color;
          context.shadowBlur = 10 * scale;
          context.fill();

          // Crisp specular center
          context.beginPath();
          context.arc(sx - baseR * 0.25, sy - baseR * 0.25, baseR * 0.45, 0, Math.PI * 2);
          context.fillStyle = `rgba(255, 255, 255, ${0.9 * alpha})`;
          context.fill();
        } else {
          // Secondary Satellite Node
          // Ping ripple if hit
          if (node.ping > 0) {
            context.beginPath();
            context.arc(sx, sy, baseR * (1.6 + (1 - node.ping) * 1.8), 0, Math.PI * 2);
            context.strokeStyle = `rgba(52, 127, 204, ${node.ping * 0.5 * alpha})`;
            context.lineWidth = 1;
            context.stroke();
          }

          // Node body with depth highlight
          context.beginPath();
          context.arc(sx, sy, baseR, 0, Math.PI * 2);
          context.fillStyle = node.color;
          context.shadowColor = node.color;
          context.shadowBlur = 4 * scale;
          context.fill();

          // Outer crisp ring for foreground satellites
          if (scale > 1.05) {
            context.beginPath();
            context.arc(sx, sy, baseR * 1.6, 0, Math.PI * 2);
            context.strokeStyle = `rgba(52, 127, 204, ${0.28 * alpha})`;
            context.lineWidth = 0.8;
            context.stroke();
          }

          // Micro highlight
          context.beginPath();
          context.arc(sx, sy, baseR * 0.45, 0, Math.PI * 2);
          context.fillStyle = `rgba(255, 255, 255, ${0.85 * alpha})`;
          context.fill();
        }

        context.restore();
      });
    }

    function tick(now: number) {
      if (document.hidden || reduced.matches || paused) {
        frame = 0;
        draw(0, 0);
        return;
      }

      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const seconds = (now - started) / 1000;

      draw(seconds, dt);
      frame = requestAnimationFrame(tick);
    }

    function resume() {
      if (!frame && !document.hidden && !reduced.matches && !paused) {
        started = performance.now();
        lastTime = performance.now();
        frame = requestAnimationFrame(tick);
      } else if (reduced.matches || paused) {
        draw(0, 0);
      }
    }

    function onResize() {
      resize();
      draw(0, 0);
    }

    resize();
    draw(0, 0);
    resume();

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", resume);
    reduced.addEventListener?.("change", resume);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", resume);
      reduced.removeEventListener?.("change", resume);
    };
  }, [paused]);

  return (
    <section ref={containerRef} className="studio-hero">
      <div className="hero-atmosphere" aria-hidden="true"></div>
      <canvas ref={canvasRef} className="motion-backdrop" aria-hidden="true"></canvas>
      <div className="hero-clarity-shield" aria-hidden="true"></div>
      {children}
      <span className="hero-image-rights" aria-hidden="true">
        © Frentex Tech
      </span>
      <div className="hero-foot wrap">
        <span className="hero-index" dir="ltr">
          01 <i></i> {index}
        </span>
        <button
          type="button"
          className="motion-toggle"
          aria-pressed={paused}
          aria-label={paused ? playLabel : pauseLabel}
          onClick={() => setPaused((value) => !value)}
        >
          <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span> {paused ? playLabel : pauseLabel}
        </button>
        <a href="#solutions" className="scroll-cue" aria-label={scrollLabel}>
          ↓
        </a>
      </div>
    </section>
  );
}
