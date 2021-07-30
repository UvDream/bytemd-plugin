export interface CopyCodeOptions {
    copyText?: string;
    copyIcon?: string;
    theme?: string;
    copySuccess?: (text: string) => {};
    copyError?: () => {};
    copyright?: string;
}
export default function CopyCode(options?: CopyCodeOptions): {
    viewerEffect({ markdownBody }: {
        markdownBody: any;
    }): void;
};
