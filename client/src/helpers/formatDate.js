export function formatDate(arr){
    let date = new Date();

    arr.forEach(element => {
        date.setTime(parseInt(element['creationDate'], 10));
        element['creationDate'] = date.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
    });
}