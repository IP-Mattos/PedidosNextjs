// hooks/useFormularioPedido.ts
import { useState } from 'react'
import { FormData, FormErrors, FundaPaquete, Bebida, Otro } from '@/types/index'

export const useFormularioPedido = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    direccion: '',
    telefono: '',
    pago: false,
    monto: '',
    cantidadBolsa: '',
    cantidadCaja: '',
    fundasPaquetes: [{ cantidad: 1, paquete: '' }], // Inicializa con un elemento
    bebidas: [{ cantidad: 1, bebida: '', tamaño: '250ml' }], // Inicializa con un elemento
    otros: [{ descripcion: '' }] // Inicializa con un elemento
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isFormValid, setIsFormValid] = useState(false)

  const updateFormData = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addFundaPaquete = () => {
    setFormData((prev) => ({
      ...prev,
      fundasPaquetes: [...prev.fundasPaquetes, { cantidad: 1, paquete: '' }]
    }))
  }

  const removeFundaPaquete = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      fundasPaquetes: prev.fundasPaquetes.filter((_, i) => i !== index)
    }))
  }

  const addBebida = () => {
    setFormData((prev) => ({
      ...prev,
      bebidas: [...prev.bebidas, { cantidad: 1, bebida: '', tamaño: '250ml' }]
    }))
  }

  const removeBebida = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      bebidas: prev.bebidas.filter((_, i) => i !== index)
    }))
  }

  const addOtro = () => {
    setFormData((prev) => ({
      ...prev,
      otros: [...prev.otros, { descripcion: '' }]
    }))
  }

  const removeOtro = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      otros: prev.otros.filter((_, i) => i !== index)
    }))
  }

  const validate = () => {
    const newErrors: FormErrors = {}
    let valid = true

    if (!formData.nombre) {
      newErrors.nombre = 'Nombre es requerido'
      valid = false
    }
    if (!formData.direccion) {
      newErrors.direccion = 'Dirección es requerida'
      valid = false
    }
    if (!formData.telefono) {
      newErrors.telefono = 'Teléfono es requerido'
      valid = false
    } else if (!/^\d+$/.test(formData.telefono)) {
      newErrors.telefono = 'Teléfono debe ser numérico'
      valid = false
    }
    if (!formData.pago && !formData.monto) {
      newErrors.monto = 'Monto es requerido si el pago no está realizado'
      valid = false
    }

    setErrors(newErrors)
    setIsFormValid(valid)
    return valid
  }

  return {
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
  }
}
