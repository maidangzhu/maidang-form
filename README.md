Build your own form component in React, like Ant Design Form component.

## Example
```tsx
  <Form
	initialValues={{ name: 'maidang form' }}
	onFinish={(data: unknown) => {
		console.log('form data:', data)
	}}
	onReset={() => {
		console.log('reset form')
	}}
>
	<Form.Item label="name" name="book">
		<Input placeholder="please enter name"/>
	</Form.Item>

	<Form.Item label="address" name="name">
		<Input placeholder="please enter address"/>
	</Form.Item>

	<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
		<Button type="primary" htmlType="submit">
			Submit
		</Button>
		<Button style={{ marginLeft: 4 }} htmlType="reset">
			Reset
		</Button>
	</Form.Item>
</Form>

```
