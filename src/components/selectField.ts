type Option = {
    title: string,
    value: string,
};

export type SelectFieldProps = {
    labelText: string,
    options: Option[],
};

class SelectField {
    public htmlElement: HTMLElement;

    private options: SelectFieldProps['options'];

    public constructor({ options }: SelectFieldProps) {
        this.htmlElement = document.createElement('select');
        this.options = options;

        this.initialize();
    }

    private initialize() {
        const optionsStr = this.options
            .map(({ title, value }) => `<option value="${value}">${title}</option>`)
            .join('');

        this.htmlElement.className = 'form-select';
        this.htmlElement.innerHTML = optionsStr;
    }
}

export default SelectField;
