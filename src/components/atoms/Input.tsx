import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div className="relative group w-full">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#cbc3d7] flex items-center justify-center">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            'flex h-9 w-full rounded-full border border-[#30363D]/40 bg-[#181b25] px-3 py-1 text-sm text-white shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#cbc3d7]/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8B5CF6] disabled:cursor-not-allowed disabled:opacity-50',
            icon && 'pl-10',
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
