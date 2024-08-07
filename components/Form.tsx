'use client'
import React from 'react'
import Image from 'next/image'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { useFormularioPedido } from '../hooks/userForm'
import { InputField } from '../components/InputField'
import { FundasPaquetes } from '../components/FundasPaquetes'
import { Bebidas } from '../components/Bebidas'
import { Otros } from '../components/Otros'
import PdfDocument from '@/components/MyDocument'
import { PagoField } from './PagoField'

const HomePage: React.FC = () => {
  const {
    formData,
    errors,
    isFormValid,
    updateFormData,
    addFundaPaquete,
    removeFundaPaquete,
    addBebida,
    removeBebida,
    addOtro,
    removeOtro,
    validate
  } = useFormularioPedido()

  const handleReset = () => {
    updateFormData('nombre', '')
    updateFormData('direccion', '')
    updateFormData('telefono', '')
    updateFormData('pago', false)
    updateFormData('monto', '')
    updateFormData('cantidadBolsa', '')
    updateFormData('cantidadCaja', '')
    updateFormData('fundasPaquetes', [{ cantidad: 1, paquete: '' }])
    updateFormData('bebidas', [{ cantidad: 1, bebida: '', tamaño: '250ml' }])
    updateFormData('otros', [{ descripcion: '' }])
  }

  const handleSubmit = () => {
    if (!validate()) {
      alert('Por favor, completa todos los campos requeridos.')
      return
    }
  }

  const currentDate = format(new Date(), 'eeee d MMMM yyyy', { locale: es })

  const cleanFormData = {
    ...formData,
    fundasPaquetes: formData.fundasPaquetes.filter((fp) => fp.cantidad && fp.paquete),
    bebidas: formData.bebidas.filter((b) => b.cantidad && b.bebida && b.tamaño),
    otros: formData.otros.filter((o) => o.descripcion)
  }

  return (
    <div className='p-6 max-w-xl mx-auto bg-white shadow-lg rounded-lg'>
      <div className='w-full flex justify-center'>
        <Image src='/fierro.svg' alt='Logo' width={200} height={200} />
      </div>
      <h1 className='text-2xl font-extrabold mb-6 mt-3 text-center text-gray-800'>Formulario de Pedido</h1>

      <InputField
        label='Nombre'
        value={formData.nombre}
        onChange={(value) => updateFormData('nombre', value)}
        error={errors.nombre}
      />
      <InputField
        label='Dirección'
        value={formData.direccion}
        onChange={(value) => updateFormData('direccion', value)}
        error={errors.direccion}
      />
      <InputField
        label='Teléfono'
        value={formData.telefono}
        onChange={(value) => updateFormData('telefono', value)}
        error={errors.telefono}
        type='number'
      />

      <PagoField
        pago={formData.pago}
        monto={formData.monto}
        onPagoChange={(value) => updateFormData('pago', value)}
        onMontoChange={(value) => updateFormData('monto', value)}
        error={errors.monto}
      />

      <InputField
        label='Cantidad Bolsa'
        value={formData.cantidadBolsa}
        onChange={(value) => updateFormData('cantidadBolsa', value)}
        type='number'
      />
      <InputField
        label='Cantidad Caja'
        value={formData.cantidadCaja}
        onChange={(value) => updateFormData('cantidadCaja', value)}
        type='number'
      />

      <FundasPaquetes
        fundasPaquetes={formData.fundasPaquetes}
        onAdd={addFundaPaquete}
        onRemove={removeFundaPaquete}
        onChange={(index, field, value) => {
          const newFundasPaquetes = [...formData.fundasPaquetes]
          newFundasPaquetes[index] = { ...newFundasPaquetes[index], [field]: value }
          updateFormData('fundasPaquetes', newFundasPaquetes)
        }}
      />

      <Bebidas
        bebidas={formData.bebidas}
        onAdd={addBebida}
        onRemove={removeBebida}
        onChange={(index, field, value) => {
          const newBebidas = [...formData.bebidas]
          newBebidas[index] = { ...newBebidas[index], [field]: value }
          updateFormData('bebidas', newBebidas)
        }}
      />

      <Otros
        otros={formData.otros}
        onAdd={addOtro}
        onRemove={removeOtro}
        onChange={(index, value) => {
          const newOtros = [...formData.otros]
          newOtros[index].descripcion = value
          updateFormData('otros', newOtros)
        }}
      />

      <div className='w-full flex justify-evenly'>
        <button onClick={handleSubmit} className='bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600'>
          Generar PDF
        </button>

        <button onClick={handleReset} className='bg-red-500 text-white p-3 rounded-md hover:bg-red-600'>
          Borrar Campos
        </button>
      </div>

      {isFormValid && (
        <div className='flex justify-center mt-6'>
          <PDFDownloadLink
            document={<PdfDocument data={cleanFormData} />}
            fileName={`Pedido_${formData.nombre}_${currentDate}.pdf`}
            className='flex items-center px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300'
          >
            {({ loading }) =>
              loading ? (
                <div className='flex items-center'>
                  <svg className='animate-spin h-5 w-5 mr-3 text-white' viewBox='0 0 24 24'>
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    ></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.96 7.96 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    ></path>
                  </svg>
                  Generando PDF...
                </div>
              ) : (
                <div className='flex items-center'>
                  <svg
                    className='h-5 w-5 mr-3 text-white'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 4v16m8-8H4'></path>
                  </svg>
                  Descargar PDF
                </div>
              )
            }
          </PDFDownloadLink>
        </div>
      )}
    </div>
  )
}

export default HomePage
