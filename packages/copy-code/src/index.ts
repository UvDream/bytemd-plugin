/*
 * @Author: wangzhongjie
 * @Date: 2021-07-30 14:00:54
 * @LastEditors: wangzhongjie
 * @LastEditTime: 2021-07-30 16:51:52
 * @Description:bytemd拷贝代码插件
 * @Email: UvDream@163.com
 */
import { icons } from "./icon"
export interface CopyCodeOptions {
    copyText?: string,
    copyIcon?: string,
    theme?: string,
    copySuccess?: (text: string) => {},
    copyError?: () => {},
    copyright?: string
}
export default function CopyCode(options?: CopyCodeOptions) {
    function createElement(tag: string, innerHTML: string, className: string, id?: string): HTMLElement {
        const element = document.createElement(tag)
        element.className = className
        id ? element.id = id : ''
        element.innerHTML = innerHTML
        return element
    }
    function copyCode(node: HTMLElement) {
        node.onclick = () => {
            let str: string = '';
            node.parentNode.parentNode.children[0].childNodes.forEach(element => {
                str = str + element.textContent
            })
            if (options?.copyright) {
                str = str + options.copyright
            }
            navigator.clipboard.writeText(str).then(
                () => {
                    node.classList.add("copy-success")
                    options?.copySuccess ? options.copySuccess(str) : ''
                    setTimeout(() => {
                        node.classList.remove("copy-success")
                    }, 10000)
                },
                () => {
                    options?.copyError ? options.copyError() : ''
                },
            );
        }
    }
    return {
        viewerEffect({ markdownBody }) {
            (async (markdownBody: HTMLElement) => {
                const els = markdownBody.querySelectorAll<HTMLElement>('pre')
                els.forEach(el => {
                    const operateBtn = createElement('div', '', 'operate-btn')
                    // lang
                    const lang = el.childNodes[0]['className'].split("-")[1]
                    if (lang) {
                        const langBtn = createElement('span', lang, 'lang-btn')
                        operateBtn.appendChild(langBtn)
                    }
                    el.appendChild(operateBtn)
                    // copy
                    let copyText: HTMLElement

                    if (!options?.copyIcon && !options?.copyText) {
                        copyText = createElement('span', icons.copyDark, 'copy-btn')
                    }
                    if (options?.copyIcon) {
                        copyText = createElement('span', options.copyIcon, 'copy-btn')
                    }
                    if (options?.copyText) {
                        copyText = createElement('span', options.copyText, 'copy-btn')
                    }
                    operateBtn.appendChild(copyText)
                    copyCode(copyText)

                });
            })(markdownBody)
        }
    }
}