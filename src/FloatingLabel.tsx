import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';

import FormGroup, { type FormGroupProps } from './FormGroup';
import type { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';
import { useBootstrapPrefix } from './ThemeProvider';

export interface FloatingLabelProps extends FormGroupProps, BsPrefixProps {
  controlId?: string;
  label: React.ReactNode;
}

const propTypes = {
  as: PropTypes.elementType,

  /**
   * Sets `id` on `<FormControl>` and `htmlFor` on `<label>`.
   */
  controlId: PropTypes.string,

  /**
   * Form control label.
   */
  label: PropTypes.node.isRequired,
};

const FloatingLabel: BsPrefixRefForwardingComponent<'div', FloatingLabelProps> =
  React.forwardRef<HTMLElement, FloatingLabelProps>(
    ({ bsPrefix, className, children, controlId, label, ...props }, ref) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'form-floating');

      return (
        <FormGroup
          ref={ref}
          className={classNames(className, bsPrefix)}
          controlId={controlId}
          {...props}
        >
          {children}
          <label htmlFor={controlId}>{label}</label>
        </FormGroup>
      );
    },
  ) as typeof FloatingLabel;

FloatingLabel.displayName = 'FloatingLabel';
FloatingLabel.propTypes = propTypes;

export default FloatingLabel;
