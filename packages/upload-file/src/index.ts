/*
 * @Author: wangzhongjie
 * @Date: 2021-07-26 10:22:44
 * @LastEditors: wangzhongjie
 * @LastEditTime: 2021-07-30 18:00:27
 * @Description:上传文件
 * @Email: UvDream@163.com
 */
import type { BytemdPlugin } from 'bytemd'
import { icons } from './icons'
// @ts-ignore
import ZH from '../locales/zh_Hans.json'
import selectFiles from 'select-files'
import type { EditorProps } from "bytemd/lib/types"
interface Image extends Node, Resource, Alternative {
    type: 'image';
}
interface Resource {
    url: string;
    title?: string | undefined;
    name?: string | undefined;
}
interface Alternative {
    alt?: string | undefined;
}
interface UploadFileProps extends EditorProps {
    uploadFile?: (files: File[]) => Promise<Pick<Image, 'url' | 'alt' | 'title' | 'name'>[]>;
}

export interface BytemdPluginUploadFileOptions {
    locale?: Partial<typeof ZH>,
    uploadFile?: UploadFileProps['uploadFile']
}

export default function UploadFile({
    locale: _locale,
    uploadFile
}: BytemdPluginUploadFileOptions = {}): BytemdPlugin {

    const locale = { ...ZH, ..._locale } as typeof ZH

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
                        })
                        console.log(fileList);
                        if (fileList?.length) {
                            // @ts-ignore
                            const files = await uploadFile(Array.from(fileList))
                            const pos = ctx.appendBlock(
                                files
                                    .map(({ url, alt, title }, i) => {
                                        alt = alt ?? (files[i].name ? files[i].name : files[i].title)
                                        return `[${alt}](${url}${title ? ` "${title}"` : ''})`
                                    })
                                    .join('\n\n')
                            )
                            ctx.editor.setSelection(pos, ctx.codemirror.Pos(pos.line + files.length * 2 - 2))
                            ctx.editor.focus()
                        }
                    }
                }
            }
        ],
    }
}
