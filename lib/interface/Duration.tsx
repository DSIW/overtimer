import parseMs from "./parse-ms"

interface Props {
  milliseconds: number;
}

export default function Duration({ milliseconds }: Props) {
  let formattedDuration = ">0 m"

  const { hours, minutes, seconds } = parseMs(milliseconds)

  if (milliseconds > 0) {
    formattedDuration = `${hours} h ${minutes} m ${seconds} s`
  }

  return (
    <span>{formattedDuration}</span>
  )
}
