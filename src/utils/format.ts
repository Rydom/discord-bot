export const formatDuration = (duration: number): string => {
  const durationInMilliseconds = duration / 1000
  const seconds = durationInMilliseconds % 60
  const minutes = Math.floor((durationInMilliseconds / 60) % 60)
  const hours = Math.floor((durationInMilliseconds / (60 * 60)) % 24)

  if (hours > 0)
    return `${padFormat(hours)}:${padFormat(minutes)}:${padFormat(seconds)}`

  return `${padFormat(minutes)}:${padFormat(seconds)}`
}

const padFormat = (n: number): string => n.toString().padStart(2, '0')
