
import { isObj } from '../Utils/tool';

/**
 * 实现图片懒加载
 * 参考文档：https://github.com/tuupola/lazyload/blob/2.x/lazyload.js
 */

class LazyLoad {
    constructor() {
        this.defaultOpts = {
            selector: '.lazyload',
            root: null,
            threshold: [0, 1],
            rootMargin: '0px 0px',
        }
    }

    init(options) {
        if (isObj(options)) {
            this.defaultOpts = Object.assign(this.defaultOpts, options);
            const { selector, root, rootMargin, threshold } = this.defaultOpts;
            
            try{
                this.io = new IntersectionObserver(
                    entries => {
                        entries.forEach(item => {
                            // window.console.log('item: ', item);
                            // window.console.log('================');
                            // 如果目标元素与交叉区域观察者对象(intersection observer) 的根相交，则返回 true .如果返回 true, 则 IntersectionObserverEntry 描述了变换到交叉时的状态; 如果返回 false, 那么可以由此判断,变换是从交叉状态到非交叉状态.
                            if (item.isIntersecting) {
                                const targtSrc = item.target.getAttribute('data-src');
                                const targetStatus = item.target.getAttribute('data-lazy-load');
                                if (!targetStatus) {
                                    item.target.setAttribute('src', targtSrc);
                                    item.target.setAttribute('data-lazy-load', true);
                                }
                            }
                        });
                    },
                    {
                        threshold,
                        root,
                        rootMargin,
                    }
                );
                const targetDoms = document.querySelectorAll(selector);
                if (targetDoms) {
                    const targetDomArr = Array.prototype.slice.call(targetDoms);
                    if (targetDomArr.length > 0) {
                        targetDomArr.map(dom => this.io.observe(dom));
                    }
                }
            } catch (e) {
                window.console.log('浏览器不支持interselectionObserve,启用window.onscroll实现功能');
                const rootNode = root ? root : window;
                const originEvent = rootNode.onscroll;
                rootNode.onscroll = debounce(function() {
                    if (originEvent && typeof originEvent === 'function') {
                        originEvent.apply(null, arguments);
                    }
                    const targetDoms = document.querySelectorAll(selector);
                    if (targetDoms) {
                        const targetDomArr = Array.prototype.slice.call(targetDoms);
                        if (targetDomArr.length > 0) {
                            targetDomArr.map(dom => {
                                const { top, bottom } = dom.getBoundingClientRect();
                                const { height:rootHeight, top:rootTop } = root ? root.getBoundingClientRect() : {};
                                const windowHeight = window.innerHeight;
                                const _rootHeight = root ? rootHeight : windowHeight;
                                const _rootTop = root ? rootTop : 0;
                                // const _rootBottom = root ? rootBottom : 0;
                                if ((top <= _rootHeight && top >= _rootTop) || (top < _rootTop && bottom >= 0)) {
                                    const targtSrc = dom.getAttribute('data-src');
                                    const targetStatus = dom.getAttribute('data-lazy-load');
                                    if (!targetStatus) {
                                        dom.setAttribute('src', targtSrc);
                                        dom.setAttribute('data-lazy-load', true);
                                    }
                                }
                            });
                        }
                    }
                }, 60);
            }
        }
    }

    // destroy() {
    //     this.io.disconnect();
    // }
}


/**
 * @desc 函数防抖
 * @param func 目标函数
 * @param wait 延迟执行毫秒数
 * @param immediate true - 立即执行， false - 延迟执行
 */
function debounce(func, wait, immediate) {
    let timer;
    return function() {
        const context = this;
        const args = arguments;

        if (timer) {
            clearTimeout(timer);
        }
        if (immediate) {
            let callNow = !timer;
            timer = setTimeout(() => {
                timer = null;
            }, wait);

            if (callNow) {
                func.apply(context, args);
            }
        } else {
            timer  = setTimeout(() => {
                func.apply(context, args);
            }, wait);
        }
    }
}


export default new LazyLoad();