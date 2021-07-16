import { ReactNode } from "react";

interface Props {
  title: ReactNode | string;
  description: ReactNode | string;
}

export default function TitleDescription({ title, description }: Props) {
  return (
    <div>
      <div className="title">
        {title}
      </div>
      <div className="description">
        {description}
      </div>
      <style jsx>{`
        .title {
          font-size: 1.1rem;
          font-weight: 400;
        }
        
        :global(th) .title {
          font-size: 1rem;
          font-weight: 500;
        }
        
        .description {
          color: gray;
        }
      `}
      </style>
    </div>
  )
}
