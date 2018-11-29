import React from 'react';
import TouchFeedback from 'rmc-feedback';
import classnames from 'classnames';

export default class KeyboardItem extends React.Component {
    static defaultProps = {
      prefixCls: 'math-keyboard',
      onClick: () => {},
      disabled: false,
    };
  
    render() {
      const {
        prefixCls,
        onClick,
        className,
        disabled,
        children,
        value,
        icon,
        ...restProps
      } = this.props;
  
      const wrapCls = classnames(`${prefixCls}-item`, className);
      return (
        <TouchFeedback activeClassName={`${prefixCls}-item-active`}>
          <div
            onClick={e => {
              onClick(e,value);
            }}
            className={wrapCls}
            {...restProps}
          >
            {children}
          </div>
        </TouchFeedback>
      );
    }
  }