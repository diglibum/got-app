export default class gotService {

    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    getResource = async (url) => {
        const response = await fetch(this._apiBase + url);
        if (!response.ok) {
            throw new Error(`Could not fetch ${url}, received ${response.status}`);
        }

        return await response.json();
    }

    // Characters

    getAllCharacters = async () => {
        const res = await this.getResource('/characters?page=5&pageSize=6');
        return res.map((char) => this._transformCharacter(char));
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(res);
    }

    _transformCharacter = (char) => {
        return {
            name: this._checkValue(char.name),
            gender: this._checkValue(char.gender),
            born: this._checkValue(char.born),
            died: this._checkValue(char.died),
            culture: this._checkValue(char.culture),
            url: this._checkValue(char.url),
            id: this._generateId(char.url)
        }
    }

    // Books


    getAllBooks = async () => {
        const res = await this.getResource('/books?page=1&pageSize=6');
        return res.map((char) => this._transformBook(char));
    }

    getBook = async (id) => {
        const res = await this.getResource(`/books/${id}`);
        return this._transformBook(res);
    }

    _transformBook = (book) => {
        return {
            name: this._checkValue(book.name),
            isbn: this._checkValue(book.isbn),
            numberOfPages: this._checkValue(book.numberOfPages),
            publiser: this._checkValue(book.publiser),
            country: this._checkValue(book.country),
            id: this._generateId(book.url)
        }
    }

    // Houses

    getAllHouses = async () => {
        const res = await this.getResource('/houses?&pageSize=6');
        return res.map((char) => this._transformHouse(char));
    }

    getHouse = async (id) => {
        const res = await this.getResource(`/houses/${id}`);
        return this._transformHouse(res);
    }

    _transformHouse = (house) => {
        return {
            region: this._checkValue(house.region),
            coatOfArms: this._checkValue(house.coatOfArms),
            words: this._checkValue(house.words),
            currentLord: this._checkValue(house.currentLord),
            id: this._generateId(house.url)
        }
    }


    _generateId = (url) => {
        return url.match(/\d+$/gm);
    }
    _checkValue = (val) => {
        return (val) ? val : "—";
    }
}