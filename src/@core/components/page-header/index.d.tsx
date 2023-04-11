import { ReactNode } from 'react'

export type PageHeaderProps = {
  title: ReactNode
  subtitle?: ReactNode
  href?: string;
  linkTitle?: string;
  onLinkClick?: () => void;
}
