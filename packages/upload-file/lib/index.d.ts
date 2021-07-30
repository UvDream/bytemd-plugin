import type { BytemdPlugin } from 'bytemd';
import ZH from '../locales/zh_Hans.json';
import type { EditorProps } from "bytemd/lib/types";
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
    locale?: Partial<typeof ZH>;
    uploadFile?: UploadFileProps['uploadFile'];
}
export default function UploadFile({ locale: _locale, uploadFile }?: BytemdPluginUploadFileOptions): BytemdPlugin;
export {};
