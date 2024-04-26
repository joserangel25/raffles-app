export const getTimestamps = (date: string) => {
  const newDate = date.replaceAll('-', '/')
  return new Date(newDate).getTime()
}

export const formatDate = (date: bigint) => {
  return new Date(Number(date)).toLocaleDateString('es-CO', {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}


export const isTimeExpired = (date: number) => {
  const oneDayInMs = 1000 * 60 * 60 * 24;
  const endDate = date + oneDayInMs
  return endDate < Date.now()
}