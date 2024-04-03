import { DataProps, FormInstance, NameProps, ReducerAction } from "./interface";

export class FormManager {
	private store: DataProps = {};
	private readonly initialValues: DataProps = {};
	private update_store: DataProps = {};

	constructor(initialValues: DataProps) {
		this.store = initialValues;
		this.initialValues = initialValues;
	}

	getDetail(): FormInstance {
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

	dispatch(action: ReducerAction) {
		const {type, name, value} = action;
		switch (type) {
			case "updateValue": {
				this.updateValue(name, value);
				break;
			}
			default:
		}
	}

	registerField(name: NameProps, updateChange: DataProps) {
		this.update_store[name] = updateChange;
	}

	unRegisterField(name: NameProps) {
		delete this.update_store[name];
	}

	public resetFields() {
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

	getFieldValidate() {

	}

	submit() {

	}

	setConfigWays() {

	}

	updateStoreField = (name: NameProps) => {
		const update = this.update_store[name];
		if (update) update?.updateValue();
	};

}

