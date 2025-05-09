import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';
import Transition, {
  type TransitionStatus,
  ENTERED,
  ENTERING,
  EXITING,
} from 'react-transition-group/Transition';
import type { TransitionCallbacks } from '@restart/ui/types';
import { getChildRef } from '@restart/ui/utils';
import transitionEndListener from './transitionEndListener';
import type { BsPrefixOnlyProps } from './helpers';
import TransitionWrapper from './TransitionWrapper';
import { useBootstrapPrefix } from './ThemeProvider';

export interface OffcanvasTogglingProps
  extends TransitionCallbacks,
    BsPrefixOnlyProps {
  className?: string;
  in?: boolean;
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
  appear?: boolean;
  timeout?: number;
  children: React.ReactElement;
}

const propTypes = {
  /**
   * Show the component; triggers the fade in or fade out animation
   */
  in: PropTypes.bool,

  /**
   * Wait until the first "enter" transition to mount the component (add it to the DOM)
   */
  mountOnEnter: PropTypes.bool,

  /**
   * Unmount the component (remove it from the DOM) when it is faded out
   */
  unmountOnExit: PropTypes.bool,

  /**
   * Run the fade in animation when the component mounts, if it is initially
   * shown
   */
  appear: PropTypes.bool,

  /**
   * Duration of the fade animation in milliseconds, to ensure that finishing
   * callbacks are fired even if the original browser transition end events are
   * canceled
   */
  timeout: PropTypes.number,

  /**
   * Callback fired before the component fades in
   */
  onEnter: PropTypes.func,
  /**
   * Callback fired after the component starts to fade in
   */
  onEntering: PropTypes.func,
  /**
   * Callback fired after the has component faded in
   */
  onEntered: PropTypes.func,
  /**
   * Callback fired before the component fades out
   */
  onExit: PropTypes.func,
  /**
   * Callback fired after the component starts to fade out
   */
  onExiting: PropTypes.func,
  /**
   * Callback fired after the component has faded out
   */
  onExited: PropTypes.func,
};

const transitionStyles = {
  [ENTERING]: 'show',
  [ENTERED]: 'show',
};

const OffcanvasToggling = React.forwardRef<
  Transition<any>,
  OffcanvasTogglingProps
>(
  (
    {
      bsPrefix,
      className,
      children,
      in: inProp = false,
      mountOnEnter = false,
      unmountOnExit = false,
      appear = false,
      ...props
    },
    ref,
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'offcanvas');

    return (
      <TransitionWrapper
        ref={ref}
        addEndListener={transitionEndListener}
        in={inProp}
        mountOnEnter={mountOnEnter}
        unmountOnExit={unmountOnExit}
        appear={appear}
        {...props}
        childRef={getChildRef(children)}
      >
        {(status: TransitionStatus, innerProps: Record<string, unknown>) =>
          React.cloneElement(children as any, {
            ...innerProps,
            className: classNames(
              className,
              (children.props as any).className,
              (status === ENTERING || status === EXITING) &&
                `${bsPrefix}-toggling`,
              transitionStyles[status],
            ),
          })
        }
      </TransitionWrapper>
    );
  },
);

OffcanvasToggling.propTypes = propTypes as any;
OffcanvasToggling.displayName = 'OffcanvasToggling';

export default OffcanvasToggling;
