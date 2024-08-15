import { LoaderPinwheel } from 'lucide-react'
import React from 'react'

const SavingLoader = () => {
    return (
        <div className='flex items-center justify-center'>
            <div className='animate-spin duration-700'>
                <LoaderPinwheel size={16} strokeWidth={1.3} />
            </div>
        </div>
    )
}

export default SavingLoader
