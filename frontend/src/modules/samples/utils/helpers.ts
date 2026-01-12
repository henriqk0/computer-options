// Helper utilities for UI components

export function getInitials(name: string) {
  const words = name.split(' ').filter((word) => word.length > 0)
  if (words.length >= 2) {
    return words[0]![0]! + words[1]![0]!
  }

  if (words.length === 1) {
    return words[0]![0]!
  }

  return ``
}

export function getColorClass(index: number): string {
  const colors = [
    'bg-blue-500',
    'bg-purple-500',
    'bg-green-500',
    'bg-pink-500',
    'bg-yellow-500',
    'bg-indigo-500'
  ]
  return colors[index % colors.length]!
}

export function getRoleColor(role: string): string {
  const colorMapper = new Map([
    ['user', 'bg-teal-600'],
    ['editor', 'bg-blue-600'],
    ['admin', 'bg-indigo-600'],
  ]);
  const roleColor = colorMapper.get(role)

  return roleColor!
}
