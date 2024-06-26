'use client';

import React from 'react';
import useScale, { withScale } from '../use-scale';
import useClasses from '../use-classes';

interface Props {}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLSpanElement>, keyof Props>;
export type SpinnerProps = Props & NativeAttrs;

const getSpans = () => {
  return [...new Array(12)].map((_, index) => (
    <span key={`spinner-${index}`}>
      <style jsx={true}>{`
        span {
          background-color: var(--color-foreground-1000);
          position: absolute;
          top: -3.9%;
          width: 24%;
          height: 8%;
          left: -10%;
          border-radius: var(--layout-radius);
          animation: spinner 1.2s linear 0s infinite normal none running;
        }

        span:nth-child(1) {
          animation-delay: -1.2s;
          transform: rotate(0deg) translate(146%);
        }

        span:nth-child(2) {
          animation-delay: -1.1s;
          transform: rotate(30deg) translate(146%);
        }

        span:nth-child(3) {
          animation-delay: -1s;
          transform: rotate(60deg) translate(146%);
        }

        span:nth-child(4) {
          animation-delay: -0.9s;
          transform: rotate(90deg) translate(146%);
        }

        span:nth-child(5) {
          animation-delay: -0.8s;
          transform: rotate(120deg) translate(146%);
        }

        span:nth-child(6) {
          animation-delay: -0.7s;
          transform: rotate(150deg) translate(146%);
        }

        span:nth-child(7) {
          animation-delay: -0.6s;
          transform: rotate(180deg) translate(146%);
        }

        span:nth-child(8) {
          animation-delay: -0.5s;
          transform: rotate(210deg) translate(146%);
        }

        span:nth-child(9) {
          animation-delay: -0.4s;
          transform: rotate(240deg) translate(146%);
        }

        span:nth-child(10) {
          animation-delay: -0.3s;
          transform: rotate(270deg) translate(146%);
        }

        span:nth-child(11) {
          animation-delay: -0.2s;
          transform: rotate(300deg) translate(146%);
        }

        span:nth-child(12) {
          animation-delay: -0.1s;
          transform: rotate(330deg) translate(146%);
        }

        @keyframes spinner {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0.15;
          }
        }
      `}</style>
    </span>
  ));
};

const SpinnerComponent: React.FC<SpinnerProps> = ({ className, ...props }: SpinnerProps) => {
  const { SCALE, UNIT, CLASS_NAMES } = useScale();
  const classes = useClasses('spinner', className, CLASS_NAMES);

  return (
    <div className={classes} {...props}>
      <div className="container">{getSpans()}</div>

      <style jsx>{`
        .spinner {
          display: block;
          box-sizing: border-box;
        }

        .container {
          width: 100%;
          height: 100%;
          position: relative;
          left: 50%;
          top: 50%;
        }
        ${SCALE.w(1.25, value => `width: ${value};`, undefined, 'spinner')}
        ${SCALE.h(1.25, value => `height: ${value};`, undefined, 'spinner')}
        ${SCALE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'spinner')}
        ${SCALE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'spinner')}
        ${UNIT('spinner')}
      `}</style>
    </div>
  );
};

SpinnerComponent.displayName = 'HimalayaSpinner';
const Spinner = withScale(SpinnerComponent);
export default Spinner;
