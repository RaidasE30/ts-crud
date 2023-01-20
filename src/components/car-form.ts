import TextField from './text-field';
import SelectField from './select-field';

type Values = {
    brand: string,
    model: string,
    price: string,
    year: string,
};

type CarFormProps = {
    values: Values,
    title: string,
    submitBtnText: string,
    onSubmit: (values: Values) => void,
};

class CarForm {
    public htmlElement: HTMLFormElement;

    private readonly formTitleHtmlElement: HTMLHeadingElement;

    private readonly submitButton: HTMLButtonElement;

    private brandSelectField: SelectField;

    private modelSelectField: SelectField;

    private priceTextField: TextField;

    private yearTextField: TextField;

    private props: CarFormProps;

    constructor(props: CarFormProps) {
        this.props = props;
        this.htmlElement = document.createElement('form');
        this.formTitleHtmlElement = document.createElement('h2');
        this.submitButton = document.createElement('button');
        this.brandSelectField = new SelectField({
            titleText: 'Brand',
            name: 'brand',
            options: [
                { title: 'Opel', value: '1' },
                { title: 'BMW', value: '2' },
                { title: 'Subaru', value: '3' },
            ],
        });
        this.modelSelectField = new SelectField({
            titleText: 'Model',
            name: 'model',
            options: [
                { title: 'a', value: '1' },
                { title: 'Astra', value: '2' },
                { title: 'Insignia', value: '3' },
                { title: 'X1', value: '4' },
                { title: 'X2', value: '5' },
                { title: 'X3', value: '6' },
                { title: 'Impreza', value: '7' },
                { title: 'Forester', value: '8' },
                { title: 'Ascent', value: '9' },
            ],
        });
        this.priceTextField = new TextField({
            labelText: 'Price',
            name: 'price',
        });
        this.yearTextField = new TextField({
            labelText: 'Year',
            name: 'year',
        });
        this.initialize();
        this.renderView();
    }

    private handleSubmit = (event: SubmitEvent) => {
        event.preventDefault();

        const formData = new FormData(this.htmlElement);

        const brand = formData.get('brand') as string | null;
        const model = formData.get('model') as string | null;
        const price = formData.get('price') as string | null;
        const year = formData.get('year') as string | null;

        if (!(brand && price && model && year)) {
            throw new Error('Wrong data in form');
        }

        const formValues: Values = {
            brand,
            model,
            price,
            year,
        };

        this.props.onSubmit(formValues);
    };

    private initialize = () => {
        this.formTitleHtmlElement.className = 'h3 text-center';
        this.formTitleHtmlElement.innerText = 'Add New Car';
        this.submitButton.className = 'btn btn-primary';
        this.submitButton.innerText = 'Add';
        this.submitButton.setAttribute('type', 'submit');
        this.htmlElement.className = 'card d-flex flex-column gap-3 p-3';
        this.htmlElement.style.width = '450px';
        this.htmlElement.append(
            this.formTitleHtmlElement,
            this.brandSelectField.htmlElement,
            this.modelSelectField.htmlElement,
            this.priceTextField.htmlElement,
            this.yearTextField.htmlElement,
            this.submitButton,
        );
        this.htmlElement.addEventListener('submit', this.handleSubmit);
    };

    private renderView = () => {
        this.formTitleHtmlElement.innerText = this.props.title;
        this.submitButton.innerText = this.props.submitBtnText;
    };

    public updateProps = (newProps: Partial<CarFormProps>) => {
        this.props = {
            ...this.props,
            ...newProps,
        };

        this.renderView();
    };
}

export default CarForm;
