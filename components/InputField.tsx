import React from 'react'

interface InputFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
  type?: 'text' | 'number' // Asegúrate de que solo se puedan usar estos tipos
}

export const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, error, type = 'text' }) => (
  <div className='mb-6'>
    <label className='block mb-2 text-sm font-medium text-gray-700'>{label}:</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`border ${error ? 'border-red-500' : 'border-gray-300'} p-3 w-full rounded-md`}
    />
    {error && <p className='text-red-500 text-sm'>{error}</p>}
  </div>
)
