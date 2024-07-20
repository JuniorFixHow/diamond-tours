export function formatDateDiff(date1:string, date2:string) {
    const diffInMs = new Date(date2).getTime() - new Date(date1).getTime();
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const hours = Math.floor(diffInSeconds / 3600);
    const minutes = Math.floor((diffInSeconds % 3600) / 60);
    return `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m`;
  }


  export const formatDateAndTime =(date:Date)=>{
    const dt = date.toLocaleDateString();
    const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `${dt}, ${time}`;
  }

  export const Greetings = ()=>{
    const currentHour = new Date().getHours();
    let greetingMessage;

    if (currentHour < 12) {
      greetingMessage = 'Good morning!';
    } else if (currentHour < 16) {
      greetingMessage = 'Good afternoon!';
    } else {
      greetingMessage = 'Good evening!';
    }

    return greetingMessage;
  }