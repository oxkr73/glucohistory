const argv = require('yargs')
    .command('crear', 'Crea una nueva tarea', {
        descripcion: {
            demand: true,
            alias: 'd'
        }
    })
    .command('actualizar', 'Actualiza el estado de una tarea existente', {
        descripcion: {
            demand: true,
            alias: 'd'
        },
        completado: {
            default: true,
            alias: 'c'
        }
    })
    .help()
    .argv;

module.exports = {
    argv
}