'use client';
import React from 'react';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';

interface Props {}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLParagraphElement>, keyof Props>;
export type ModalSubtitleProps = Props & NativeAttrs;

const ModalSubtitleComponent: React.FC<React.PropsWithChildren<ModalSubtitleProps>> = ({
  className = undefined,
  children,
  ...props
}: React.PropsWithChildren<ModalSubtitleProps>) => {
  const { SCALE, UNIT, CLASS_NAMES } = useScale();

  return (
    <>
      <p className={useClasses('modal-sub-title', className, CLASS_NAMES)} {...props}>
        {children}
      </p>
      <style jsx>{`
        .modal-sub-title {
          font-weight: normal;
          display: inline-block;
          text-align: center;
          word-break: break-word;
          text-transform: uppercase;
          color: var(--color-background-400);
        }

        ${SCALE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'modal-sub-title')}
        ${SCALE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'modal-sub-title')}

        ${SCALE.w(1, value => `width: ${value};`, 'auto', 'modal-sub-title')}
        ${SCALE.h(1, value => `height: ${value};`, 'auto', 'modal-sub-title')}

        ${SCALE.font(0.875, value => `font-size: ${value};`, undefined, 'modal-sub-title')}
        ${SCALE.lineHeight(1.32, value => `line-height: ${value};`, undefined, 'modal-sub-title')}
        ${UNIT('modal-sub-title')}
      `}</style>
    </>
  );
};

ModalSubtitleComponent.displayName = 'HimalayaModalSubtitle';
const ModalSubtitle = withScale(ModalSubtitleComponent);
export default ModalSubtitle;
