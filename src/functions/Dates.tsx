export const formatDateAndTime = (date:string)=>{
    return new Date(date).toLocaleString(navigator.language, {
        dateStyle: 'short',
        timeStyle: 'short',
    })
}


  export const calcMinDate = ()=>{
    const currentDateTime = new Date();
    const date = currentDateTime.toISOString().slice(0, 16);
    return date;
  }