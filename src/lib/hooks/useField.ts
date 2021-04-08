import * as React from "react";
import { Form } from 'antd';
import { WrappedFormUtils, GetFieldDecoratorOptions, FormComponentProps } from "antd/lib/form/Form";
import { useGenericState } from "./useGenericState";

export interface FieldProps<T> {
  key: string;
  value?: any;
  disabled?: boolean;
  visible?: boolean;
  label?: string;
  placeholder?: string;
  formOptions?: GetFieldDecoratorOptions;
  extraData?: T;
};

export interface FieldModel<T> {
  key: string;
  disabled?: boolean;
  visible?: boolean;
  label?: string;
  placeholder?: string;
  decorator: (child: React.ReactElement) => React.ReactNode;
  value?: any;
  setValue: (val: any) => void;
  reset: () => void,
  enable: () => void,
  disable: () => void,
  show: () => void,
  hide: () => void,
  setKey: (val: string) => void,
  setLabel: (val: string) => void,
	setFormOptions: (formOptions: string) => void,
	setRequired: (isRequired: boolean) => void,
  setPlaceholder: (val: string) => void,
  formOptions?: GetFieldDecoratorOptions;
  extraData?: T;
  isRequired: boolean;
  fieldType: string;
};

export type useFieldProps<T> = FieldProps<T> & FormComponentProps;

const useField = <T>({
  form,
  key,
  value,
  disabled = false,
  visible = true,
  label,
  placeholder,
  formOptions,
  extraData,
}: useFieldProps<T>
  ): FieldModel<T> & { setValue: (val: Object) => void; } => {
  const [state, setState] = useGenericState({
    key,
    value,
    formOptions,
    disabled,
    visible,
    label,
    placeholder,
  });

  React.useEffect(() => {
    reset();
  }, [state.formOptions]);

  React.useEffect(() => {
    setValueInForm(state.value);
  }, [state.visible]);

  React.useEffect(() => {
    const valueInForm = form?.getFieldValue(key)
    if(value !== valueInForm) {
      if(valueInForm === "") {
        setValueHandler(undefined);
      } else {
        setState({ value: form?.getFieldValue(key) });
      }
    }
  }, [form?.getFieldValue(key)]);

  const decorator = (child: React.ReactElement): React.ReactNode => {
    return React.createElement(Form.Item, child.props, form?.getFieldDecorator(
      state.key,
      state.formOptions,
    )(
      React.cloneElement(child, {
        ...child.props,
        placeholder: state.placeholder,
        disabled: state.disabled,
        visible: state.visible,
        onChange: (e) => setState({ value: e?.target?.value || e }),
      })
    ));
  };

  const setValueInForm = async (value) => {
    form?.setFieldsValue({
      [key]: value,
    });
  };

  const setValueHandler = async (value) => {
    setValueInForm(value);
    setState({ value });
  };

  const enable = () => setState({ disabled: false });
  const disable = () => setState({ disabled: true });
  const show = () => setState({ visible: true });
  const hide = () => setState({ visible: false });
  const setKey = (key) => setState({ key });
	const setFormOptions = (formOptions) => setState({ formOptions });
  const setLabel = (label) => setState({ label });
  const setPlaceholder = (placeholder) => setState({ placeholder });
  const reset = () => setState(state.formOptions?.initialValue);
	const setRequired = (isRequired: boolean) => {
		const formOptions = state.formOptions;
		setState({
			formOptions: {
				...formOptions,
				rules: [{ ...formOptions?.rules?.[0], required: isRequired }], // TODO: cant handle rules array with more than one element as of now
			}
		});
	}
  const isRequired = !!state.formOptions?.rules?.some((rule) => rule.required);
  const fieldType = 'field';

  return {
    key,
    disabled: state.disabled,
    visible: state.visible,
    label: state.label,
    placeholder: state.placeholder,
    value: state.value,
    setValue: setValueHandler,
    reset,
    setKey,
    setLabel,
    setFormOptions,
		setPlaceholder,
		setRequired,
    decorator,
    enable,
    disable,
    show,
    hide,
    formOptions,
    extraData,
    isRequired,
    fieldType,
  };
};

export default useField;
