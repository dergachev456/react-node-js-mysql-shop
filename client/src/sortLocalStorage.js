export function sortCart(arr) {
    var counter = arr.reduce((o, i) => {
        // console.log(o);
        // console.log(i);
        
        
        if (!o.hasOwnProperty(Math.trunc(i.id))) {
            o[Math.trunc(i.id)] = 0;
            // console.log(o);
            
        }
        o[Math.trunc(i.id)]++;
        // console.log(o);

        return o;
    }, {});
    var result = Object.keys(counter).map(function (id) {
        return {
            id: id,
            name: counter.name,
            sum: counter[id]
        };
    });
    return result;



}
// console.log(getCountIds(arr))