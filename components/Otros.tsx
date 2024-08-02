import React from 'react'
import { Otro } from '../types'

interface OtrosProps {
  otros: Otro[]
  onAdd: () => void
  onRemove: (index: number) => void
  onChange: (index: number, value: string) => void
}

export const Otros: React.FC<OtrosProps> = ({ otros, onAdd, onRemove, onChange }) => (
  <div className='mb-6'>
    <label className='block mb-2 text-sm font-medium text-gray-700'>Otros:</label>
    {otros.map((item, index) => (
      <div key={index} className='flex items-center mb-4'>
        <input
          type='text'
          value={item.descripcion}
          onChange={(e) => onChange(index, e.target.value)}
          placeholder='Descripción'
          className='border border-gray-300 p-3 w-4/5 rounded-md'
        />
        <button onClick={() => onRemove(index)} className='ml-2 text-red-500'>
          Eliminar
        </button>
      </div>
    ))}
    <button onClick={onAdd} className='bg-blue-500 text-white p-3 rounded-md'>
      Agregar otro
    </button>
  </div>
)
