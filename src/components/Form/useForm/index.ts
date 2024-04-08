import { useEffect, useRef } from "react";
import { DataProps, FormInstance, Nullable } from "./interface";
import { FormManager } from "./FormManager.ts";

/**
 * useForm 实际上就是对 FormStore 的一个封装，用于获取对应的方法。
 * 创建一个管理类的示例，然后返回它
 * @param initialValues
 * @param formInstance
 */
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
