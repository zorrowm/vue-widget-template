import type { App } from 'vue';
import { setupDragDirective } from './dragDirective';
import {setupLoadingDirective} from './loading';
import {setupRepeatDirective} from './repeatClick';
import {setupmediaDirective} from './mediaDirective';
import {setupWowDirective} from './wowDirective';
//https://floating-vue.starpad.dev/guide/directive
import {VTooltip,  VClosePopper} from 'floating-vue';

export function setupGlobDirectives(app: App) {
  setupDragDirective(app);
  setupLoadingDirective(app);
  setupRepeatDirective(app);
  setupWowDirective(app);
  setupmediaDirective(app);
  //指令
  app.directive('tooltip', VTooltip)
  app.directive('close-popper', VClosePopper)
}
