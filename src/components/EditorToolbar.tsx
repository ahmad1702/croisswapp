import { Check, Copy, Download, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import ShowHide from './ui/show-hide';

type EditorToolbarProps = {
    error: string | undefined;
    copy?: () => Promise<void>;
    clear?: () => void;
    download?: () => void;
}


const EditorToolbar = ({
    copy,
    clear,
    download
}: EditorToolbarProps) => {
    const [copyStatus, setCopyStatus] = useState<'default' | 'loading' | 'complete'>('default')
    const handleCopy = async (): Promise<void> => {
        if (copy === undefined) return;
        setCopyStatus('loading')
        await copy()
        setCopyStatus('complete')

        setTimeout(() => {
            setCopyStatus('default')
        }, 1000)
    }
    return (
        <div className="flex items-center">
            <div className='p-1 flex gap-2'>
                <ShowHide show={copy !== undefined}>
                    <Button
                        size="sm"
                        className='h-7'
                        onClick={() => void handleCopy()}
                        disabled={copy === undefined}
                    >
                        {copyStatus === 'complete' ? <Check className='h-4 w-4 mr-1' /> : <Copy className='h-4 w-4 mr-1' />}
                        {copyStatus === 'default' ? 'Copy' : copyStatus === 'loading' ? 'Copying...' : 'Copied'}
                    </Button>
                </ShowHide>
                <ShowHide show={download !== undefined}>
                    <Button
                        size="sm"
                        className='h-7'
                        onClick={download}
                        disabled={download === undefined}
                    >
                        <Download className='h-4 w-4 mr-1' />
                        Download
                    </Button>
                </ShowHide>
                <ShowHide show={clear !== undefined}>
                    <Button
                        size="sm"
                        className='h-7'
                        onClick={clear}
                    >
                        <X className='h-4 w-4 mr-1' />
                        Clear
                    </Button>
                </ShowHide>
            </div>
        </div>
    )
}

export default EditorToolbar