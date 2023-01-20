import type Car from '../types/car';
import type Model from '../types/model';
import type Brand from '../types/brand';
import CarJoined from '../types/car-joined';

export type CarProps = {
    brandId: string,
    modelId: string,
    price: number,
    year: number
};

type CarsCollectionProps = {
    cars: Car[],
    models: Model[],
    brands: Brand[],
};

const generateId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = '';
    const sections = [8, 4, 4, 4, 12];

    for (let i = 0; i < sections.length; i += 1) {
        for (let j = 0; j < sections[i]; j += 1) {
            id += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        if (i < sections.length - 1) {
            id += '-';
        }
    }
    return id;
};

class CarsCollection {
    private readonly props: CarsCollectionProps;

    constructor(props: CarsCollectionProps) {
        this.props = props;
    }

    public get all(): CarJoined[] {
        return this.props.cars.map(this.joinCar);
    }

    private joinCar = ({ modelId, ...car }: Car) => {
        const { brands, models } = this.props;
        const [carModel] = models.filter((model) => model.id === modelId);
        const [carBrand] = brands.filter((brand) => carModel.brandId === brand.id);

        return {
            ...car,
            brand: carBrand.title,
            model: carModel.title,
        };
    };

    public getByBrandId = (brandId: string): CarJoined[] => {
        const { cars, models } = this.props;

        const brandModelsIds = models
            .filter((model) => model.brandId === brandId)
            .map((model) => model.id);

        return cars
            .filter((car) => brandModelsIds.includes(car.modelId))
            .map(this.joinCar);
    };

    public deleteCarById = (carId: string): void => {
        this.props.cars = this.props.cars.filter((car) => car.id !== carId);
    };

    public add = ({ modelId, brandId, ...carProps }: CarProps): void => {
        const { models, brands, cars } = this.props;
        const model = models.find((m) => m.id === modelId);
        const brand = brands.find((b) => b.id === brandId);

        if (!model || !brand) {
            throw new Error('Wrong data to create car');
        }

        const newCar: Car = {
            id: generateId(),
            ...carProps,
            modelId,
        };

        cars.push(newCar);
    };
}

export default CarsCollection;
