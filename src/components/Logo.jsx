import React from 'react'

function Logo({width = '100px'}) {
  return (
    <div className='w-100 ' style={{width:width}}>
      <img  className='border rounded-full' src="https://png.pngtree.com/template/20190521/ourmid/pngtree-blogger-icon-psd-and-png-files-image_179967.jpg" alt='logo' />
    </div>
  )
}

export default Logo;