import { ChevronRight } from "lucide-react";
import { ReactNode } from "react";
import Link from "next/link";

interface Props {
  title: ReactNode;
  children: ReactNode;
  href?: string;
}

export default function StatisticsCard({ title, children, href }: Props) {
  const content = (
    <div>
      <div className="flex items-center gap-1 text-sm uppercase text-content-secondary">
        {title}
        {href && <ChevronRight size={16} />}
      </div>
      <div className="text-right text-xl text-accent">{children}</div>
    </div>
  );

  if (!href) {
    return content;
  }

  return (
    <Link href={href} className="cursor-pointer text-inherit no-underline">
      {content}
    </Link>
  );
}
