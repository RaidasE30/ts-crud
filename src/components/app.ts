import CarsCollection from '../helpers/cars-collection';
import cars from '../data/cars';
import brands from '../data/brands';
import models from '../data/models';
import Table from './table';
import stringifyProps, { StringifyObjectProps } from '../helpers/stringify-props';
import SelectField, { Option } from './select-field';
import CarJoined from '../types/car-joined';

const ALL_BRANDS_ID = '';
const ALL_BRANDS_TITLE = 'All Cars';

class App {
  private htmlElement: HTMLElement;

  private carsCollection: CarsCollection;

  private brandSelect: SelectField;

  private selectedBrandId: null | string;

  private carTable: Table<StringifyObjectProps<CarJoined>>;

  public constructor(selector: string) {
    const foundElement = document.querySelector<HTMLElement>(selector);

    if (foundElement === null) throw new Error(`Can't find element with selector '${selector}'`);

    this.htmlElement = foundElement;
    this.carsCollection = new CarsCollection({
      cars,
      brands,
      models,
    });

    this.carTable = new Table({
      title: 'All Cars',
      columns: {
        id: 'ID',
        brand: 'Brand',
        model: 'Model',
        price: 'Price',
        year: 'Year',
      },
      rowsData: this.carsCollection.all.map(stringifyProps),
    });

    this.brandSelect = new SelectField({
      options: [
        { title: ALL_BRANDS_TITLE, value: ALL_BRANDS_ID },
        ...brands.map(({ id, title }) => ({ title, value: id })),
      ],
      onChange: this.handleBrandChange,
    });

    this.selectedBrandId = null;

    this.initialize();
  }

  private handleBrandChange = (_event: Event, brandId: string, { title: brandTitle }: Option) => {
    const selectedCars = brandId === ALL_BRANDS_ID
        ? this.carsCollection.all
        : this.carsCollection.getByBrandId(brandId);

    this.carTable.updateProps({
      rowsData: selectedCars.map(stringifyProps),
      title: brandTitle,

    });

    this.selectedBrandId = brandId;

    this.update();
  };

  private update = (): void => {
    const { selectedBrandId, carsCollection } = this;

    if (selectedBrandId === null) {
      this.carTable.updateProps({
        title: 'All Cars',
        rowsData: carsCollection.all.map(stringifyProps),
      });
    } else {
      const brand = brands.find((b) => b.id === selectedBrandId);
      if (brand === undefined) throw new Error('Brand does not exist');

      this.carTable.updateProps({
        title: `${brand.title} Cars`,
        rowsData: carsCollection.getByBrandId(selectedBrandId).map(stringifyProps),
      });
    }
  };

  public initialize = (): void => {
    const container = document.createElement('div');
    container.className = 'container my-5';
    container.append(this.brandSelect.htmlElement, this.carTable.htmlElement);

    this.htmlElement.append(container);
  };
}

export default App;
