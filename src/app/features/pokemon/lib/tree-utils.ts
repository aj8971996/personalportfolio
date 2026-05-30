import { PathStep, PokemonEntry, SvgData, SvgLink, SvgNodeData, SvgPos, TreeNode } from './types';

export const STEP_LABELS = ['PLAYSTYLE', 'MEGA', 'PARTNER', 'SPEED', 'FINISH'];

export const PAD_POOL = ['garchomp', 'incineroar', 'amoonguss', 'rotomWash', 'whimsicott', 'rillaboom'];

export const EDU_MESSAGES = [
  'A <strong>decision tree</strong> is a flowchart-like structure. Each <strong>internal node</strong> tests an attribute, each <strong>branch</strong> is an outcome, and each <strong>leaf</strong> is a final classification — here, a full team build.',
  'You just traversed the <strong>root</strong>. The branch you took narrows the search space — only the team builds under this branch remain reachable.',
  'This is a <strong>depth-2 internal node</strong>. The chosen Mega Evolution determines which Pokémon synergize. ML decision trees split on the attribute that maximizes <strong>information gain</strong>.',
  'Each successive split <strong>reduces entropy</strong>. Early decisions (root, depth 1) carry the most predictive weight; later decisions are fine-tuning.',
  "You're one step from a <strong>leaf</strong>. The 2 remaining choices represent the lowest-entropy split: both produce valid teams, optimized for different matchups.",
];

export function countLeaves(node: TreeNode | null | undefined): number {
  if (!node?.options?.length) return 1;
  return node.options.reduce((sum, opt) => {
    if (opt.terminal) return sum + 1;
    if (opt.next) return sum + countLeaves(opt.next);
    return sum + 1;
  }, 0);
}

export function pickRole(idx: number, isMega: boolean): string {
  if (isMega) return 'MEGA · CENTERPIECE';
  const roles = ['LEAD ATTACKER', 'SECONDARY ATTACKER', 'SPEED CONTROL', 'PIVOT / SUPPORT', 'COVERAGE', 'FINISHER'];
  return roles[idx] ?? 'FINISHER';
}

export function buildSvgData(
  path: PathStep[],
  currentNode: TreeNode | null,
  tree: TreeNode,
): SvgData {
  const W = 600, H = 380, yPad = 30;
  const NODE_W = 84, NODE_H = 22;

  const chain: Array<{ node: TreeNode; chosenIdx: number }> = [];
  let node: TreeNode | null = tree;
  for (const p of path) {
    const optIdx: number = node!.options.findIndex(o => o.id === p.optionId);
    chain.push({ node: node!, chosenIdx: optIdx });
    node = node!.options[optIdx]?.next ?? null;
    if (!node) break;
  }

  if (currentNode && path.length < 5) {
    const alreadyIn = chain.some(c => c.node.id === currentNode.id);
    if (!alreadyIn) chain.push({ node: currentNode, chosenIdx: -1 });
  }

  const levelCount = Math.max(5, chain.length + 1);
  const yStep = (H - yPad * 2) / (levelCount - 1);

  const positions: SvgPos[] = [];
  let lastChosenPos: SvgPos | null = null;

  const rootPos: SvgPos = {
    x: W / 2, y: yPad,
    label: 'ROOT',
    kind: chain.length > 0 ? 'done' : 'sibling',
    parent: null,
    animated: chain.length === 0,
    isRoot: true,
  };
  positions.push(rootPos);
  lastChosenPos = rootPos;

  for (let i = 0; i < chain.length; i++) {
    const c = chain[i];
    const y = yPad + (i + 1) * yStep;
    const opts = c.node.options;
    const slotW = W / (opts.length + 1);
    const levelPositions: SvgPos[] = [];

    opts.forEach((opt, idx) => {
      const isChosen  = c.chosenIdx === idx;
      const isCurrent = c.chosenIdx === -1;
      const kind: SvgPos['kind'] = isChosen ? 'done' : isCurrent ? 'sibling' : 'unexplored';
      levelPositions.push({
        x: slotW * (idx + 1), y,
        label: opt.label.replace(/Mega /g, 'M·').slice(0, 14),
        kind,
        parent: lastChosenPos,
        animated: isCurrent,
        isRoot: false,
        opt,
      });
    });

    positions.push(...levelPositions);
    if (c.chosenIdx >= 0) lastChosenPos = levelPositions[c.chosenIdx];
  }

  const links: SvgLink[] = positions
    .filter(p => p.parent !== null)
    .map(p => {
      const x1 = p.parent!.x, y1 = p.parent!.y + NODE_H / 2;
      const x2 = p.x,         y2 = p.y - NODE_H / 2;
      const midY = (y1 + y2) / 2;
      return {
        d: `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`,
        active: p.kind === 'done',
      };
    });

  const nodes: SvgNodeData[] = positions.map(pos => ({
    cx: pos.x,
    cy: pos.y,
    rect: { x: pos.x - NODE_W / 2, y: pos.y - NODE_H / 2, width: NODE_W, height: NODE_H },
    kind: pos.kind,
    animated: pos.animated,
    label: pos.label,
    isRoot: pos.isRoot,
  }));

  return { links, nodes };
}

// ── SVG export ───────────────────────────────────────────────────────────────

export function buildExportSvg(
  path: PathStep[],
  team: string[],
  finalRole: string,
  archetype: string,
  monLookup: (id: string) => PokemonEntry | undefined,
  spriteUrl: (id: string) => string,
  displayName: (id: string) => string,
  tree: TreeNode,
): string {
  const C = {
    bg: '#09090B', surface: '#111117', raised: '#18181F',
    border: 'rgba(255,255,255,0.07)', amber: '#F59E0B',
    indigo: '#818CF8', txt: '#F1F5F9', sec: '#94A3B8', mut: '#475569',
  };
  const MONO = "'JetBrains Mono','Courier New',monospace";
  const DISP = "'Space Grotesk',system-ui,sans-serif";

  // ── Reconstruct decision chain (same algorithm as buildSvgData)
  const chain: Array<{ node: TreeNode; chosenIdx: number }> = [];
  let walkNode: TreeNode | null = tree;
  for (const p of path) {
    const idx: number = walkNode!.options.findIndex(o => o.id === p.optionId);
    chain.push({ node: walkNode!, chosenIdx: idx });
    walkNode = walkNode!.options[idx]?.next ?? null;
    if (!walkNode) break;
  }

  // ── Layout constants
  const W       = 1000;
  const MARGIN  = 44;
  const NW_C    = 128; const NH_C = 48;  // chosen node w/h
  const NW_U    = 90;  const NH_U = 32;  // unchosen node w/h
  const SP      = 64;  const SP_GAP = 6; // sprite size + gap above node
  const ROOT_CY = 110;
  const LVL_STP = 172; // vertical distance between level node centers

  const levelCY = (i: number) => ROOT_CY + (i + 1) * LVL_STP;

  // Center X for slot j of N items; caps slot width to avoid over-spreading
  const slotCX = (j: number, N: number): number => {
    const innerW = W - 2 * MARGIN;
    const slotW  = Math.min(innerW / N, 220);
    return (W - slotW * N) / 2 + slotW * (j + 0.5);
  };

  const trunc = (s: string, n: number) => s.length > n ? s.slice(0, n - 1) + '…' : s;

  const typeColors: Record<string, string> = {
    normal:'#a8a878', fire:'#f08030', water:'#6890f0', electric:'#f8d030',
    grass:'#78c850', ice:'#98d8d8', fighting:'#c03028', poison:'#a040a0',
    ground:'#e0c068', flying:'#a890f0', psychic:'#f85888', bug:'#a8b820',
    rock:'#b8a038', ghost:'#705898', dragon:'#7038f8', dark:'#705848',
    steel:'#b8b8d0', fairy:'#ee99ac',
  };

  // Pre-compute canvas height
  const lastLvlCY  = chain.length > 0 ? levelCY(chain.length - 1) : ROOT_CY;
  const treeBottom = lastLvlCY + NH_C / 2;
  const TEAM_N     = Math.min(team.length, 6);
  const TC_W = 130; const TC_H = 90; const TC_GAP = 10;
  const TEAM_TOP   = treeBottom + 54;
  const H          = TEAM_TOP + TC_H + 52;

  const els: string[] = [];

  // Background + dot grid
  els.push(
    `<defs><pattern id="eg" width="24" height="24" patternUnits="userSpaceOnUse">` +
    `<circle cx="1" cy="1" r="0.8" fill="${C.indigo}" opacity="0.14"/></pattern></defs>` +
    `<rect width="${W}" height="${H}" fill="${C.bg}"/>` +
    `<rect width="${W}" height="${H}" fill="url(#eg)"/>`,
  );

  // Header
  const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  els.push(
    `<rect x="${MARGIN}" y="12" width="${W - MARGIN * 2}" height="56" rx="8" fill="${C.surface}" stroke="${C.border}"/>` +
    `<rect x="${MARGIN}" y="12" width="3" height="56" rx="1.5" fill="${C.amber}"/>` +
    `<text x="${MARGIN + 16}" y="34" font-family="${MONO}" font-size="9" fill="${C.mut}" letter-spacing="2">ALEXBARKUS.DEV · VGC TEAM BUILD · REG M-A DOUBLES</text>` +
    `<text x="${MARGIN + 16}" y="56" font-family="${DISP}" font-size="18" font-weight="700" fill="${C.txt}">${esc(archetype)} · ${esc(finalRole)}</text>` +
    `<text x="${W - MARGIN - 8}" y="56" font-family="${MONO}" font-size="9" fill="${C.mut}" text-anchor="end">${dateStr}</text>`,
  );

  // Root node
  els.push(
    `<rect x="${W / 2 - 52}" y="${ROOT_CY - 20}" width="104" height="40" rx="6" fill="${C.surface}" stroke="${C.amber}" stroke-width="1.5"/>` +
    `<text x="${W / 2}" y="${ROOT_CY + 6}" font-family="${MONO}" font-size="11" font-weight="700" fill="${C.amber}" text-anchor="middle" letter-spacing="2">ROOT</text>`,
  );

  // Decision levels: connectors then nodes
  let parentCX     = W / 2;
  let parentBottom = ROOT_CY + 20;

  for (let i = 0; i < chain.length; i++) {
    const { node, chosenIdx } = chain[i];
    const opts = node.options;
    const N    = opts.length;
    const cy   = levelCY(i);
    const midY = (parentBottom + cy - NH_C / 2) / 2;

    // Connectors (drawn first, behind nodes)
    for (let j = 0; j < N; j++) {
      const cx       = slotCX(j, N);
      const isChosen = j === chosenIdx;
      const childTop = isChosen ? cy - NH_C / 2 : cy - NH_U / 2;
      els.push(
        `<path d="M ${parentCX} ${parentBottom} L ${parentCX} ${midY} L ${cx} ${midY} L ${cx} ${childTop}" ` +
        `fill="none" stroke="${isChosen ? C.amber : C.mut}" ` +
        `stroke-width="${isChosen ? 1.5 : 0.7}" opacity="${isChosen ? 1 : 0.32}"` +
        `${isChosen ? '' : ' stroke-dasharray="4 3"'}/>`,
      );
    }

    // Nodes + sprites
    for (let j = 0; j < N; j++) {
      const opt      = opts[j];
      const cx       = slotCX(j, N);
      const isChosen = j === chosenIdx;

      if (isChosen) {
        const monId     = opt.mon ?? opt.fillers?.[0];
        const stepLabel = STEP_LABELS[i] ?? `STEP ${i + 1}`;
        const nodeTop   = cy - NH_C / 2;

        if (monId) {
          const sx = Math.round(cx - SP / 2);
          const sy = nodeTop - SP_GAP - SP;
          els.push(`<text x="${cx}" y="${sy - 5}" font-family="${MONO}" font-size="8" fill="${C.mut}" text-anchor="middle" letter-spacing="1.5">${esc(stepLabel)}</text>`);
          els.push(`<image href="${spriteUrl(monId)}" x="${sx}" y="${sy}" width="${SP}" height="${SP}" image-rendering="pixelated" preserveAspectRatio="xMidYMid meet"/>`);
        } else {
          els.push(`<text x="${cx}" y="${nodeTop - 14}" font-family="${MONO}" font-size="8" fill="${C.mut}" text-anchor="middle" letter-spacing="1.5">${esc(stepLabel)}</text>`);
          els.push(`<text x="${cx}" y="${nodeTop - 3}" font-family="${MONO}" font-size="13" fill="${C.sec}" text-anchor="middle">${opt.icon}</text>`);
        }

        // Chosen box (amber border + top bar)
        els.push(
          `<rect x="${cx - NW_C / 2}" y="${nodeTop}" width="${NW_C}" height="${NH_C}" rx="6" fill="${C.raised}" stroke="${C.amber}" stroke-width="1.5"/>` +
          `<rect x="${cx - NW_C / 2}" y="${nodeTop}" width="${NW_C}" height="3" rx="1.5" fill="${C.amber}"/>` +
          `<text x="${cx}" y="${cy + 7}" font-family="${DISP}" font-size="11" font-weight="600" fill="${C.txt}" text-anchor="middle">${esc(trunc(opt.label, 16))}</text>`,
        );

        parentCX     = cx;
        parentBottom = cy + NH_C / 2;
      } else {
        // Unchosen: small muted box
        const uy = cy - NH_U / 2;
        els.push(
          `<rect x="${cx - NW_U / 2}" y="${uy}" width="${NW_U}" height="${NH_U}" rx="4" fill="${C.surface}" stroke="rgba(71,85,105,0.32)" stroke-width="0.8"/>` +
          `<text x="${cx}" y="${cy + 3}" font-family="${MONO}" font-size="7.5" fill="${C.mut}" text-anchor="middle">${esc(trunc(opt.label, 11))}</text>`,
        );
      }
    }
  }

  // Team section
  const teamTotalW = TEAM_N * TC_W + (TEAM_N - 1) * TC_GAP;
  const teamXStart = (W - teamTotalW) / 2;

  els.push(
    `<line x1="${MARGIN}" y1="${TEAM_TOP - 22}" x2="${W - MARGIN}" y2="${TEAM_TOP - 22}" stroke="${C.border}" stroke-width="1"/>` +
    `<text x="${MARGIN}" y="${TEAM_TOP - 8}" font-family="${MONO}" font-size="9" fill="${C.indigo}" letter-spacing="2">// FINAL TEAM · ${esc(archetype.toUpperCase())} · ${esc(finalRole.toUpperCase())}</text>`,
  );

  team.slice(0, TEAM_N).forEach((monId, i) => {
    const mon = monLookup(monId);
    if (!mon) return;
    const x    = Math.round(teamXStart + i * (TC_W + TC_GAP));
    const y    = TEAM_TOP + 6;
    const name = esc(trunc(displayName(monId), 14));

    els.push(
      `<rect x="${x}" y="${y}" width="${TC_W}" height="${TC_H}" rx="6" fill="${C.raised}" stroke="${C.border}"/>` +
      `<rect x="${x}" y="${y}" width="${TC_W}" height="2.5" rx="1.5" fill="${mon.mega ? C.amber : C.indigo}"/>` +
      `<image href="${spriteUrl(monId)}" x="${x + TC_W / 2 - 28}" y="${y + 4}" width="56" height="48" image-rendering="pixelated" preserveAspectRatio="xMidYMid meet"/>` +
      `<text x="${x + TC_W / 2}" y="${y + 62}" font-family="${DISP}" font-size="10" font-weight="600" fill="${C.txt}" text-anchor="middle">${name}</text>`,
    );

    const types     = mon.types ?? [];
    const pillW     = 46;
    const pillTotal = types.length * pillW + (types.length - 1) * 4;
    types.forEach((t, ti) => {
      const tc = typeColors[t] ?? '#888';
      const px = x + (TC_W - pillTotal) / 2 + ti * (pillW + 4);
      els.push(
        `<rect x="${px}" y="${y + 70}" width="${pillW}" height="11" rx="5.5" fill="${tc}"/>` +
        `<text x="${px + pillW / 2}" y="${y + 78}" font-family="${MONO}" font-size="6.5" fill="#09090B" font-weight="700" text-anchor="middle">${t.toUpperCase()}</text>`,
      );
    });
  });

  // Footer
  const FOOT_Y = H - 36;
  els.push(
    `<line x1="${MARGIN}" y1="${FOOT_Y}" x2="${W - MARGIN}" y2="${FOOT_Y}" stroke="${C.border}" stroke-width="1"/>` +
    `<text x="${MARGIN}" y="${FOOT_Y + 18}" font-family="${MONO}" font-size="8" fill="${C.mut}">alexbarkus.dev · VGC Decision Tree Team Builder · Sprites via Pokémon Showdown · Fan project — not affiliated with Nintendo / Game Freak</text>` +
    `<text x="${W - MARGIN}" y="${FOOT_Y + 18}" font-family="${MONO}" font-size="8" fill="${C.mut}" text-anchor="end">REG M-A · DOUBLES · LV.50</text>`,
  );

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
     viewBox="0 0 ${W} ${H}" width="100%">
  ${els.join('\n  ')}
</svg>`;
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
