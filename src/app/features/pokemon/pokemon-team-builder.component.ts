import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { PathStep, TreeNode, SvgData } from './lib/types';
import { MON, getSpriteUrl } from './lib/pokemon-data';
import { TREE } from './lib/tree-data';
import {
  STEP_LABELS, PAD_POOL, EDU_MESSAGES,
  countLeaves, pickRole, buildSvgData, buildExportSvg,
} from './lib/tree-utils';

@Component({
  selector: 'app-pokemon-team-builder',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pokemon-team-builder.component.html',
  styleUrl: './pokemon-team-builder.component.scss',
})
export class PokemonTeamBuilderComponent implements OnInit {
  // ── State ──────────────────────────────────────────────────────────────────
  path: PathStep[] = [];
  currentNode: TreeNode = TREE;
  team: string[] = [];
  finalRole: string | null = null;

  // expose to template
  readonly STEP_LABELS = STEP_LABELS;
  readonly MON = MON;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {}

  // ── Computed helpers ───────────────────────────────────────────────────────

  get isTerminal(): boolean { return this.finalRole !== null; }

  get progressSteps() {
    return STEP_LABELS.map((label, i) => ({
      label,
      done:   i < this.path.length,
      active: i === this.path.length && !this.isTerminal,
    }));
  }

  get breadcrumb() {
    return this.path.map(p => p.option.label);
  }

  get svgData(): SvgData {
    return buildSvgData(this.path, this.isTerminal ? null : this.currentNode, TREE);
  }

  get treeStats() {
    return {
      depth:    this.path.length,
      branches: this.isTerminal ? 0 : this.currentNode.options.length,
      leaves:   this.isTerminal ? 1 : countLeaves(this.currentNode),
      pathLen:  this.path.length,
    };
  }

  get eduMessage(): SafeHtml {
    const msg = EDU_MESSAGES[Math.min(this.path.length, EDU_MESSAGES.length - 1)];
    return this.sanitizer.bypassSecurityTrustHtml(msg);
  }

  get archetypeLabel(): string {
    return this.path[0]?.option.label ?? 'Custom';
  }

  get decisionPathLabel(): string {
    return this.path.map(p => p.option.label).join(' → ');
  }

  // ── Actions ────────────────────────────────────────────────────────────────

  choose(optionId: string): void {
    const opt = this.currentNode.options.find(o => o.id === optionId);
    if (!opt) return;

    this.path = [...this.path, {
      nodeId: this.currentNode.id,
      optionId: opt.id,
      option: opt,
      depth: this.currentNode.depth,
    }];

    if (opt.mon) this.team = [...this.team, opt.mon];

    if (opt.terminal) {
      const fillerTeam = [...this.team];
      for (const f of (opt.fillers ?? [])) fillerTeam.push(f);
      for (const p of PAD_POOL) {
        if (fillerTeam.length >= 6) break;
        if (!fillerTeam.includes(p)) fillerTeam.push(p);
      }
      this.team = fillerTeam.slice(0, 6);
      this.finalRole = opt.finisherRole ?? 'Custom Build';
      return;
    }

    if (opt.next) this.currentNode = opt.next;
  }

  stepBack(): void {
    if (!this.path.length) return;

    const last = this.path[this.path.length - 1];
    this.path = this.path.slice(0, -1);
    this.finalRole = null;

    // Remove last mon if it was added by this step
    if (last.option.mon && this.team[this.team.length - 1] === last.option.mon) {
      this.team = this.team.slice(0, -1);
    } else {
      // Terminal step: clear filler team back to pre-terminal state
      this.team = this.team.filter(m => !last.option.fillers?.includes(m));
    }

    // Rebuild currentNode from root
    let node: TreeNode = TREE;
    for (const p of this.path) {
      const opt = node.options.find(o => o.id === p.optionId);
      if (opt?.next) node = opt.next;
    }
    this.currentNode = node;
  }

  reset(): void {
    this.path = [];
    this.currentNode = TREE;
    this.team = [];
    this.finalRole = null;
  }

  exportTeamSvg(): void {
    const svg = buildExportSvg(
      this.path,
      this.team,
      this.finalRole ?? 'Custom Build',
      this.archetypeLabel,
      (id) => MON[id],
      (id) => getSpriteUrl(id, false),
      (id) => this.monName(id),
      TREE,
    );
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `vgc-team-${this.archetypeLabel.toLowerCase().replace(/\s+/g, '-')}.svg`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 300);
  }

  exportTeam(): void {
    const lines = [
      '# POKÉMON CHAMPIONS — REG M-A TEAM',
      `# Built via decision tree (${this.finalRole})`,
      '',
    ];
    for (const monId of this.team) {
      const mon = MON[monId];
      if (!mon) continue;
      const name = mon.name ?? (monId.charAt(0).toUpperCase() + monId.slice(1));
      lines.push(`${name} @ ${mon.item || '—'}`);
      if (mon.ability) lines.push(`Ability: ${mon.ability}`);
      lines.push('Level: 50');
      for (const move of (mon.moves ?? [])) lines.push(`- ${move}`);
      lines.push('');
    }
    lines.push('# Decision path:');
    for (const p of this.path) lines.push(`#   • ${p.option.label}`);

    const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'champions_team.txt';
    a.click();
    URL.revokeObjectURL(url);
  }

  // ── Template helpers ───────────────────────────────────────────────────────

  typeColor(type: string): string { return `var(--poke-t-${type})`; }

  spriteUrl(monId: string, animated = false): string { return getSpriteUrl(monId, animated); }

  monName(monId: string): string {
    const m = MON[monId];
    if (!m) return monId;
    return m.name ?? (monId.charAt(0).toUpperCase() + monId.slice(1));
  }

  monRole(idx: number, monId: string): string {
    return pickRole(idx, !!(MON[monId]?.mega));
  }

  onSpriteError(event: Event): void {
    const img = event.target as HTMLImageElement;
    // Try dex sprite as fallback, then hide on second failure
    if (!img.src.includes('/sprites/dex/')) {
      const name = img.src.split('/').pop()?.replace('.gif', '.png') ?? '';
      img.src = `https://play.pokemonshowdown.com/sprites/dex/${name}`;
    } else {
      img.style.display = 'none';
    }
  }
}
