import FilmList from './FilmList';

const filmlistLikeJSON = `[
  {
    "id": 26,
    "title": "Побег из Шоушенка",
    "imdb": 9.30,
    "year": 1994
  },
  {
    "id": 25,
    "title": "Крёстный отец",
    "imdb": 9.20,
    "year": 1972
  },
  {
    "id": 27,
    "title": "Крёстный отец 2",
    "imdb": 9.00,
    "year": 1974
  },
  {
    "id": 1047,
    "title": "Тёмный рыцарь",
    "imdb": 9.00,
    "year": 2008
  },
  {
    "id": 223,
    "title": "Криминальное чтиво",
    "imdb": 8.90,
    "year": 1994
  }
]`;

document.addEventListener('DOMContentLoaded', () => {
  const filmList = new FilmList(filmlistLikeJSON);
  // console.log(filmList.list.length);
  // console.log(filmList.propList.length);
  const fillTable = filmList.fillTable.bind(filmList);
  fillTable();
});

  const filmList = new FilmList(`[
    {
      "id": 4,
      "title": "Лупа и Пупа",
      "imdb": 9.30,
      "year": 2000
    },
    {
      "id": 1,
      "title": "Буба и Биба",
      "imdb": 9.20,
      "year": 1950
    },
    {
      "id": 10,
      "title": "Шлепа и Флоппа",
      "imdb": 10.00,
      "year": 2010
    },
    ]`);
    console.log(filmList)