import { memo } from 'react';

type ConditionalComponentProps = {
  show: boolean | null | undefined | string;
  children: React.ReactNode;
};

const ConditionalComponent: React.FC<ConditionalComponentProps> = memo(({ show, children }) => {
  if (!show) return null;
  return <>{children}</>;
});

export default ConditionalComponent;
