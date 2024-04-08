import { cloneElement, isValidElement, useEffect, useContext } from "react";
import Layout from "./Layout.tsx";
import FormContext from "./useForm/FormContext";
import { updateProps, validateRuleProps } from "./useForm/interface.d";
import { useCreation, useUpdate } from "../../hooks";

interface FormItemProps {
	label?: string;
	tooltip?: string;
	message?: string;
	rules?: validateRuleProps[];
	required?: boolean;
	name?: string;
	children: React.ReactNode;
}

const FormItem: React.FC<FormItemProps> = (props) => {
	const {name = '', children, label, required, message, rules} = props;
	const update = useUpdate();

	const contextValue = useContext(FormContext);
	const {
		getFieldValue,
		dispatch,
		registerField,
		unRegisterField,
		getFieldValidate,
	} = contextValue;

	const updateChange: updateProps = useCreation(() => {
		return {
			message: message || `请填写${label}字段`,
			required,
			rules,
			updateValue: () => update(),
		};
	}, [contextValue, name]);

	useEffect(() => {
		name && registerField(name, updateChange);
		return () => {
			name && unRegisterField(name);
		};
	}, [name, registerField, unRegisterField, updateChange]);

	let childrenWIthProps;

	if (isValidElement(children) && name) {
		childrenWIthProps = cloneElement(children as React.ReactElement, {
			value: getFieldValue(name),
			onChange: (v: unknown) => {
				const value = v?.target?.localName === "input" ? v?.target?.value : v;

				dispatch({
					type: "updateValue",
					name,
					value,
				});

				dispatch({
					type: "validateField",
					name,
				});
			},
			status: getFieldValidate(name)?.status === "rej" ? "error" : undefined,
		});
	} else {
		childrenWIthProps = children;
	}

	return (
		<Layout {...props} {...getFieldValidate(name)}>
			{childrenWIthProps}
		</Layout>
	);
};

export default FormItem;
