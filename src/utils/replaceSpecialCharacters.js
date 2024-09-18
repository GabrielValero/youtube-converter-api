// import { readFile } from 'fs/promises'
// import path from 'path'
// import { fileURLToPath } from 'url';
import specialCharacters from '../config/specialCharacters.js'

export default async function replaceSpecialCharacters(string = '"Can&#39;t Be Erased" SFM by JT Music - Bendy and the Ink Machine Rap'){
    // const __filename = fileURLToPath(import.meta.url);
    // const __dirname = path.dirname(__filename);
    // const dir = path.join(__dirname,'../config/specialCharacters.json')
    
    // const file = await readFile(`${dir}`, 'utf-8')
    
    // const specialCharacters = JSON.parse(file)
    
    const characters = {specialCharacters}
    var pattern = /&([a-zA-Z0-9]+);|&#39;/g; 
    var match = pattern.exec(string) //revisa si el string tiene algun codigo especial
    
    while(match != null){ //it repeats untill string gets no special code
        pattern.lastIndex = 0;
        
        //change special codes with special characters
        string = string.replaceAll(match[0], characters.specialCharacters[match[0].toUpperCase()].characters) 
        
        match = pattern.exec(string)
    }
    return string
}