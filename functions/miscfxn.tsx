export const splitWords =(sentence:string, length:number): string =>{
    const words = sentence.split(' ');

// Get the last 2 words
    const lastTwoWords = words.slice(length);

    // Join the last 2 words back into a string
    const word = lastTwoWords.join(" ");
    return word;
}


export const splitfirst =(sentence:string, length:number): string =>{
    const words = sentence.split(' ');

// Get the last 2 words
    const lastTwoWords = words.slice(0, length);

    // Join the last 2 words back into a string
    const word = lastTwoWords.join(" ");
    return word;
}