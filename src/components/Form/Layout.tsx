import { Col, Row, Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

interface IndexProps {
	children: React.ReactNode;
	label?: string;
	required?: boolean;
	status?: 'pen' | 'rej' | 'res';
	message?: string;
	tooltip?: string;
}

const Index: React.FC<IndexProps> = (
	{
		children,
		label,
		required,
		status,
		message,
		tooltip,
	}) => {

	return (
		<>
			<Row gutter={8}>
				<Col
					span={4}
					style={{textAlign: "right", lineHeight: "32px", fontSize: 14}}
				>
					{required && <span style={{color: "red", marginRight: 3}}>*</span>}
					{label || ""}
					{tooltip && (
						<Tooltip title={tooltip}>
							<QuestionCircleOutlined style={{margin: "0 3px"}}/>
						</Tooltip>
					)}
					{label && "："}
				</Col>
				<Col span={9}>
					<div>{children}</div>
					{status === "rej" && <div style={{
						color: "red",
						fontSize: 12,
						lineHeight: "22px",
						padding: "0 6px",
					}}>{message}</div>}
				</Col>
			</Row>
			<div style={{height: 12}}></div>
		</>
	);
};

export default Index;
