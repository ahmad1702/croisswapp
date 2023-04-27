import { cn } from '@/utils/cn'
import { Transition } from '@headlessui/react'
import { forwardRef } from 'react'

const ShowHide = forwardRef<React.ComponentProps<'div'>['ref'], React.ComponentPropsWithoutRef<typeof Transition>>((props, ref) => {
    return (
        <Transition
            appear={true}
            enter={cn("transition-opacity duration-75", props.enter)}
            enterFrom={cn("opacity-0", props.enterFrom)}
            enterTo={cn("opacity-100", props.enterTo)}
            leave={cn("transition-opacity duration-150", props.leave)}
            leaveFrom={cn("opacity-100", props.leaveFrom)}
            leaveTo={cn("opacity-0", props.leaveTo)}
            {...props}
        >
            {props.children}
        </Transition>
    )
})

export default ShowHide