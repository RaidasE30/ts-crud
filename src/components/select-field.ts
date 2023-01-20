export type Option = {
    title: string,
    value: string,
};

export type SelectFieldProps = {
    titleText?: string
    options: Option[],
    onChange?: (event: Event, value: string, option: Option) => void
    name?: string,
    selectedValue?: string
};

class SelectField {
    private static counter = 0;

    public htmlElement: HTMLSelectElement;

    private options: SelectFieldProps['options'];

    private readonly onChange: SelectFieldProps['onChange'];

    private readonly id: string;

    public constructor({
                           options,
                           onChange,
                           name,
                           selectedValue,
                       }: SelectFieldProps) {
        this.htmlElement = document.createElement('select');
        this.options = options;
        this.onChange = onChange;
        this.id = `select-field-${SelectField.counter += 1}`;
        this.htmlElement.id = this.id;

        if (name) {
            this.htmlElement.name = name;
        }

        this.initialize(selectedValue);
    }

    private initialize(selectedValue?: string) {
        this.renderView(selectedValue);

        if (this.onChange) {
            this.htmlElement.addEventListener('change', (event) => {
                const { value } = this.htmlElement;
                const [option] = this.options.filter((opt) => opt.value === value);
                if (this.onChange) {
                    this.onChange(event, value, option);
                }
            });
        }
    }

    private renderView(selectedValue?: string) {
        const optionsStr = this.options
            .map(({ title, value: optionValue }) => {
                let option = `<option value="${optionValue}">${title}</option>`;
                if (selectedValue === optionValue) {
                    option = `<option value="${selectedValue}" selected>${title}</option>`;
                }
                return option;
            })
            .join('');

        this.htmlElement.className = 'form-select';
        this.htmlElement.innerHTML = optionsStr;
    }

    public updateProps({ options, selectedValue }: SelectFieldProps) {
        this.options = options;
        this.renderView(selectedValue);
    }
}

export default SelectField;
