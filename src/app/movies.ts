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
    {
        id: "tt0076759",
        resultType: "Title",
        image: "https://imdb-api.com/images/original/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_Ratio0.7273_AL_.jpg",
        title: "Star Wars: Episode IV - A New Hope",
        description: "(1977)"
        },
        {
        id: "tt2527338",
        resultType: "Title",
        image: "https://imdb-api.com/images/original/MV5BMDljNTQ5ODItZmQwMy00M2ExLTljOTQtZTVjNGE2NTg0NGIxXkEyXkFqcGdeQXVyODkzNTgxMDg@._V1_Ratio0.7273_AL_.jpg",
        title: "Star Wars: Episode IX - The Rise of Skywalker",
        description: "(2019)"
        },
        {
        id: "tt0120915",
        resultType: "Title",
        image: "https://imdb-api.com/images/original/MV5BYTRhNjcwNWQtMGJmMi00NmQyLWE2YzItODVmMTdjNWI0ZDA2XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_Ratio0.7273_AL_.jpg",
        title: "Star Wars: Episode I - The Phantom Menace",
        description: "(1999)"
        },
        {
        id: "tt3778644",
        resultType: "Title",
        image: "https://imdb-api.com/images/original/MV5BOTM2NTI3NTc3Nl5BMl5BanBnXkFtZTgwNzM1OTQyNTM@._V1_Ratio0.7273_AL_.jpg",
        title: "Solo: A Star Wars Story",
        description: "(2018)"
        },
        {
        id: "tt3748528",
        resultType: "Title",
        image: "https://imdb-api.com/images/original/MV5BMjEwMzMxODIzOV5BMl5BanBnXkFtZTgwNzg3OTAzMDI@._V1_Ratio0.7273_AL_.jpg",
        title: "Rogue One: A Star Wars Story",
        description: "(2016)"
        }
]
