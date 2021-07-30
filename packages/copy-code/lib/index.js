/*
 * @Author: wangzhongjie
 * @Date: 2021-07-30 14:00:54
 * @LastEditors: wangzhongjie
 * @LastEditTime: 2021-07-30 17:55:23
 * @Description:bytemd拷贝代码插件
 * @Email: UvDream@163.com
 */
import { icons } from "./icon";
export default function CopyCode(options) {
    function createElement(tag, innerHTML, className, id) {
        const element = document.createElement(tag);
        element.className = className;
        id ? element.id = id : '';
        element.innerHTML = innerHTML;
        return element;
    }
    function copyCode(node) {
        node.onclick = () => {
            let str = '';
            // @ts-ignore
            node.parentNode.parentNode.children[0].childNodes.forEach(element => {
                str = str + element.textContent;
            });
            if (options === null || options === void 0 ? void 0 : options.copyright) {
                str = str + options.copyright;
            }
            navigator.clipboard.writeText(str).then(() => {
                node.classList.add("copy-success");
                (options === null || options === void 0 ? void 0 : options.copySuccess) ? options.copySuccess(str) : '';
                setTimeout(() => {
                    node.classList.remove("copy-success");
                }, 10000);
            }, () => {
                (options === null || options === void 0 ? void 0 : options.copyError) ? options.copyError() : '';
            });
        };
    }
    return {
        // @ts-ignore
        viewerEffect({ markdownBody }) {
            (async (markdownBody) => {
                const els = markdownBody.querySelectorAll('pre');
                els.forEach(el => {
                    const operateBtn = createElement('div', '', 'operate-btn');
                    // lang
                    // @ts-ignore
                    const lang = el.childNodes[0]['className'].split("-")[1];
                    if (lang) {
                        const langBtn = createElement('span', lang, 'lang-btn');
                        operateBtn.appendChild(langBtn);
                    }
                    el.appendChild(operateBtn);
                    // copy
                    let copyText;
                    if (!(options === null || options === void 0 ? void 0 : options.copyIcon) && !(options === null || options === void 0 ? void 0 : options.copyText)) {
                        copyText = createElement('span', icons.copyDark, 'copy-btn');
                    }
                    if (options === null || options === void 0 ? void 0 : options.copyIcon) {
                        copyText = createElement('span', options.copyIcon, 'copy-btn');
                    }
                    if (options === null || options === void 0 ? void 0 : options.copyText) {
                        copyText = createElement('span', options.copyText, 'copy-btn');
                    }
                    // @ts-ignore
                    operateBtn.appendChild(copyText);
                    // @ts-ignore
                    copyCode(copyText);
                });
            })(markdownBody);
        }
    };
}
