import CarsCollection from '../helpers/cars-collection';
import cars from '../data/cars';
import brands from '../data/brands';
import models from '../data/models';
import Table from './table';
import stringifyProps from '../helpers/stringify-props';
import SelectField from './selectField';

class App {
  private htmlElement: HTMLElement;

  private carsCollection: CarsCollection;

  private brandSelect: SelectField;

  public constructor(selector: string) {
    const foundElement = document.querySelector<HTMLElement>(selector);

    if (foundElement === null) throw new Error(`Can't find element with selector '${selector}'`);

    this.htmlElement = foundElement;
    this.carsCollection = new CarsCollection({
      cars,
      brands,
      models,
    });

    this.brandSelect = new SelectField({
      labelText: 'Brand',
      options: brands.map(({ id, title }) => ({ title, value: id })),
      onChange: (_, brandId) => {
        const newcars = this.carsCollection.getByBrandId(brandId);
        console.log(newcars);
      },
    });
  }

  public initialize = (): void => {
    const carTable = new Table({
      title: 'All Cars',
      columns: {
        id: 'ID',
        brand: 'Make',
        model: 'Model',
        price: 'Price',
        year: 'Year',
      },
      rowsData: this.carsCollection.all.map(stringifyProps),
    });

    const container = document.createElement('div');
    container.className = 'container my-5';
    container.append(this.brandSelect.htmlElement, carTable.htmlElement);

    this.htmlElement.append(container);
  };
}

export default App;
