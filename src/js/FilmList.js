/* eslint-disable no-param-reassign */
export default class FilmList {
  constructor(list) {
    try {
      this.list = JSON.parse(list);
    } catch (e) {
      console.error('Невалидный список');
    }
    this.propList = ['id', 'title', 'year', 'imdb'];
  }

  static sortList(event) {
    // уходим отсюда, если уже была сортировка
    const colName = event.target.innerText;
    if (colName.includes('\u{2193}')) {
      return;
    }

    // удаляем стрелки везде
    const headerCells = Array.from(document.querySelectorAll('.filmlist__header td'));
    headerCells.forEach((td) => {
      if (td.innerText.includes('\u{2193}')) {
        td.innerText = td.innerText.slice(0, -1);
      }
    });

    // ставим стрелку куда надо
    event.target.innerText += '\u{2193}';

    // собираем фильмы из таблички
    const filmsToSort = Array.from(document.querySelectorAll('.filmlist__filminfo'));
    // сортируем
    if (Number.isNaN(+filmsToSort[0].dataset[colName])) {
      filmsToSort.sort((a, b) => a.dataset[colName].localeCompare(b.dataset[colName]));
    } else {
      filmsToSort.sort((a, b) => a.dataset[colName] - b.dataset[colName]);
    }

    // очищаем список
    Array.from(document.querySelectorAll('.filmlist__filminfo')).forEach((item) => item.remove());

    // набиваем новым отсортированным списком
    const table = document.querySelector('.filmlist');
    filmsToSort.forEach((item) => table.appendChild(item));
  }

  fillTable() {
    if (this.list === undefined) {
      console.error('Отсутствует список фильмов');
      return;
    }

    // создание таблицы
    const table = document.createElement('table');
    table.classList.add('filmlist');
    // вставляем ее в конец боди
    document.getElementsByTagName('body')[0].appendChild(table);
    // шапка для таблицы
    const tableHeader = document.createElement('tr');
    tableHeader.classList.add('filmlist__header');
    table.appendChild(tableHeader);
    this.propList.forEach((prop) => {
      const propCell = document.createElement('td');
      propCell.innerText = prop;
      tableHeader.appendChild(propCell);
      propCell.addEventListener('click', FilmList.sortList);
    });

    // пробежка по списку фильмов
    this.list.forEach((film) => {
      const filmInfo = document.createElement('tr');
      filmInfo.classList.add('filmlist__filminfo');
      table.appendChild(filmInfo);
      this.propList.forEach((prop) => {
        const infoCell = document.createElement('td');
        let filmProp = 'n/a';
        if (prop in film) {
          filmProp = film[prop];
          if (prop === 'year') {
            filmProp = `(${filmProp})`;
          }
          if (prop === 'imdb') {
            filmProp = `imdb: ${filmProp.toFixed(2)}`;
          }
          infoCell.innerText = filmProp;
          filmInfo.appendChild(infoCell);
          filmInfo.dataset[prop] = film[prop];
        } else {
          infoCell.innerText = filmProp;
          filmInfo.appendChild(infoCell);
        }
      });
    });
  }
}
