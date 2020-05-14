
/**
 * 预览单张大图
 */


class PreviewImage {
    constructor() {
        this.init();
    }
    init() {
        document.addEventListener('click', (e) => {
            if (e.target.nodeName === 'IMG') {
                const src = e.target.getAttribute('src');
                window.console.log('当前点击图片的src', src);
                this.PreviewModel(src, e);
            }
        }, false);
    }
    PreviewModel(src, e) {
        e && e.stopPropagation();
        const html = `
            <div style="position:fixed; width: 100%; height:100%; background: #333; z-index:999;top: 0;left:0;">
                <img src=${src} style="width: 100%;height: 100%;object-fit: contain;" alt="" />
            </div>
        `;
        const node = document.createElement('div');
        node.setAttribute('id', 'bbt-previewImage');
        node.innerHTML = html;
        document.body.appendChild(node);
        node.addEventListener('click', this.closeModel, false);
    }
    closeModel(e) {
        e && e.stopPropagation();
        const node = document.getElementById('bbt-previewImage');
        if (node) {
            document.body.removeChild(node);
        }
    }
}

export default PreviewImage;