export interface IBrew{
    id: number;
    description: string;
    image_url: string;
    name: string;
}

export interface ISingleBeer extends IBrew{
    tagline: string;
    abv: string;
    food_pairing: string;
}