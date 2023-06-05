import type { App } from 'vue';
import { setupDragDirective } from './dragDirective';
import {setupLoadingDirective} from './loading';
import {setupRepeatDirective} from './repeatClick';
import {setupmediaDirective} from './mediaDirective';
import {setupWowDirective} from './wowDirective';
export function setupGlobDirectives(app: App) {
  setupDragDirective(app);
  setupLoadingDirective(app);
  setupRepeatDirective(app);
  setupWowDirective(app);
  setupmediaDirective(app);
}
