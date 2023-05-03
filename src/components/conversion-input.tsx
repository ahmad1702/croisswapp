import { RefObject, forwardRef, useState } from 'react';

import { cn } from '@/utils/cn';
import { ClipboardEdit, Paperclip, Upload } from 'lucide-react';
import { buttonVariants } from './ui/button';
import { Textarea } from './ui/text-area';

type ConversionInputProps = {
    onFromContentsChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    acceptableFileExtensions?: string
}

const ConversionInput = forwardRef<HTMLTextAreaElement, ConversionInputProps>(({ onFromContentsChange, acceptableFileExtensions = '', ...props }, ref) => {
    // Idealy we would just want this is as a formatted variable. But due to next.js hydration, we need to use state
    const [isDragActive, setIsDragActive] = useState(false)

    const textAreaRef = (ref as RefObject<HTMLTextAreaElement>).current
    const handleFile = (file: File) => {
        console.log()
        const reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            if (evt.target) {
                const result = evt.target.result as string
                onFromContentsChange({
                    target: {
                        value: result
                    }
                } as React.ChangeEvent<HTMLTextAreaElement>)

                if (textAreaRef) {
                    textAreaRef.value = result
                }
            }
        }
        reader.onerror = function (evt) {
            console.error(evt.target?.error)
        }
        setIsDragActive(false)
    }

    const handleDrop = (e: React.DragEvent<HTMLTextAreaElement>) => {
        e.preventDefault()
        e.stopPropagation()
        if (e && e.dataTransfer && e.dataTransfer.files) {
            const file = e.dataTransfer.files?.[0]
            if (file) {
                handleFile(file)
            }
        }
    }

    return (
        <div className='relative h-full'>
            <div className='absolute h-full w-full flex items-center justify-center pointer-events-none flex-col gap-2'>
                {
                    !textAreaRef || textAreaRef.value === undefined || !(textAreaRef.value.length > 0) && (
                        isDragActive ? (
                            <>
                                <Paperclip className='h-10 w-10' />
                                <div className='font-semibold'>
                                    Drop it to convert!
                                </div>
                            </>
                        ) : (
                            <>
                                <ClipboardEdit className='h-10 w-10 pointer-events-none' />
                                <div className='font-semibold pointer-events-none'>
                                    Drag and drop or Paste in the contents of a{acceptableFileExtensions} file here
                                </div>
                                <input
                                    id="from-contents-file-upload-input"
                                    type='file'
                                    className='hidden'
                                    onChange={(e) => {
                                        const file = e.target.files?.[0]
                                        if (file) {
                                            handleFile(file)
                                        }
                                    }}
                                />
                                <label htmlFor='from-contents-file-upload-input' className={buttonVariants({ className: 'pointer-events-auto cursor-pointer' })}>
                                    <Upload className='h-5 w-5 mr-2' />
                                    Upload Here
                                </label>
                            </>
                        )
                    )
                }
            </div>
            <Textarea
                ref={ref}
                className={cn("h-full resize-none duration-300", isDragActive ? 'bg-input border-dashed border-4' : '')}
                placeholder={isDragActive ? '' : `Type or paste in the contents of a${acceptableFileExtensions} file here`}
                onChange={onFromContentsChange}
                onDrop={handleDrop}
                onDragOver={(e) => {
                    setIsDragActive(true)
                }}
                onDragLeave={(e) => {
                    setIsDragActive(false)
                }}
            />
        </div>
    )
})

ConversionInput.displayName = 'ConversionInput'

export default ConversionInput