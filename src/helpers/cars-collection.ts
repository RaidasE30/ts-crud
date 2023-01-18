import type Car from '../types/car';
import type Model from '../types/model';
import type Brand from '../types/brand';
import CarJoined from '../types/car-joined';

type CarsCollectionProps = {
    cars: Car[],
    models: Model[],
    brands: Brand[],
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
}

export default CarsCollection;
