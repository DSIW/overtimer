import {format} from 'date-fns'

interface Props {
  time: Date;
}

export default function DateCell({ time }: Props) {

  const weekday = format(time, "EE")
  const day = format(time, "d")
  const month = format(time, "MMM")
  const year = format(time, "yyyy")

  const sameYear = time.getFullYear() === new Date().getFullYear()

  return (
    <div className="root">
      <div className="weekday">{weekday}</div>
      <div className="date">{day}.&nbsp;{month} {!sameYear && year}</div>
      <style jsx>{`
        .root {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
        
        .weekday {
          font-size: 1.1rem;
          font-weight: 400;
        }
        
        .date {
          color: gray;
        }
      `}
      </style>
    </div>
  )
}
