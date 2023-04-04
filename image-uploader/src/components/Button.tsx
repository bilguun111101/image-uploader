import React from 'react';

interface ButtonProps {
  text: string;
  handle: (ev: any) => void;
}

export const Button = ({
  text,
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
      <input type="file" className='hidden' onChange={(event) => handle(event)}/>
      { text }
    </label>
  )
}
