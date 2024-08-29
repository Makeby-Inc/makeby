'use client'

import type * as LabelPrimitive from '@radix-ui/react-label'
import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'
import {
	Controller,
	type ControllerProps,
	type ControllerRenderProps,
	type FieldPath,
	type FieldValues,
	FormProvider,
	useForm,
	useFormContext
} from 'react-hook-form'
import { cn } from '@core/utils'
import { Label } from './label'

const Form = FormProvider

interface FormFieldContextValue<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
	name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
	{} as FormFieldContextValue
)

function FormField<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ ...props }: ControllerProps<TFieldValues, TName>) {
	return (
		<FormFieldContext.Provider value={{ name: props.name }}>
			<Controller {...props} />
		</FormFieldContext.Provider>
	)
}

const useFormField = () => {
	const fieldContext = React.useContext(FormFieldContext)
	const itemContext = React.useContext(FormItemContext)
	const { getFieldState, formState } = useFormContext()

	const fieldState = getFieldState(fieldContext.name, formState)

	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- WIP
	if (!fieldContext) {
		throw new Error('useFormField should be used within <FormField>')
	}

	const { id } = itemContext

	return {
		id,
		name: fieldContext.name,
		formItemId: `${id}-form-item`,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		...fieldState
	}
}

interface FormItemContextValue {
	id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
	{} as FormItemContextValue
)

/**
 * React-hook-form을 사용한 Form 컴포넌트입니다.
 * Form validator로 zod를 함께 사용할 수 있습니다.
 * 
 * <br/> @example
 * ```tsx
  <Form {...storyForm}>
    <form onSubmit={() => console.log("Submit!")}>
      <FormField
        control={storyForm.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>이름</FormLabel>
            <FormControl>
              <Input placeholder="데브게이트" {...field} />
            </FormControl>
            <FormDescription>
              This is your public display name.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={storyForm.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>비밀번호</FormLabel>
            <FormControl>
              <Input placeholder="●●●●●●" {...field} />
            </FormControl>
            <FormDescription>Enter your password.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={storyForm.control}
        name="passwordConfirm"
        render={({ field }) => (
          <FormFieldItem
            title="비밀번호 확인"
            description="이 컴포넌트는 FormFieldItem을 사용했어요"
          >
            <Input placeholder="●●●●●●" {...field} />
          </FormFieldItem>
        )}
      />
      <Button type="submit">제출</Button>
    </form>
  </Form>
```
 */
const FormItem = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
	const id = React.useId()

	return (
		<FormItemContext.Provider value={{ id }}>
			<div ref={ref} className={cn('space-y-2', className)} {...props} />
		</FormItemContext.Provider>
	)
})
FormItem.displayName = 'FormItem'

const FormLabel = React.forwardRef<
	React.ElementRef<typeof LabelPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ title, className, ...props }, ref) => {
	const { error, formItemId } = useFormField()

	return (
		<Label
			title={title ?? ''}
			ref={ref}
			className={cn(error && 'text-destructive', className)}
			htmlFor={formItemId}
			{...props}
		/>
	)
})
FormLabel.displayName = 'FormLabel'

const FormControl = React.forwardRef<
	React.ElementRef<typeof Slot>,
	React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
	const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

	return (
		<Slot
			ref={ref}
			id={formItemId}
			aria-describedby={
				!error ? formDescriptionId : `${formDescriptionId} ${formMessageId}`
			}
			aria-invalid={Boolean(error)}
			{...props}
		/>
	)
})
FormControl.displayName = 'FormControl'

const FormDescription = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
	const { formDescriptionId } = useFormField()

	return (
		<p
			ref={ref}
			id={formDescriptionId}
			className={cn('text-muted-foreground text-sm', className)}
			{...props}
		/>
	)
})
FormDescription.displayName = 'FormDescription'

const FormMessage = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
	const { error, formMessageId } = useFormField()
	const body = error ? String(error.message) : children

	if (!body) {
		return null
	}

	return (
		<p
			ref={ref}
			id={formMessageId}
			className={cn('text-destructive text-sm font-medium', className)}
			{...props}
		>
			{body}
		</p>
	)
})
FormMessage.displayName = 'FormMessage'

interface FormFieldItemProps {
	title?: string
	description?: string
	responsive?: boolean
	label?: boolean
	children: React.ReactNode
}

/**
 * 기존 `FormField` 내부에 렌더링시키는 `FormDescription`, `FormItem`, `FormMessage` 컴포넌트들을 결합한 컴포넌트입니다.
 */
function FormFieldItem({
	title,
	description,
	responsive,
	label = true,
	children
}: FormFieldItemProps) {
	const Comp = label ? 'label' : 'div'

	return (
		<Comp className={cn('grid gap-2', responsive && 'pc:text-base text-sm')}>
			{title && (
				<div className="grid gap-[5px]">
					<div className="text-sm font-semibold">{title}</div>
					<FormDescription className="text-secondary-foreground font-light">
						{description}
					</FormDescription>
				</div>
			)}
			<FormItem>{children}</FormItem>
			<FormMessage />
		</Comp>
	)
}

export {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormFieldItem,
	FormItem,
	FormLabel,
	FormMessage,
	useForm,
	useFormField,
	type ControllerRenderProps
}
