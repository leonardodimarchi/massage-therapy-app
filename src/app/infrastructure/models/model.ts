export abstract class Model<Entity> {
    abstract toEntity(): Entity;
}

export interface BaseModelProps {
    id: number;
    createdAt: string;
    updatedAt: string;
}