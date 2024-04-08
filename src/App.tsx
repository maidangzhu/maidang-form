import { Input, Flex, Button } from "antd";
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
			<Flex align="center" justify="start" style={boxStyle}>
				<Form
					style={{width: '100%'}}
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
					<Form.Item name="name" label="name" tooltip="hello world">
						<Input/>
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit">
							提交
						</Button>
					</Form.Item>
					<Form.Item>
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
