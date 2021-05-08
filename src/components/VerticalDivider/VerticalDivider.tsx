import React from 'react';

interface IProps {
    color?: string;
    width?: string;
    className?: string;
}

const VerticalDivider = ({
  color,
  width,
  className,
}: IProps) => (
  <div 
    className={className}
    style={{
      width,
      backgroundColor: color,
    }} 
  />
);

export default VerticalDivider;