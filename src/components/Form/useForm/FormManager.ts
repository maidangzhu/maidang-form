import {
	ConfigWayProps,
	DataProps,
	FormInstance,
	NameProps,
	ReducerAction,
	updateProps,
	validateRule,
	validateRuleListProps, validateStatusProps
} from "./interface";

export class FormManager {
	store: DataProps = {};
	readonly initialValues: DataProps = {};
	update_store: DataProps = {}; // 相当于是更新后的回调
	configWays: ConfigWayProps = {}; // 收录对应的方法集合
	validateRule: validateRule = {}; // 校验表单的规则

	constructor(initialValues: DataProps) {
		this.store = initialValues;
		this.initialValues = initialValues;
		this.update_store = {};
		this.validateRule = {};
	}

	getDetail = (): FormInstance => {
		return {
			registerField: this.registerField,
			unRegisterField: this.unRegisterField,
			getFieldValue: this.getFieldValue,
			dispatch: this.dispatch,
			setConfigWays: this.setConfigWays,
			submit: this.submit,
			resetFields: this.resetFields,
			getFieldValidate: this.getFieldValidate
		}
	}

	dispatch = (action: ReducerAction) => {
		const {type, name, value} = action;
		switch (type) {
			case "updateValue": {
				this.updateValue(name, value);
				break;
			}
			default:
		}
	}

	registerField = (name: NameProps, updateChange: DataProps) => {
		this.update_store[name] = updateChange;
		this.validateRule[name] = this.createValidate(name, updateChange);
	}

	unRegisterField = (name: NameProps) => {
		delete this.update_store[name];
		delete this.validateRule[name];
	}

	public resetFields = () => {
		this.store = this.initialValues
	}

	getFieldValue = (name?: NameProps) => {
		if (!name) return this.store;
		return this.store[name];
	};

	updateValue = (name: NameProps, value: unknown) => {
		this.store = {
			...this.store,
			[name]: value
		};

		this.updateStoreField(name)
	};

	getFieldValidate = () => {

	}

	// 保存从业务层传递进来的方法
	setConfigWays = (configWays: ConfigWayProps) => {
		this.configWays = configWays;
	};

	updateStoreField = (name: NameProps) => {
		const update = this.update_store[name];
		if (update) update?.updateValue();
	};

	// 执行从业务层传递进来的方法
	submit = () => {
		const status = this.validateField();
		const {onFinish} = this.configWays;

		status && onFinish && onFinish(this.store);
	};

	// 用于单个验证表单
	validateFieldValue = (name: NameProps) => {
		const data = this.validateRule[name];
		if (!data) return null;

		const value = this.store[name];
		const last_status = data.status;
		const last_message = data.message;
		let status: validateStatusProps = "res";
		if (data.required && !value) {
			status = "rej";
			data.message = data?.requiredMessage || "";
		}

		data.rules.map((v) => {
			if (status !== "rej" && value && v.rule) {
				if (v.rule instanceof RegExp && !v.rule.test(value)) {
					status = "rej";
					data.message = v?.message || "";
				}

				if (typeof v.rule === "function" && !v.rule(value)) {
					status = "rej";
					data.message = v?.message || "";
				}
			}
		});

		// 如果状态或错误提示不一致，则进行更新
		if (last_status !== status || last_message !== data.message)
			this.updateStoreField(name);

		data.status = status;
		return status;
	};

	// 用于集中表单验证
	validateField = () => {
		let flag = true;
		Object.keys(this.validateRule).forEach((name) => {
			const status = this.validateFieldValue(name);
			if (status === "rej") flag = false;
		});
		return flag;
	};

	createValidate(
		name: NameProps,
		updateChange: updateProps
	): validateRuleListProps | null {
		const {rules = [], required = false, message = ""} = updateChange;
		if (rules.length === 0 && !required) return null;

		// 抽离出必填项
		const requiredFlag = required || rules.find((v) => v?.required)?.required;

		// 如果存在必填则更新对应表单
		if (requiredFlag) this.updateStoreField(name);

		return {
			message,
			requiredMessage: message,
			required: requiredFlag || false,
			status: "pen", // 设置为等待状态
			rules: rules.filter((v) => v?.rule), // 过滤掉有required的项
		};
	}
}

