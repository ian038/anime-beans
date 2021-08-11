import { FaSpinner } from 'react-icons/fa'
import React from 'react'

const Spinner: React.FC<{}> = () => (
    <div className="w-full h-full fixed block top-0 left-0 bg-white z-50">
        <span className="text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0" style={{ top: '50%' }}>
            <FaSpinner className='animate-spin h-20 w-20 spinner' />
        </span>
    </div>
)

export default Spinner