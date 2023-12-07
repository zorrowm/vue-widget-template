/**
 * Package file volume analysis
 */
import {visualizer} from 'rollup-plugin-visualizer';

export function configVisualizerConfig() {

    return visualizer({
      filename: 'stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    });
}
