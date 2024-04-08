import { forwardRef, useImperativeHandle } from "react";
import FormContext from "./useForm/FormContext";
import { DataProps, FormInstance } from "./useForm/interface.d";
import useForm from "./useForm";

interface FormProps {
	onReset?: () => void;
	onFinish?: (data: unknown) => void;
	onFinishFailed?: (errorInfo: unknown) => void;
	initialValues?: DataProps;
	form?: FormInstance;
	children: React.ReactNode;
}

const Form = forwardRef((props: FormProps, ref) => {
	const {
		form,
		children,
		onFinish = () => {},
		onReset = () => {},
		onFinishFailed = () => {},
		initialValues = {},
		...payload
	} = props;

	// 获取 FormManager 实例
	const [formRef] = useForm(initialValues, form);

	const {
		registerField, // eslint-disable-line
		unRegisterField, // eslint-disable-line
		dispatch, // eslint-disable-line
		setConfigWays, // eslint-disable-line
		...formRefInstance
	} = formRef!;

	useImperativeHandle(ref, () => formRefInstance, [formRefInstance]);

	// 设置 FormManager 实例的方法
	formRef?.setConfigWays({
		onFinish,
		onReset,
		onFinishFailed,
	});

	return (
		<form
			{...payload}
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				formRef?.submit();
			}}
			onReset={(e) => {
				e.preventDefault();
				e.stopPropagation();
				formRef?.resetFields();
			}}
		>
			<FormContext.Provider value={formRef!}>{children}</FormContext.Provider>
		</form>
	);
});

export default Form;
