
import specialCharacters from '../config/specialCharacters'

export default function replaceSpecialCharacters(str): string{

    
    const characters = {specialCharacters}
    var pattern = /&([a-zA-Z0-9]+);|&#39;/g; 
    var match = pattern.exec(str) //revisa si el str tiene algun codigo especial
    
    while(match != null){ //it repeats untill str gets no special code
        pattern.lastIndex = 0;
        
        //change special codes with special characters
        str = str.replaceAll(match[0], characters.specialCharacters[match[0].toUpperCase()].characters) 
        
        match = pattern.exec(str)
    }
    return str
}