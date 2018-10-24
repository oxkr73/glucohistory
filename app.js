const argv = require('./config/yargs').argv;

let commando = argv._[0];

switch (commando) {
    case 'crear':
        console.log('Creación de tarea realizada');
        break;
    case 'actualizar':
        console.log('Actualizar tarea realizada');
        break;
    default:
        console.log('Comando desconocido');
        break;
}