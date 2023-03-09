import type { App } from 'vue';
import { setupDragDirective } from './dragDirective';
import {setupLoadingDirective} from './loading';
import {setupRepeatDirective} from './repeatClick';

export function setupGlobDirectives(app: App) {
  setupDragDirective(app);
  setupLoadingDirective(app);
  setupRepeatDirective(app);
}
