import React from 'react'

interface InputProps {
  placeholder?: string
  value?: string
  type?:
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week'
    | (string & {})
  disabled?: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<InputProps> = ({
  onChange,
  disabled,
  placeholder,
  type,
  value,
}) => {
  return (
    <input
      disabled={disabled}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      type={type}
      className='
        w-full
        p-4
        text-lg
        bg-black
        border-neutral-800
        rounded-md
        outline-white
        focus:border-sky-500
        focus:border-2
        transition
        disabled:bg-neutral-900
        disabled:opacity-70
        disabled:cursor-not-allowed
      '
    />
  )
}

export default Input
