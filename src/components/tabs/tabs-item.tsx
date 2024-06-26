'use client';
import React, { useEffect, useMemo, useRef } from 'react';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import { TabsInternalCellProps, useTabsContext } from './tabs-context';

interface Props {
  label: string | React.ReactNode;
  value: string;
  disabled?: boolean;
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>;
export type TabsItemProps = Props & NativeAttrs;

const TabsItemComponent: React.FC<React.PropsWithChildren<TabsItemProps>> = ({
  children,
  value,
  label,
  disabled = false,
  style,
  ...props
}: React.PropsWithChildren<TabsItemProps>) => {
  const { SCALE, UNIT, CLASS_NAMES } = useScale();
  const { register, currentValue } = useTabsContext();
  const isActive = useMemo(() => currentValue === value, [currentValue, value]);

  const TabsInternalCell: React.FC<TabsInternalCellProps> = ({ onClick, onMouseOver, activeClassName, activeStyle, hideBorder }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const { currentValue } = useTabsContext();
    const active = currentValue === value;
    const classes = useClasses('tab', {
      active,
      disabled,
      [activeClassName!]: active,
      'hide-border': hideBorder,
      CLASS_NAMES,
    });
    const clickHandler = () => {
      if (disabled) return;
      onClick && onClick(value);
    };

    return (
      <div
        ref={ref}
        {...props}
        className={classes}
        role="button"
        data-ui={'true'}
        onMouseOver={onMouseOver}
        onClick={clickHandler}
        style={active ? { ...style, ...activeStyle } : style}
      >
        {label}
        <style jsx>{`
          .tab {
            position: relative;
            box-sizing: border-box;
            cursor: pointer;
            outline: 0;
            text-transform: capitalize;
            white-space: nowrap;
            background-color: transparent;
            color: var(--color-background-400);
            user-select: none;
            display: flex;
            align-items: center;
            line-height: normal;
          }
          .tab:hover {
            color: var(--color-foreground-1000);
          }
          .tab:after {
            position: absolute;
            content: '';
            bottom: -1px;
            left: 0;
            right: 0;
            width: 100%;
            height: 2px;
            border-radius: 4px;
            transform: scaleX(0.75);
            background-color: var(--color-primary-1000);
            transition:
              opacity,
              transform 200ms ease-in;
            opacity: 0;
          }
          .active:after {
            opacity: 1;
            transform: scaleX(1);
          }
          .tab :global(svg) {
            max-height: 1em;
            margin-right: 5px;
          }
          .tab:first-of-type {
            margin-left: 0;
          }
          .active {
            color: var(--color-foreground-1000);
          }
          .disabled {
            color: var(--color-background-600);
            cursor: not-allowed;
          }
          .hide-border:before {
            display: block;
            content: ${label};
            font-weight: 500;
            height: 0;
            overflow: hidden;
            visibility: hidden;
          }
          .hide-border:after {
            display: none;
          }
          .hide-border.active {
            font-weight: 500;
          }

          ${SCALE.padding(
            0.875,
            value =>
              `padding: ${value.top} ${value.right} ${value.bottom} ${value.left}; --tabs-item-hover-left: calc(-1 * ${value.left}); --tabs-item-hover-right: calc(-1 * ${value.right});`,
            undefined,
            'tab',
          )}
          ${SCALE.margin(
            {
              top: 0,
              left: 0.2,
              right: 0.2,
              bottom: 0,
            },
            value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
            undefined,
            'tab',
          )}
          ${SCALE.font(0.875, value => `font-size: ${value};`, undefined, 'tab')}
          ${SCALE.w(1, value => `width: ${value};`, 'auto', 'tab')}
          ${SCALE.h(1, value => `height: ${value};`, 'auto', 'tab')}

          ${UNIT('tab')}
        `}</style>
      </div>
    );
  };
  TabsInternalCell.displayName = 'HimalayaTabsInternalCell';

  useEffect(() => {
    register && register({ value, cell: TabsInternalCell });
  }, [value, label, disabled]);

  /* eslint-disable react/jsx-no-useless-fragment */
  return isActive ? <>{children}</> : null;
};

TabsItemComponent.displayName = 'HimalayaTabsItem';
const TabsItem = withScale(TabsItemComponent);
export default TabsItem;
/* eslint-enable */
