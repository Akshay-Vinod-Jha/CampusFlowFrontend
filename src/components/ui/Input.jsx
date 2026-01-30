import { forwardRef } from 'react';

/**
 * Professional Input Component
 * Supports: text, email, password, number, date, etc.
 * States: disabled, error
 */

const Input = forwardRef(
  (
    {
      label,
      error,
      helperText,
      className = '',
      containerClassName = '',
      ...props
    },
    ref
  ) => {
    const baseStyles = 'input w-full px-3 py-2 rounded-lg bg-white border border-neutral-300 text-neutral-900 placeholder-neutral-400 transition-colors duration-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 disabled:bg-neutral-100 disabled:cursor-not-allowed';
    
    const errorStyles = error ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20' : '';

    return (
      <div className={`w-full ${containerClassName}`}>
        {label && (
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            {label}
            {props.required && <span className="text-error-500 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          className={`${baseStyles} ${errorStyles} ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-error-600">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-neutral-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
