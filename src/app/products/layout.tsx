import Link from 'next/link';
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function ProductsLayout({ children }: LayoutProps) {
  return (
    <>
      {children}

      <footer className="border-t border-border/90 sticky bottom-0 w-full bg-white">
        <div className="flex flex-col items-start md:flex-row h-[40px]">
          <p className="text-left text-xs leading-loose font-medium text-muted-foreground pl-20 pt-2">
            Construido para {" "}
            <Link
              href="mailto:hogarycomercio.mx"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4"
            >
              hyc/jvv
            </Link>
            . Mejoras y sugerencias {" "}
            <Link
              href="mailto:alejandro.ramirez@hogarycomercio.mx"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4"
            >
              jarl
            </Link>
            .
          </p>
        </div>
      </footer>

    </>
  );
}