'use client';

import React from 'react';
import Text from '../text';

const ErrorPage404: React.FC = () => {
  return (
    <div className="error-404">
      <div className="error-message">
        <Text h1 mb={0} style={{ textAlign: 'center' }}>
          404 - Page not found
        </Text>
        <Text mb={0} font="14px" type="secondary">
          The page you request seems not to be found.
        </Text>
      </div>
      <style jsx>{`
        .error-404 {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          max-width: var(--layout-page-width-with-margin);
          margin: 0 auto;
          margin: 0 auto;
        }
        .error-message {
          padding: 0 var(--layout-gap);
          display: flex;
          align-items: center;
          justify-items: center;
          width: 100%;
          place-content: center;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
};

export default ErrorPage404;
