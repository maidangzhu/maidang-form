import { Input, Flex, Space } from "antd";

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
	return (
		<div style={wrapperStyle}>
			<Flex align="center" justify="center" style={boxStyle}>
				<Space direction="vertical" size="middle">
					Form component
					<Input/>
					<Input/>
				</Space>
			</Flex>
		</div>
	)
}

export default App
