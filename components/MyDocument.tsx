import React from 'react'
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer'
import { format } from 'date-fns'

import logo from '@/public/fierro.svg' // Asegúrate de importar tu logo SVG
import { es } from 'date-fns/locale'

// Tamaño para impresora de tickets (80mm x altura dinámica)
const PAGE_WIDTH = 160

const styles = StyleSheet.create({
  page: {
    padding: 15,
    fontSize: 10, // Reducido para ajustar mejor en el ticket
    fontFamily: 'Helvetica',
    width: `${PAGE_WIDTH}mm`,
    flexDirection: 'column'
  },
  header: {
    marginBottom: 15,
    textAlign: 'center'
  },
  section: {
    marginBottom: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Para alinear el contenido en una sola línea
    marginBottom: 5,
    paddingBottom: 5
  },
  cell: {
    flex: 1, // Ocupa el ancho disponible
    textAlign: 'left',
    fontSize: 9 // Reducido para mayor legibilidad
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  logo: {
    height: 50, // Ajustado para un tamaño más adecuado
    marginBottom: 10
  },
  textBold: {
    fontWeight: 'bold'
  },
  borderBottom: {
    borderBottom: '1px solid #000',
    paddingBottom: 5
  }
})

interface PdfDocumentProps {
  data: {
    nombre: string
    direccion: string
    telefono: string
    pago: boolean
    monto: string
    cantidadBolsa: string
    cantidadCaja: string
    fundasPaquetes: { cantidad: number; paquete: string }[]
    bebidas: { cantidad: number; bebida: string; tamaño: string }[]
    otros: { descripcion: string }[]
  }
}

const PdfDocument: React.FC<PdfDocumentProps> = ({ data }) => {
  // Obtener la fecha actual en formato 'eeee d MMMM yyyy'
  const currentDate = format(new Date(), 'eeee d MMMM yyyy', { locale: es })

  return (
    <Document>
      <Page size={[PAGE_WIDTH, 'auto']} style={styles.page}>
        <View style={styles.header}>
          <Image src='./fierro.jpg' style={styles.logo} />
          <Text style={styles.title}>Pedidos</Text>
          <Text>Fecha: {currentDate}</Text>
        </View>
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.cell}>Nombre: {data.nombre}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Dirección: {data.direccion}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Teléfono: {data.telefono}</Text>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.cell}>Pago: {data.pago ? 'Sí' : 'No'}</Text>
            {!data.pago && (
              <>
                <Text style={styles.cell}>Monto: ${data.monto}</Text>
              </>
            )}
          </View>
        </View>

        {data.cantidadBolsa.length > 0 && (
          <View style={styles.section}>
            <View style={styles.row}>
              <Text style={styles.cell}>Bolsa: {data.cantidadBolsa}</Text>
              {data.cantidadBolsa}
            </View>
            <View style={styles.row}>
              <Text style={styles.cell}>Caja: {data.cantidadCaja}</Text>
            </View>
          </View>
        )}
        {data.fundasPaquetes.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.textBold}>Fundas o Paquetes:</Text>
            {data.fundasPaquetes.map((item, index) => (
              <View key={index} style={styles.row}>
                <Text style={styles.cell}>
                  Paquete o Funda: x{item.cantidad} - {item.paquete}
                </Text>
              </View>
            ))}
          </View>
        )}
        {data.bebidas.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.textBold}>Bebidas:</Text>
            {data.bebidas.map((item, index) => (
              <View key={index} style={styles.row}>
                <Text style={styles.cell}>
                  x{item.cantidad}
                  {item.bebida} {item.tamaño}
                </Text>
              </View>
            ))}
          </View>
        )}
        {data.otros.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.textBold}>Otros:</Text>
            {data.otros.map((item, index) => (
              <View key={index} style={styles.row}>
                <Text style={styles.cell}>Descripción: {item.descripcion}</Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  )
}

export default PdfDocument
