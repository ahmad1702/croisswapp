import { Check, Copy, Download, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

type EditorToolbarProps = {
    error: string | undefined;
    copy: () => Promise<void>;
    clear: () => void;
    download: () => void;
}


const EditorToolbar = ({
    error = 'This is an error. Please fix it.',
    copy,
    clear,
    download
}: EditorToolbarProps) => {
    const [copyStatus, setCopyStatus] = useState<'default' | 'loading' | 'complete'>('default')
    const handleCopy = async (): Promise<void> => {
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
                <Button
                    size="sm"
                    className='h-7'
                    onClick={() => void handleCopy()}
                >
                    {copyStatus === 'complete' ? <Check className='h-4 w-4 mr-1' /> : <Copy className='h-4 w-4 mr-1' />}
                    {copyStatus === 'default' ? 'Copy' : copyStatus === 'loading' ? 'Copying...' : 'Copied'}
                </Button>
                <Button
                    size="sm"
                    className='h-7'
                    onClick={download}
                >
                    <Download className='h-4 w-4 mr-1' />
                    Download
                </Button>
                <Button
                    size="sm"
                    className='h-7'
                    onClick={clear}
                >
                    <X className='h-4 w-4 mr-1' />
                    Clear
                </Button>
            </div>
        </div>
    )
}

export default EditorToolbar