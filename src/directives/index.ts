import type { App } from 'vue';
import { setupDragDirective } from './dragDirective';

export function setupGlobDirectives(app: App) {
  setupDragDirective(app);
}
