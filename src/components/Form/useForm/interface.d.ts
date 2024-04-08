export type Nullable<T> = T | null;

export interface ConfigWayProps {
	onFinish?: (values: unknown) => void;
	onReset?: () => void;
	onFinishFailed?: (values: unknown) => void;
}

export interface FormInstance {
	registerField: (name: NameProps, updateChange: DataProps) => void;
	unRegisterField: (name: NameProps) => void;
	getFieldValue: (name?: NameProps) => unknown;
	dispatch: (action: ReducerAction) => void;
	setConfigWays: (callbacks: ConfigWayProps) => void;
	submit: (cb?: unknown) => void;
	resetFields: (cb?: () => void) => void;
	getFieldValidate: (name: NameProps) => unknown;
}

export interface updateChangeProps {
	[key: string]: updateProps;
}

export interface updateProps {
	message?: string;
	required?: boolean;
	updateValue?: unknown;
	rules?: validateRuleProps[];
}

export interface validateRule {
	[key: string]: validateRuleListProps | null;
}

export interface validateRuleListProps {
	required: boolean;
	requiredMessage?: string;
	message: string;
	status: validateStatusProps;
	rules: rulesProps[];
}

interface rulesProps {
	rule?: RegExp | ((value: unknown) => boolean);
	message?: string;
}

export interface validateRuleProps {
	required?: boolean;
	message?: string;
	rule?: RegExp | ((value: unknown) => boolean);
}

export type validateStatusProps = "res" | "rej" | "pen"; // res 成功 rej 失败 pen 等待

export interface DataProps {
	[key: string]: unknown;
}

export type NameProps = string | number;

export type ReducerAction = UpdateAction | validateAction;

interface UpdateAction {
	type: "updateValue";
	name: NameProps;
	value: unknown;
}

interface validateAction {
	type: "validateField";
	name: NameProps;
}
