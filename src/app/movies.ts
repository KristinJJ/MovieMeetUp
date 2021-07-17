/*export class Movies {
    id!: string;
    resultType!: string;
    image!: string;
    title!: string;
    description!: string;
}*/


export interface Movies {
    searchType: string;
    expression: string;
    results?: (MovieItem)[] | null;
    errorMessage: string;
}

export interface MovieItem {
    id: string;
    resultType: string;
    image: string;
    title: string;
    description: string;
}

export const movielist = [
    
]