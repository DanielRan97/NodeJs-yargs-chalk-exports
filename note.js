const fs = require('fs');
const chalk = require('chalk');
const successLog = chalk.green.inverse.bold;
const errorLog = chalk.red.bgWhite.bold;

const getNotes = () =>{
    return 'Your notes...'
}

const addNote = (title,body) =>{
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);
    
    if(!duplicateNote){
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

const romoveNote = (title) => {
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

const listNote = () => {
    const notes = loadNotes();
    if(notes[0]){
      console.log(chalk.bgYellow.bold.black('Your List :'));
      notes.forEach(element => {
          console.log(chalk.bgWhite.bold.black(element.title));
      });
            }else{
                console.log(errorLog('Your list not found'));
            }
}

const readNote = (title) => {
    const notes = loadNotes();
   const findNote =  notes.find((note) => note.title === title);
   if(findNote){
    console.log(chalk.bgYellow.bold.black(`${title}`));
    console.log(findNote.body);
   }else{
       console.log(errorLog('note not found'));
   }
}

const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJson);
}

const loadNotes = () =>{
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJson = dataBuffer.toString();
        return JSON.parse(dataJson)
      
    }catch(e){
        return [];
       
    }
    
}


module.exports = {
    getNotes : getNotes,
    addNote : addNote,
    romoveNote : romoveNote,
    listNote : listNote,
    readNote : readNote
}