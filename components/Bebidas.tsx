// components/Bebidas.tsx
import React from 'react'
import { Bebida } from '../types'

interface BebidasProps {
  bebidas: Bebida[]
  onAdd: () => void
  onRemove: (index: number) => void
  onChange: (index: number, field: keyof Bebida, value: any) => void
}

export const Bebidas: React.FC<BebidasProps> = ({ bebidas, onAdd, onRemove, onChange }) => (
  <div className='mb-6'>
    <label className='block mb-2 text-sm font-medium text-gray-700'>Bebidas:</label>
    {bebidas.map((item, index) => (
      <div key={index} className='flex items-center mb-4'>
        <input
          type='number'
          value={item.cantidad}
          onChange={(e) => onChange(index, 'cantidad', +e.target.value)}
          className='border border-gray-300 p-3 w-1/4 rounded-md'
        />
        <input
          type='text'
          value={item.bebida}
          onChange={(e) => onChange(index, 'bebida', e.target.value)}
          placeholder='Bebida'
          className='border border-gray-300 p-3 w-2/4 ml-2 rounded-md'
        />
        <select
          value={item.tamaño}
          onChange={(e) => onChange(index, 'tamaño', e.target.value)}
          className='border border-gray-300 p-3 ml-2 rounded-md'
        >
          <option value='250ml'>250ml</option>
          <option value='330ml'>330ml</option>
          <option value='500ml'>500ml</option>
          <option value='750ml'>750ml</option>
          <option value='1L'>1L</option>
          <option value='1.5L'>1.5L</option>
          <option value='2L'>2L</option>
          <option value='2.250L'>2.250L</option>
          <option value='2.5L'>2.5L</option>
          <option value='3L'>3L</option>
          <option value='6L'>6L</option>
          <option value='10L'>10L</option>
        </select>
        <button onClick={() => onRemove(index)} className='ml-2 text-red-500'>
          Eliminar
        </button>
      </div>
    ))}
    <button onClick={onAdd} className='bg-blue-500 text-white p-3 rounded-md'>
      Agregar otra bebida
    </button>
  </div>
)
