import CarsCollection from '../helpers/cars-collection';
import cars from '../data/cars';
import brands from '../data/brands';
import models from '../data/models';
import Table from './table';
import stringifyProps from '../helpers/stringify-props';
import SelectField from './selectField';

const ALL_BRANDS_ID = '';
const ALL_BRANDS_TITLE = 'All Cars';

class App {
  private htmlElement: HTMLElement;

  private carsCollection: CarsCollection;

  public constructor(selector: string) {
    const foundElement = document.querySelector<HTMLElement>(selector);

    if (foundElement === null) throw new Error(`Can't find element with selector '${selector}'`);

    this.htmlElement = foundElement;
    this.carsCollection = new CarsCollection({
      cars,
      brands,
      models,
    });
  }

  public initialize = (): void => {
    const container = document.createElement('div');
    container.className = 'container my-5';
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

    const selectField = new SelectField({
      options: [
        { title: ALL_BRANDS_TITLE, value: ALL_BRANDS_ID },
        ...brands.map(({ id, title }) => ({ title, value: id })),
      ],
      onChange: (_, brandId, { title: brandTitle }) => {
        const selectedCars = brandId === ALL_BRANDS_ID
            ? this.carsCollection.all
            : this.carsCollection.getByBrandId(brandId);

        carTable.updateProps({
          rowsData: selectedCars.map(stringifyProps),
          title: brandTitle,
        });
      },
    });

    container.append(selectField.htmlElement, carTable.htmlElement);

    this.htmlElement.append(container);
  };
}

export default App;
