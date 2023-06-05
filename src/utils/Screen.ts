import {isMobile} from './sysTool';

class ScreenClass {
  public sizes = {
    sm: 600,
    md: 1024,
    lg: 1440,
    xl: 1920,
  };
  public lt = {
    sm: true,
    md: true,
    lg: true,
    xl: true,
  };
  public gt = {
    xs: false,
    sm: false,
    md: false,
    lg: false,
  };

  public xs = true;
  public sm = false;
  public md = false;
  public lg = false;
  public xl = false;

  public getSize() {
    const { visualViewport } = window;
    // const target = visualViewport || window
    const scrollingElement =
      document.scrollingElement || document.documentElement;
    const result =
      visualViewport === void 0 || isMobile()
        ? [
            Math.max(window.innerWidth, scrollingElement.clientWidth),
            Math.max(window.innerHeight, scrollingElement.clientHeight),
          ]
        : visualViewport
        ? [
            visualViewport.width * visualViewport.scale +
              window.innerWidth -
              scrollingElement.clientWidth,
            visualViewport.height * visualViewport.scale +
              window.innerHeight -
              scrollingElement.clientHeight,
          ]
        : [
            window.innerWidth - scrollingElement.clientWidth,
            window.innerHeight - scrollingElement.clientHeight,
          ];
    return result;
  }

  //更新大小
  public updateSize() {
    const [w, h] = this.getSize();
    let s = this.sizes;

    this.gt.xs = w >= s.sm;
    this.gt.sm = w >= s.md;
    this.gt.md = w >= s.lg;
    this.gt.lg = w >= s.xl;
    this.lt.sm = w < s.sm;
    this.lt.md = w < s.md;
    this.lt.lg = w < s.lg;
    this.lt.xl = w < s.xl;
    this.xs = this.lt.sm;
    this.sm = this.gt.xs === true && this.lt.md === true;
    this.md = this.gt.sm === true && this.lt.lg === true;
    this.lg = this.gt.md === true && this.lt.xl === true;
    this.xl = this.gt.lg;
  }
}
const Screen=new ScreenClass();
export default Screen;