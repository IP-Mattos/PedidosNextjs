import React from 'react'
import { FundaPaquete } from '../types'

interface FundasPaquetesProps {
  fundasPaquetes: FundaPaquete[]
  onAdd: () => void
  onRemove: (index: number) => void
  onChange: (index: number, field: keyof FundaPaquete, value: any) => void
}

export const FundasPaquetes: React.FC<FundasPaquetesProps> = ({ fundasPaquetes, onAdd, onRemove, onChange }) => (
  <div className='mb-6'>
    <label className='block mb-2 text-sm font-medium text-gray-700'>Fundas o Paquetes:</label>
    {fundasPaquetes.map((item, index) => (
      <div key={index} className='flex items-center mb-4'>
        <input
          type='number'
          value={item.cantidad}
          onChange={(e) => onChange(index, 'cantidad', +e.target.value)}
          className='border border-gray-300 p-3 w-1/4 rounded-md'
        />
        <input
          type='text'
          value={item.paquete}
          onChange={(e) => onChange(index, 'paquete', e.target.value)}
          placeholder='Paquete'
          className='border border-gray-300 p-3 w-2/4 ml-2 rounded-md'
        />
        <button onClick={() => onRemove(index)} className='ml-2 text-red-500'>
          Eliminar
        </button>
      </div>
    ))}
    <button onClick={onAdd} className='bg-blue-500 text-white p-3 rounded-md'>
      Agregar otra funda o paquete
    </button>
  </div>
)

// Crear componentes similares para Bebidas y Otros
