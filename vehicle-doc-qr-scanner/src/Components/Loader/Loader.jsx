import React from 'react'

function Loader({color='text-slate-100'}) {
    return (
        <div className={`animate-spin inline-block size-6 border-[3px] border-current border-t-transparent ${color} rounded-full`} role="status" aria-label="loading">
            <span className="sr-only">Loading...</span>
        </div>
    )
}

export default Loader