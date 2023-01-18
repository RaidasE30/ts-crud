type Option = {
    title: string,
    value: string,
};

export type SelectFieldProps = {
    labelText: string,
    options: Option[],
    onChange: (event: Event, value: string, option: Option) => void
};

class SelectField {
    public htmlElement: HTMLSelectElement;

    private options: SelectFieldProps['options'];

    private readonly onChange: SelectFieldProps['onChange'];

    public constructor({ options, onChange }: SelectFieldProps) {
        this.htmlElement = document.createElement('select');
        this.options = options;
        this.onChange = onChange;

        this.initialize();
    }

    private initialize() {
        const optionsStr = this.options
            .map(({ title, value }) => `<option value="${value}">${title}</option>`)
            .join('');
        this.htmlElement.addEventListener('change', (event) => {
            const { value } = this.htmlElement;
            const [option] = this.options.filter((opt) => opt.value === value);
            this.onChange(event, value, option);
        });
        this.htmlElement.className = 'form-select';
        this.htmlElement.innerHTML = optionsStr;
    }
}

export default SelectField;
