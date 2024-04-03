import { useEffect, useRef } from "react";
import { DataProps, FormInstance, Nullable } from "./interface";
import { FormManager } from "./FormManager.ts";

const useForm = (initialValues: DataProps, formInstance?: FormInstance) => {
	const formRef = useRef<Nullable<FormInstance>>(null);

	if (!formRef.current) {
		if (formInstance) {
			formRef.current = formInstance;
		} else {
			formRef.current = new FormManager(initialValues).getDetail();
		}
	}
	// useEffect(() => {
	//
	// }, [formInstance, initialValues])

	return [formRef.current]
}

export default useForm;
