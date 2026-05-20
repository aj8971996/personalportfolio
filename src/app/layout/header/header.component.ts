import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isMenuOpen = false;
  openDropdown: 'dashboards' | 'tools' | null = null;
  mobileExpanded: 'dashboards' | 'tools' | null = null;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    if (!this.isMenuOpen) this.mobileExpanded = null;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
    this.openDropdown = null;
    this.mobileExpanded = null;
  }

  toggleDropdown(name: 'dashboards' | 'tools'): void {
    this.openDropdown = this.openDropdown === name ? null : name;
  }

  toggleMobileExpand(name: 'dashboards' | 'tools'): void {
    this.mobileExpanded = this.mobileExpanded === name ? null : name;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.nav-dropdown-wrapper')) {
      this.openDropdown = null;
    }
  }
}
