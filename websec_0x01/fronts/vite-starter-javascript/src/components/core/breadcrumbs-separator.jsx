import * as React from 'react';
import { CaretRight as CaretRightIcon } from '@phosphor-icons/react/dist/ssr/CaretRight';

export function BreadcrumbsSeparator() {
  return <CaretRightIcon color="var(--joy-palette-text-primary)" fontSize="var(--joy-fontSize-xs)" />;
}
