import Layout from "./Layout.tsx";
import React, { useContext, useEffect } from 'react'
import { useUpdate } from "../../Hooks";
import FormContext from "./useForm/FormContext";
import useCreation from "../../Hooks/useCreation.ts";

interface IFormItemProps {
	name: string;
	label: string;
	children: React.ReactNode;
}

const FormItem: React.FC<IFormItemProps> = (props) => {
	const {label, name, children} = props
	const formContextValue = useContext(FormContext)
	const {getFieldValue, dispatch, registerField, unRegisterField} = formContextValue;

	const update = useUpdate();

	let childrenWithProps = children

	const updateChange = useCreation(() => {
		return {
			updateValue: () => update(),
		};
	}, [])

	useEffect(() => {
		name && registerField(name, updateChange);
		return () => {
			name && unRegisterField(name);
		};
	}, [name, registerField, unRegisterField, updateChange]);

	if (!React.isValidElement(children)) {
		console.error('FormItem children must be a valid React element')
		return <Layout {...props}>{childrenWithProps}</Layout>;
	}

	childrenWithProps = React.cloneElement(children as React.ReactElement, {
		value: getFieldValue(name),
		// eslint-disable-next-line
		onChange: (e: any) => {
			// const payload: any = {};
			// payload[name] = e.target.value;

			dispatch({
				type: "updateValue",
				name,
				value: e?.target?.value,
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
