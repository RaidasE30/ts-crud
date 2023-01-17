import CarsCollection from '../helpers/cars-collection';
import cars from '../data/cars';
import brands from '../data/brands';
import models from '../data/models';
import Table from './table';
import stringifyProps from '../helpers/stringify-props';

class App {
  private htmlElement: HTMLElement;

  private carsCollection: CarsCollection;

  public constructor(selector: string) {
    const foundElement = document.querySelector<HTMLElement>(selector);

    if (foundElement === null) throw new Error(`Nerastas elementas su selektoriumi '${selector}'`);

    this.htmlElement = foundElement;
    this.carsCollection = new CarsCollection({
      cars,
      brands,
      models,
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
    container.appendChild(carTable.htmlElement);

    this.htmlElement.append(container);
  };
}

export default App;
