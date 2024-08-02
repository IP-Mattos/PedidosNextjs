// types.ts
export interface FundaPaquete {
  cantidad: number
  paquete: string
}

export interface Bebida {
  cantidad: number
  bebida: string
  tamaño: string
}

export interface Otro {
  descripcion: string
}

export interface FormData {
  nombre: string
  direccion: string
  telefono: string
  pago: boolean
  monto: string
  cantidadBolsa: string
  cantidadCaja: string
  fundasPaquetes: FundaPaquete[]
  bebidas: Bebida[]
  otros: Otro[]
}

export interface FormErrors {
  nombre?: string
  direccion?: string
  telefono?: string
  monto?: string
}
