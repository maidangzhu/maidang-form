import Layout from "./Layout.tsx";
import React, { useContext } from 'react'
import { useUpdate } from "../../Hooks";
import FormContext from "./useForm/FormContext.ts";

interface IFormItemProps {
	name: string;
	title: string;
	children: React.ReactNode;
}

const FormItem: React.FC<IFormItemProps> = (props) => {
	const {title, name, children} = props
	const formContextValue = useContext(FormContext)
	const {getFieldValue, dispatch, registerField, unRegisterField} = formContextValue;

	const update = useUpdate();

	let childrenWithProps = children

	if (!React.isValidElement(children)) {
		console.error('FormItem children must be a valid React element')
		return <Layout {...props}>{childrenWithProps}</Layout>;
	}

	childrenWithProps = React.cloneElement(children as React.ReactElement, {
		value: getFieldValue(name),
		onChange: (e: any) => {
			const payload: any = {};
			payload[name] = e.target.value;

			dispatch({
				type: "updateValue",
				name,
				value: e.target?.value,
			});

			update();
		}
	})

	return (
		<Layout {...props}>
			{childrenWithProps}
		</Layout>
	)
}

export default FormItem
