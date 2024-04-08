import { ConfigWayProps, DataProps, FormInstance, NameProps, ReducerAction } from "./interface";

export class FormManager {
	private store: DataProps = {};
	private readonly initialValues: DataProps = {};
	private update_store: DataProps = {};
	private configWays: ConfigWayProps = {}; // 收录对应的方法集合

	constructor(initialValues: DataProps) {
		this.store = initialValues;
		this.initialValues = initialValues;
		this.update_store = {};
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
	}

	unRegisterField = (name: NameProps) => {
		delete this.update_store[name];
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

	// 执行从业务层传递进来的方法
	submit = () => {
		const {onFinish} = this.configWays;

		if (!onFinish) return

		onFinish(this.store);
	};

	updateStoreField = (name: NameProps) => {
		const update = this.update_store[name];
		if (update) update?.updateValue();
	};

}

