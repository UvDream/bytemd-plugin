import { icons } from './icons';
import ZH from '../locales/zh_Hans.json';
import selectFiles from 'select-files';
export default function UploadFile({ locale: _locale, uploadFile } = {}) {
    const locale = { ...ZH, ..._locale };
    return {
        actions: [
            {
                title: locale.uploadFile,
                icon: icons.uploadFile,
                handler: {
                    type: 'action',
                    async click(ctx) {
                        const fileList = await selectFiles({
                            accept: '*',
                            multiple: true,
                        });
                        console.log(fileList);
                        if (fileList === null || fileList === void 0 ? void 0 : fileList.length) {
                            const files = await uploadFile(Array.from(fileList));
                            const pos = ctx.appendBlock(files
                                .map(({ url, alt, title }, i) => {
                                alt = alt !== null && alt !== void 0 ? alt : (files[i].name ? files[i].name : files[i].title);
                                return `[${alt}](${url}${title ? ` "${title}"` : ''})`;
                            })
                                .join('\n\n'));
                            ctx.editor.setSelection(pos, ctx.codemirror.Pos(pos.line + files.length * 2 - 2));
                            ctx.editor.focus();
                        }
                    }
                }
            }
        ],
    };
}
