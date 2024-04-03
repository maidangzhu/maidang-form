import { createContext } from "react";
import { FormInstance } from "./interface.d";

const noop: any = () => {};

const FormContext = createContext<FormInstance>({
	registerField: noop,
	unRegisterField: noop,
	resetFields: noop,
	getFieldValue: noop,
	dispatch: noop,
	setConfigWays: noop,
	submit: noop,
	getFieldValidate: noop,
});

export default FormContext;
