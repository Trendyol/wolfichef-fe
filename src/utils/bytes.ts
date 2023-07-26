const humanReadableBytes = (bytes: number, decimals?: number): string => {
  if (bytes == 0) return '0 b'
  const k: number = 1024,
    dm: number = decimals || 2,
    sizes: string[] = ['b', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i: number = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export default {
  humanReadableBytes
}
