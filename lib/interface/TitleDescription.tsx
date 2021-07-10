import { ReactNode } from "react";

interface Props {
  title: ReactNode | string;
  description: ReactNode | string;
}

export default function TitleDescription({ title, description }: Props) {
  return (
    <div>
      <div>
        <strong>
          {title}
        </strong>
      </div>
      <div>
        {description}
      </div>
    </div>
  )
}
