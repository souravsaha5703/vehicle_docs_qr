export const formatToIndianTime = (dateString) => {
    const date = new Date(dateString);

    const options = {
        weekday: 'short', // 'Tue'
        day: '2-digit',   // '14'
        month: 'short',   // 'May'
        year: 'numeric',  // '2024'
        hour: '2-digit',  // '6'
        minute: '2-digit', // '05'
        hour12: true,     // 'PM' or 'AM'
        timeZone: 'Asia/Kolkata', // Indian Standard Time
    };

    const formatter = new Intl.DateTimeFormat('en-IN', options);
    return formatter.format(date);
};