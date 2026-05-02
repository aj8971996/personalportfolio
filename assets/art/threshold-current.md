---
title: Threshold Current
movement: Generative Systems
medium: Particle system / Perlin noise vector field / p5.js
seed-range: 0–9999
year: 2026
---

# Threshold Current

Every signal is either in scope or out of scope. The hard part is the boundary.

This piece renders a Perlin noise vector field as a current — particles as signals, each one moving through a landscape of competing forces. A sinusoidal threshold line divides the canvas: above it is amber, the color of a decision made. Below it is indigo, the color of a decision deferred. At the line itself, particles stall in gray uncertainty before the current pulls them one way or the other.

The threshold isn't straight. It breathes at three golden-ratio frequencies, shifting slowly over time. What's in scope now may drift out of scope as the project evolves. What looks like a clear boundary from the outside is, in practice, a moving target.

The system is deterministic. Every seed produces the same piece, every time. Same noise field, same threshold behavior, same particle trajectories. What looks like chaos is fully reproducible — the same way a well-specified scope document should be.

Parameters let you tune the signal density, trail persistence, field complexity, and threshold volatility. More particles at slower speeds produce something like a river delta. Fewer at higher speeds produce something like interference patterns in a signal chain.

The name comes from the moment before a decision: the current that carries a signal toward a threshold, where classification happens. ScopeOrNope runs this math in production. This piece makes it visible.

---

*Each seed (0–9999) is a unique composition. The algorithm is fixed; the input determines the output.*
