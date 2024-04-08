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
	validateQueue: unknown[] = []; // 校验队列

	constructor(initialValues: DataProps) {
		this.store = initialValues;
		this.initialValues = initialValues;
		this.update_store = {};
		this.validateRule = {};
		this.validateQueue = [];
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
		switch (action.type) {
			case "updateValue": {
				const {name, value} = action;
				this.updateValue(name, value);
				break;
			}
			case "validateField": {
				const {name} = action;
				this.validateFieldValue(name); // 触发单个更新
				break;
			}
			default:
		}
	};

	registerField = (name: NameProps, updateChange: DataProps) => {
		this.update_store[name] = updateChange;
		this.validateRule[name] = this.createValidate(name, updateChange);
	}

	unRegisterField = (name: NameProps) => {
		delete this.update_store[name];
		delete this.validateRule[name];
	}

	// 重置表单
	resetFields = (cb?: () => void) => {
		const {onReset} = this.configWays;
		Object.keys(this.store).forEach((key) => {
			// 重置表单的时候，如果有初始值，就用初始值，没有就删除
			this.initialValues[key]
				? (this.store[key] = this.initialValues[key])
				: delete this.store[key];
			this.updateStoreField(key);
		});

		Object.keys(this.validateRule).forEach((key) => {
			const data = this.validateRule[key];
			if (data) {
				if (data.status === "rej") this.updateStoreField(key);
				data.status = "pen";
			}
		});
		cb && cb();
		onReset && onReset();
	};

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

	getFieldValidate = (name: NameProps) => {
		console.log("=>(FormManager.ts:105) this.validateRule[name]", this.validateRule[name]);
		return this.validateRule[name];
	};

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

	createValidate(name: NameProps, updateChange: updateProps):
		validateRuleListProps | null {
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
			status: "pen", // 默认 pending
			rules: rules.filter((v) => v?.rule), // 过滤掉有required的项
		};
	}

	// 异步校验队列
	promiseValidate = () => {
		if (this.validateQueue.length === 0) return null;
		Promise.resolve().then(() => {
			do {
				const validateUpdate = this.validateQueue.shift();
				validateUpdate && validateUpdate(); /* 触发更新 */
			} while (this.validateQueue.length > 0);
		});
	};
}

