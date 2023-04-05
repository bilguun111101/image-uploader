import React from 'react';

interface ButtonProps {
  text: string;
  type: string;
  handle: (ev: any) => void;
}

export const Button = ({
  text,
  type,
  handle,
}: ButtonProps) => {
  return (
    <label className='
      bg-blue-500
      text-white
      font-bold
      py-2
      px-4
      rounded
      transition
      active:bg-blue-700
      relative
    '>
      { type === 'file' ? (
        <>
          <input type={type} className='hidden' onChange={(event) => handle(event)} />
          { text }
        </>
      ) : (
        <>
          <input type={type} className='hidden' onClick={handle} />
          { text }
        </>
      )
      }
    </label>
  )
}
