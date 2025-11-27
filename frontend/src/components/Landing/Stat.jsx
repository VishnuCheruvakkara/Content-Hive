import React from 'react'

function Stat({value,label}) {
    return (
        <div className="flex flex-col">
            <span className="text-lg font-bold">{value}</span>
            <span className="text-sm text-white/70">{label}</span>
        </div>
    )
}

export default Stat
