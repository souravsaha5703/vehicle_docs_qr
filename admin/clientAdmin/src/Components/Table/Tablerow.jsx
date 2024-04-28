import React from 'react'

function Tablerow({ id, name, email, phone }) {
    return (
        <tr className='border border-white'>
            <td className='border border-white px-4 text-center text-lg text-slate-100 font-noto font-normal py-2'>{id}</td>
            <td className='border border-white px-4 text-center text-lg text-slate-100 font-noto font-normal py-2'>{name}</td>
            <td className='border border-white px-4 text-center text-lg text-slate-100 font-noto font-normal py-2'>{email}</td>
            <td className='border border-white px-4 text-center text-lg text-slate-100 font-noto font-normal py-2'>{phone}</td>
        </tr>
    )
}

export default Tablerow