'use client';
import React from 'react';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import LinkIcon from './icon';

export interface Props {
  href?: string;
  color?: boolean;
  icon?: boolean;
  underline?: boolean | 'hover';
  block?: boolean;
  className?: string;
}

type NativeAttrs = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof Props>;
export type LinkProps = Props & NativeAttrs;

const LinkComponent = React.forwardRef<HTMLAnchorElement, React.PropsWithChildren<LinkProps>>(
  (
    { href = '', color = false, underline = false, children, className = '', block = false, icon = false, ...props }: React.PropsWithChildren<LinkProps>,
    ref: React.Ref<HTMLAnchorElement>,
  ) => {
    const { UNIT, SCALE, CLASS_NAMES } = useScale();
    const linkColor = color || block ? `var(--color-link-1000)` : 'inherit';
    const hoverColor = color || block ? `var(--color-link-900)` : 'inherit';
    const classes = useClasses(
      'link',
      { block },
      className,
      {
        underline: underline === true,
        'underline-hover': underline === 'hover',
      },
      CLASS_NAMES,
    );

    return (
      <a className={classes} href={href} {...props} ref={ref}>
        {children}
        {icon && <LinkIcon />}
        <style jsx>{`
          .link {
            display: inline-flex;
            align-items: baseline;
            line-height: inherit;
            color: ${linkColor};
            text-decoration: none;
            transition: color 200ms ease 0ms;
            text-decoration: none;
          }

          .underline {
            text-decoration: underline;
          }
          .underline-hover {
            text-decoration: none;
            &:hover {
              text-decoration: underline;
            }
          }

          .link:hover {
            background-color: ${block ? `rgba(var(--color-link-900-rgb), 0.9)` : 'unset'};
            color: ${hoverColor};
          }

          ${SCALE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'link')}
          ${SCALE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'link')}
          ${SCALE.padding(
            {
              top: 0.125,
              bottom: 0.125,
              left: 0.25,
              right: 0.25,
            },
            value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
            undefined,
            'block',
          )}
          ${SCALE.margin(
            {
              top: 0,
              bottom: 0,
              left: -0.125,
              right: -0.125,
            },
            value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
            undefined,
            'block',
          )}
          ${SCALE.w(1, value => `width: ${value};`, 'fit-content', 'link')}
          ${SCALE.h(1, value => `height: ${value};`, 'auto', 'link')}
          ${SCALE.font(1, value => `font-size: ${value};`, 'inherit', 'link')}
          ${SCALE.r(1, value => `border-radius: ${value};`, 'var(--layout-radius)', 'block')}

          ${UNIT('link')}
        `}</style>
      </a>
    );
  },
);

LinkComponent.displayName = 'HimalayaLink';
const Link = withScale(LinkComponent);
export default Link;
