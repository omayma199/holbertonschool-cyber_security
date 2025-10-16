import * as React from 'react';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { ArrowLineLeft as ArrowLineLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLineLeft';
import { ArrowLineRight as ArrowLineRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowLineRight';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { DotsThree as DotsThreeIcon } from '@phosphor-icons/react/dist/ssr/DotsThree';

export function PaginationItem({ color = 'neutral', disabled, onClick, page, selected, size, type, variant }) {
  if (type === 'start-ellipsis' || type === 'end-ellipsis') {
    return (
      <IconButton color={color} disabled={disabled} size={size} variant={variant}>
        <DotsThreeIcon fontSize="var(--Icon-fontSize)" weight="bold" />
      </IconButton>
    );
  }

  if (type === 'page') {
    return (
      <Button
        color={color}
        disabled={disabled}
        onClick={(event) => {
          onClick(event, page);
        }}
        size={size}
        sx={{ ...(selected && { outlineOffset: '2px', outline: '2px solid var(--joy-palette-neutral-200)' }) }}
        variant={variant}
      >
        {page}
      </Button>
    );
  }

  const iconsNormalized = {
    first: ArrowLineLeftIcon,
    previous: ArrowLeftIcon,
    next: ArrowRightIcon,
    last: ArrowLineRightIcon,
  };

  const labelsNormalized = { first: 'First', previous: 'Previous', next: 'Next', last: 'Last' };

  const Icon = iconsNormalized[type];
  const iconPosition = type === 'first' || type === 'previous' ? 'start' : 'end';
  const label = labelsNormalized[type];

  return (
    <Button
      color={color}
      disabled={disabled}
      onClick={(event) => {
        onClick(event, page);
      }}
      size={size}
      variant={variant}
      {...(Icon && {
        [iconPosition === 'start' ? 'startDecorator' : 'endDecorator']: (
          <Icon fontSize="var(--Icon-fontSize)" weight="bold" />
        ),
      })}
    >
      {label}
    </Button>
  );
}
