'use client';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as React from 'react';
import { css } from '@styled-system/css';

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = DropdownMenuPrimitive.SubTrigger;

const DropdownMenuSubContent = DropdownMenuPrimitive.SubContent;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={`${css({
        zIndex: 50,
        minWidth: '8rem',
        overflow: 'hidden',
        rounded: 'md',
        border: '1px solid',
        borderColor: 'outline2',
        bg: 'bg_page1',
        shadow: 'shadow1',
        p: '2',
      })} ${className}`}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={`${css({
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      cursor: 'pointer',
      userSelect: 'none',
      rounded: 'sm',
      pl: inset ? '8' : '0.75rem',
      pr: '0.75rem',
      lineHeight: '1.5rem',
      height: '2rem',
      fontSize: '0.875rem',
      color: 'text3',
      bg: 'transparent',
      transition: 'all 0.16s ease-in-out',
      _hover: {
        bg: 'primary1',
        color: 'white',
      },
      outline: 'none',
    })} ${className}`}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = DropdownMenuPrimitive.CheckboxItem;

const DropdownMenuRadioItem = DropdownMenuPrimitive.RadioItem;

const DropdownMenuLabel = DropdownMenuPrimitive.Label;

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>((props, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={css({
      my: '2',
      mx: '0.5rem',
      height: '1px',
      bg: 'outline2',
    })}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuRadioGroup,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
};
