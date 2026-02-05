import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  DoCheck,
  OnDestroy
} from '@angular/core';

@Directive({
  selector: '[hasPermission]'
})
export class HasPermissionDirective implements DoCheck, OnDestroy {
  private perm: string | null = null;
  private rendered = false;

  // pour détecter les changements de session même dans le même onglet
  private lastSessionRaw: string | null = null;

  // optionnel: si tu veux forcer une rééval régulière
  private timer: any = null;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {
    // 👇 optionnel mais efficace si ton app modifie la session sans déclencher CD
    // (tu peux l’enlever si tu veux)
    this.timer = setInterval(() => this.checkAndUpdate(), 500);
  }

  @Input()
  set hasPermission(permission: any) {
    // IMPORTANT: on veut une string
    if (typeof permission === 'string') {
      this.perm = permission.trim().toLowerCase();
    } else {
      this.perm = null;
    }
    this.checkAndUpdate(true);
  }

  ngDoCheck() {
    // appelé très souvent → on fait un check cheap
    this.checkAndUpdate();
  }

  private readSessionRaw(): string | null {
    return (
      sessionStorage.getItem('session') ||
      localStorage.getItem('session')
    );
  }

  private toBool(v: any): boolean {
    if (typeof v === 'boolean') return v;
    if (typeof v === 'number') return v === 1;
    if (typeof v === 'string') {
      const s = v.trim().toLowerCase();
      return s === 'true' || s === '1' || s === 'on' || s === 'yes';
    }
    return false;
  }

  private checkAndUpdate(force = false) {
    const raw = this.readSessionRaw();

    // si rien ne change et pas forced → on ne fait rien
    if (!force && raw === this.lastSessionRaw) return;

    this.lastSessionRaw = raw;

    if (!raw || !this.perm) {
      this.clear();
      return;
    }

    let user: any;
    try {
      user = JSON.parse(raw);
    } catch {
      this.clear();
      return;
    }

    const isAdmin = this.toBool(user?.isAdmin);

    let allowed = false;

    if (this.perm === 'admin') {
      allowed = isAdmin;
    } else if (isAdmin) {
      allowed = true; // override admin
    } else {
      allowed = this.toBool(user?.[this.perm]);
    }

    if (allowed) this.show();
    else this.clear();
  }

  private show() {
    if (this.rendered) return;
    this.viewContainer.clear();
    this.viewContainer.createEmbeddedView(this.templateRef);
    this.rendered = true;
  }

  private clear() {
    if (!this.rendered) return;
    this.viewContainer.clear();
    this.rendered = false;
  }

  ngOnDestroy() {
    if (this.timer) clearInterval(this.timer);
  }
}
