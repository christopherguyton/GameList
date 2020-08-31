//Game Construtor

function Game(title, publisher, system, genre) {
    this.title = title,
        this.publisher = publisher,
        this.system = system,
        this.genre = genre
}


//UI Constructor

function UI() {

    UI.prototype.addGameToList = function (game) {
        const list = document.getElementById('game-list');
        //Create Game Element (tr)

        const row = document.createElement('tr');
        //insert cols
        row.innerHTML = `
    <td>${game.title}</td>
    <td>${game.publisher}</td>
    <td>${game.system}</td>
    <td>${game.genre}</td>
    <td><a href="#" class="delete">X</td>
    `;

        list.appendChild(row);
    }

    //Show Alert
    UI.prototype.showAlert = function (message, className) {
        //Create Div
        const div = document.createElement('div');

        //Add Classes
        div.className = `alert ${className}`;
        //add TExt
        div.appendChild(document.createTextNode(message));
        //Get Parent
        const container = document.querySelector('.container');
        const form = document.querySelector('#game-form')

        container.insertBefore(div, form);

        // Timeout
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    //Delete Game Prototype 

    UI.prototype.deleteGame = function (target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }

    }


    ///Clear Fields

    UI.prototype.clearGameFields = function () {
        document.getElementById('title').value = '';
        document.getElementById('publisher').value = '';
        document.getElementById('system').value = '';
        document.getElementById('genre').value = '';

    }

}

//Event Listeners
//Add Game
document.getElementById('game-form').addEventListener('submit', function (e) {
    //Get Form Values
    const title = document.querySelector('#title').value;
    const publisher = document.querySelector('#publisher').value;
    const system = document.querySelector('#system').value;
    const genre = document.querySelector('#genre').value;

    //Instantiate Game

    const game = new Game(title, publisher, system, genre);

    //Instantiate UI 
    const ui = new UI();

    //validate
    if (title === '' || publisher === '' || system === '' || genre === '') {
        ui.showAlert('Please fill in all fields', 'error');
    } else {

        //add game to list
        ui.addGameToList(game);

        ui.showAlert('Game Added!', 'success');

        // Clear Fields
        ui.clearGameFields();

    }


    e.preventDefault();
});

//Delete Game

document.getElementById('game-list').addEventListener('click', function (e) {

    const ui = new UI();
    ui.deleteGame(e.target);

    ui.showAlert('Game Removed!', 'success');

    e.preventDefault();
})