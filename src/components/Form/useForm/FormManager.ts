import { DataProps, FormInstance, NameProps, ReducerAction } from "./interface";

export class FormManager {
	private store: DataProps = {};
	private initialValues: DataProps = {};

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

	registerField() {

	}

	unRegisterField() {

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
	};

	getFieldValidate() {

	}

	submit() {

	}

	setConfigWays() {

	}
}

