import type { Meta, StoryObj } from '@storybook/react'
import {
	Button,
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormFieldItem,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	useForm
} from '@design-system/ui'

const meta: Meta<typeof Form> = {
	title: 'ui/Form',
	component: FormItem
}

export default meta

type Story = StoryObj<typeof Form>

export const Primary: Story = {
	render: (props) => {
		const storyForm = useForm()

		return (
			<Form {...storyForm}>
				<form onSubmit={() => console.log('Submit!')}>
					<div className="gap-md grid">
						<FormField
							control={storyForm.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>이름</FormLabel>
									<FormControl>
										<Input placeholder="데브게이트" {...field} />
									</FormControl>
									<FormDescription>This is your public display name.</FormDescription>
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
					</div>
				</form>
			</Form>
		)
	},
	name: 'Form'
}
