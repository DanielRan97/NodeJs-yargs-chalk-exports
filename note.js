const fs = require('fs');
const chalk = require('chalk');
const successLog = chalk.green.inverse.bold;
const errorLog = chalk.red.bgWhite.bold;

const getNotes = function(){
    return 'Your notes...'
}

const addNote = function(title,body){
    const notes = loadNotes();
    const duplicateNotes = notes.filter(function(note){
        return note.title === title;
    })
    if(duplicateNotes.length === 0){
        notes.push({
            title:title,
            body:body
        })
        saveNotes(notes);
        console.log(successLog('New note added'));
    }else{
        console.log(errorLog('Title taken'));
    }

}

const saveNotes = function(notes){
    const dataJson = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJson);
}

const loadNotes = function(){
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJson = dataBuffer.toString();
        return JSON.parse(dataJson)
      
    }catch(e){
        return [];
       
    }
    
}


const romoveNote = function(title){
        const notes = loadNotes();
        let objRemove = false;
        if(notes[0]){
            notes.forEach(element => {
                if(element.title == title){
                    const noteFilter = notes.filter( el => el.title !== title );
                    objRemove = true;
                    saveNotes(noteFilter);
                    console.log(successLog(`${title} has been removed`));
                }
            });
        }else{
            console.log(errorLog('Json is empty'));
        }
        objRemove == false?console.log(errorLog(`${title} not found`)): objRemove = false;
        
}


module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    romoveNote : romoveNote
}