import React, { memo } from 'react';
import './Meta.scss';

interface IProps {
  title: string;
  value: string | number;
}

const Meta = ({ title, value }: IProps) => (
  <div className="Meta" tabIndex={0} aria-label={`${title} is ${value}`}>
    <span className="Meta__Title">{title}</span>
    <br />
    <span className="Meta__Value">{value}</span>
  </div>
);

export default memo(Meta);
