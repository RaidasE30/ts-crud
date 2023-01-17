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

    private joinCar = ({ modelId, ...car }: Car) => {
        const { brands, models } = this.props;
        const carModel = models.filter((model) => model.id === modelId);
        const carBrand = brands.filter((brand) => carModel
            .map((model) => model.brandId).includes(brand.id));

        return {
            ...car,
            brand: (carBrand[0] && carBrand[0].title) ?? 'unknown',
            model: (carModel[0] && carModel[0].title) ?? 'unknown',
        };
    };

    public get all(): CarJoined[] {
        return this.props.cars.map(this.joinCar);
    }
}

export default CarsCollection;
