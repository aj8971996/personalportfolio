import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  signal,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { ResumeDownloadService } from '../../../core/services/resume-download.service';

interface OutputLine {
  text: string;
  type: 'prompt' | 'output' | 'error' | 'system';
}

@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [],
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss'],
})
export class TerminalComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly resumeSvc = inject(ResumeDownloadService);

  @ViewChild('termInput') private termInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('outputBody') private outputBodyRef!: ElementRef<HTMLDivElement>;

  protected readonly outputLines = signal<OutputLine[]>([]);
  protected readonly inputValue = signal('');
  protected readonly isReady = signal(false);
  protected readonly typingText = signal('');

  private cmdHistory: string[] = [];
  private historyIdx = -1;
  private savedInput = '';
  private typeInterval?: ReturnType<typeof setInterval>;

  private readonly PROMPT = 'alex@portfolio:~$ ';
  private readonly WELCOME = 'faster nav than a hamburger menu.';

  private readonly commands: Record<string, () => void> = {
    help: () => this.runHelp(),
    whoami: () => this.runWhoami(),
    'get-resume': () => this.runGetResume(),
    resume: () => {
      this.pushLine('navigating to /resume...', 'system');
      this.router.navigate(['/resume']);
    },
    approach: () => {
      this.pushLine('navigating to /approach...', 'system');
      this.router.navigate(['/approach']);
    },
    'pkmn-team': () => {
      this.pushLine('opening decision tree team builder...', 'system');
      this.router.navigate(['/tools/pokemon-team-builder']);
    },
    cashflow: () => {
      this.pushLine('opening cash flow dashboard...', 'system');
      this.router.navigate(['/portfolio/cashflow-risk']);
    },
    'real-estate': () => {
      this.pushLine('opening real estate intelligence dashboard...', 'system');
      this.router.navigate(['/portfolio/treasury-analysis']);
    },
    'rate-risk': () => {
      this.pushLine('opening treasury rate-risk & normality dashboard...', 'system');
      this.router.navigate(['/portfolio/rate-risk']);
    },
    prd: () => {
      this.pushLine('opening PRD generator in new tab...', 'system');
      window.open('/assets/tools/prd-generator.html', '_blank');
    },
    art: () => {
      this.pushLine('opening Threshold Current in new tab...', 'system');
      window.open('/assets/art/threshold-current.html', '_blank');
    },
  };

  ngOnInit(): void {
    setTimeout(() => this.runStartup(), 900);
  }

  ngOnDestroy(): void {
    clearInterval(this.typeInterval);
  }

  protected focusInput(): void {
    this.termInputRef?.nativeElement.focus();
  }

  protected onInput(event: Event): void {
    this.inputValue.set((event.target as HTMLInputElement).value);
  }

  protected onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Enter':
        this.execute(this.inputValue());
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.historyNavigate(1);
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.historyNavigate(-1);
        break;
      case 'Tab':
        event.preventDefault();
        this.pushLine(this.PROMPT + 'help', 'prompt');
        this.runHelp();
        this.scrollBottom();
        break;
    }
  }

  private execute(raw: string): void {
    const trimmed = raw.trim();
    const lower = trimmed.toLowerCase();

    if (lower === 'clear') {
      this.outputLines.set([]);
      this.inputValue.set('');
      this.historyIdx = -1;
      this.savedInput = '';
      return;
    }

    if (trimmed) {
      this.pushLine(this.PROMPT + trimmed, 'prompt');
    }

    if (trimmed && (this.cmdHistory.length === 0 || this.cmdHistory[0] !== lower)) {
      this.cmdHistory = [lower, ...this.cmdHistory].slice(0, 20);
    }
    this.historyIdx = -1;
    this.savedInput = '';

    const handler = trimmed ? this.commands[lower] : undefined;
    if (handler) {
      handler();
    } else if (trimmed) {
      this.pushLine(`${lower}: command not found. type 'help' for a list.`, 'error');
    }

    this.inputValue.set('');
    this.scrollBottom();
  }

  private historyNavigate(dir: 1 | -1): void {
    if (this.cmdHistory.length === 0) return;
    if (this.historyIdx === -1 && dir === 1) {
      this.savedInput = this.inputValue();
    }
    const next = this.historyIdx + dir;
    if (next < 0) {
      this.historyIdx = -1;
      this.inputValue.set(this.savedInput);
      return;
    }
    if (next >= this.cmdHistory.length) return;
    this.historyIdx = next;
    this.inputValue.set(this.cmdHistory[next]);
    setTimeout(() => {
      const el = this.termInputRef?.nativeElement;
      if (el) { el.selectionStart = el.selectionEnd = el.value.length; }
    }, 0);
  }

  private pushLine(text: string, type: OutputLine['type']): void {
    this.outputLines.update(lines => [...lines, { text, type }]);
  }

  private pushLines(texts: string[], type: OutputLine['type']): void {
    this.outputLines.update(lines => [
      ...lines,
      ...texts.map(text => ({ text, type })),
    ]);
  }

  private scrollBottom(): void {
    setTimeout(() => {
      const el = this.outputBodyRef?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    }, 0);
  }

  private runStartup(): void {
    const full = this.PROMPT + this.WELCOME;
    let i = 0;
    this.typeInterval = setInterval(() => {
      if (i < full.length) {
        this.typingText.set(full.slice(0, ++i));
      } else {
        clearInterval(this.typeInterval);
        setTimeout(() => {
          this.typingText.set('');
          this.pushLine(full, 'prompt');
          this.isReady.set(true);
          this.scrollBottom();
        }, 300);
      }
    }, 38);
  }

  private runHelp(): void {
    this.pushLines(
      [
        'available commands:',
        '',
        '  help         list all commands',
        '  whoami       print a short bio',
        '  get-resume   download the ATS-optimized resume PDF',
        '  resume       open the resume page',
        '  approach     open the approach page',
        '  pkmn-team    open the VGC decision tree team builder',
        '  cashflow     open the cash flow and treasury risk dashboard',
        '  real-estate  open the federal real estate intelligence dashboard',
        '  rate-risk    open the treasury rate-risk & normality dashboard',
        '  prd          open the PRD generator (new tab)',
        '  art          open Threshold Current generative art (new tab)',
        '  clear        clear this output',
      ],
      'output',
    );
  }

  private runWhoami(): void {
    this.pushLines(
      [
        'Alex Barkus. Forward deployed engineer, Las Vegas.',
        'Ships internal platforms, analytics tools, and indie SaaS.',
        'Currently at Sphere Entertainment.',
      ],
      'output',
    );
  }

  private runGetResume(): void {
    this.pushLine('downloading ATS resume PDF...', 'system');
    this.resumeSvc.downloadResume('', 'ats').catch(() => {
      this.pushLine("download failed. try visiting /resume directly.", 'error');
    });
  }
}
