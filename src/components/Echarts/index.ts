import { registerTheme } from 'echarts/lib/core/echarts.js';
import * as echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/grid';
import { sortTransform } from 'echarts/lib/component/transform/sortTransform.js';
import macaronsTheme from './macaronsTheme'; // echarts theme
registerTheme('macarons', macaronsTheme);
echarts.registerTransform(sortTransform);
// https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/zh/asset/theme/macarons.js?_v_=20200710_1
export default echarts;
