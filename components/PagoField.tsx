import React from 'react'

interface PagoFieldProps {
  pago: boolean
  monto: string
  onPagoChange: (value: boolean) => void
  onMontoChange: (value: string) => void
  error?: string
}

export const PagoField: React.FC<PagoFieldProps> = ({ pago, monto, onPagoChange, onMontoChange, error }) => (
  <div className='mb-6'>
    <label className='block mb-2 text-sm font-medium text-gray-700'>Pago:</label>
    <div className='flex items-center mb-2'>
      <label htmlFor='toggleB' className='flex items-center cursor-pointer'>
        <div className='relative'>
          <input
            id='toggleB'
            type='checkbox'
            className='sr-only'
            checked={pago}
            onChange={(e) => onPagoChange(e.target.checked)}
          />
          <div className={`block w-14 h-8 rounded-full ${pago ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
          <div
            className={`dot absolute left-1 top-1 w-6 h-6 rounded-full transition transform ${
              pago ? 'translate-x-full bg-white' : 'bg-white'
            }`}
          ></div>
        </div>
        <div className='ml-3 text-gray-700 text-sm font-medium'>{pago ? 'Si' : 'No'}</div>
      </label>
    </div>
    {!pago && (
      <div>
        <label className='block mb-2 text-sm font-medium text-gray-700'>ingrese Monto:</label>
        <input
          type='number'
          value={monto}
          onChange={(e) => onMontoChange(e.target.value)}
          placeholder='Monto'
          className={`border ${
            error ? 'border-red-500' : 'border-gray-300'
          } p-3 w-full rounded-md focus:ring-2 focus:ring-blue-500`}
        />
        {error && <p className='text-red-500 text-sm'>{error}</p>}
      </div>
    )}
  </div>
)
