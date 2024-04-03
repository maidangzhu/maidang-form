import { DataProps, FormInstance } from "./interface";

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

	dispatch() {

	}

	registerField() {

	}

	unRegisterField() {

	}

	public resetFields() {

	}

	getFieldValue() {

	}

	getFieldValidate() {

	}

	submit() {

	}

	setConfigWays() {

	}
}
