type TextFieldProps = {
    labelText: string,
    name: string,
    initValue?: string,
};

class TextField {
    private static count = 0;

    private static get id() {
        return `${this.name}-${this.count}`;
    }

    private props: TextFieldProps;

    htmlElement: HTMLDivElement;

    private readonly htmlLabelElement: HTMLLabelElement;

    private readonly htmlInputElement: HTMLInputElement;

    public constructor(props: TextFieldProps) {
        this.props = props;
        TextField.count += 1;
        this.htmlElement = document.createElement('div');
        this.htmlLabelElement = document.createElement('label');
        this.htmlInputElement = document.createElement('input');
        this.initialize();
        this.renderView();
    }

    private initialize = (): void => {
        const inputId = `input-${TextField.id}`;

        this.htmlLabelElement.setAttribute('for', inputId);
        this.htmlLabelElement.className = 'form-label';

        this.htmlInputElement.id = inputId;
        this.htmlInputElement.className = 'form-control';
        this.htmlInputElement.type = 'text';

        this.htmlElement.append(
            this.htmlLabelElement,
            this.htmlInputElement,
        );
    };

    private renderView = (): void => {
        const { name, labelText, initValue } = this.props;
        this.htmlLabelElement.innerHTML = labelText;
        this.htmlInputElement.name = name;
        if (initValue) {
            this.htmlInputElement.value = initValue;
        }
    };

    public updateProps = (newProps: Partial<TextFieldProps>) => {
        this.props = {
            ...this.props,
            ...newProps,
        };

        this.renderView();
    };
}

export default TextField;
