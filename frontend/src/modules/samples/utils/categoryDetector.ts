export function getCategoryLabel(level: string, name: string): string {
  const GPU = ['RTX', 'RX', 'ARC', 'GTX', 'QUADRO']
  const CPU = ['RYZEN', 'I3', 'I5', 'I7', 'I9']
  const PERIPHERAL = [
    'MOUSE',
    'TECLADO',
    'HEADSET',
    'HEADPHONE',
    'MONITOR',
    'FONE',
    'FONE DE OUVIDO',
    'CAIXA DE SOM',
    'MONITOR DE AUDIO',
    'DAC',
    'AMPLIFICADOR',
    'MICROFONE',
    'MOUSEPAD',
  ]

  const upperName = name.toUpperCase()

  let category = 'Hardware'

  if (GPU.some(k => upperName.includes(k))) {
    category = 'Placa Gráfica'
  } else if (CPU.some(k => upperName.includes(k))) {
    category = 'Processador'
  } else if (PERIPHERAL.some(k => upperName.includes(k))) {
    category = 'Periférico'
  }

  switch (level) {
    case 'high-end':
      category += ' High End'
      break
    case 'mid-end':
      category += ' Mid End'
      break
    case 'low-end':
      category += ' Low End'
      break
  }

  return category
}
