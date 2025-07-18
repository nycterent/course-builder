import * as React from 'react'

import { cn } from '../utils/cn'

export interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, ...props }, ref) => {
		return (
			<textarea
				data-sr-textarea=""
				className={cn(
					'border-input ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:outline-hidden flex min-h-[80px] w-full rounded-md border bg-transparent px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
					className,
				)}
				ref={ref}
				{...props}
			/>
		)
	},
)
Textarea.displayName = 'Textarea'

export { Textarea }
