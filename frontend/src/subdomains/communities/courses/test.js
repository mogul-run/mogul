const a = [2, -4, 5, 1, 12, 6, 0, 9, 22, -1, -5];

// [[1, -1],
// [5, -5]]

let arr = [];

a.map((item1) => {
    filter_arr(item1, a).map((item2) => {
        if (item2 + item1 === 0 && !arr.includes([item2, item2])) {
            arr.push([item1, item2]);
        }
    });
});

function filter_arr(num, arr) {
    return arr.filter((item) => item != num);
}


console.log(arr.slice(0, arr.length/2));

//  function k() {

//     return (

//      );
//  }

//  export default ;
