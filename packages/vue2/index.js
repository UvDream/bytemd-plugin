/*
 * @Author: wangzhongjie
 * @Date: 2021-08-09 15:50:35
 * @LastEditors: wangzhongjie
 * @LastEditTime: 2021-08-10 15:56:17
 * @Description:
 * @Email: UvDream@163.com
 */
import Editor from "./src/editor.vue";
import Viewer from "./src/viewer.vue"
function install(Vue) {
    Vue.component(Editor.name, Editor)
    Vue.component(Viewer.name, Viewer)
}
const BytemdVue = {
    install
}
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
export default BytemdVue
export { Editor, Viewer }