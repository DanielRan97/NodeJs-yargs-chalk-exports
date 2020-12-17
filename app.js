const chalk = require('chalk');
const yargs = require('yargs')
const note = require('./note');


//customize yargs version

yargs.version('1.1.0');

//add,remove,read,list
//create add command
yargs.command({
    command:'add',
    describe: 'Add new note',
    builder: {
        title: {
            decribe:'Note title',
            demandOption: true,
            type:'string'
        },
        body: {
            decribe:'Note body',
            demandOption: true,
            type:'string'
        }
    },
    handler: function (argv){
       note.addNote(argv.title,argv.body);
    }
})

//create remove command
yargs.command({
    command:'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            decribe:'Note title',
            demandOption: true,
            type:'string'
        },
    },
    handler: function (argv){
        note.romoveNote(argv.title);
    }
})

//create read command
yargs.command({
    command:'read',
    describe: 'Read a note',
    handler: function (){
        console.log(chalk.green.bold.inverse('Reading a note'));
    }
})

//create list command
yargs.command({
    command:'list',
    describe: 'List a note',
    handler: function (){
        console.log(chalk.green.bold.inverse('new note list'));
    }
})


yargs.parse();