import { Input, Flex, Space, Button } from "antd";
import Form from "./components/Form";
import { FormInstance } from "./components/Form/useForm/interface";
import { useRef } from "react";

const boxStyle: React.CSSProperties = {
	width: '100%',
	height: 200,
	borderRadius: 6,
	border: '1px solid #40a9ff',
	padding: 20
};

const wrapperStyle: React.CSSProperties = {
	width: '720px',
	padding: 20
}

function App() {
	const ref = useRef<FormInstance>(null);

	return (
		<div style={wrapperStyle}>
			<Flex align="center" justify="center" style={boxStyle}>
				<Form
					initialValues={{name: 'maidang'}}
					ref={ref}
					onFinish={(data: unknown) => {
						console.log("表单数据:", data);
					}}
					onFinishFailed={(errorInfo: unknown) => {
						console.log("Failed:", errorInfo);
					}}
					onReset={() => {
						console.log("重制表单成功");
					}}
				>
					<Form.Item name="name" label="name">
						<Input/>
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit">
							提交
						</Button>
						<Button style={{marginLeft: 4}} htmlType="reset">
							重置
						</Button>
					</Form.Item>
				</Form>
			</Flex>
		</div>
	)
}

export default App
