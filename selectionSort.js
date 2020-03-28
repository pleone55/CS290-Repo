// const selectionSort = arr => {
//     var length = arr.length;
//     for(var i = 0; i < length - 1; i++){
//         var min = i;
//         for(var j = i + 1; j < length; j++){
//             if(arr[j] < arr[min]){
//                 min = j;
//             }
//         }
//         if(min != i){
//             var temp = arr[i];
//             arr[i] = arr[min];
//             arr[min] = temp;
//         }
//     }
//     return arr;
// }

// console.log(selectionSort([3,9,1,2,10,11,18,4]));

function selectionSort(arr){
    var swapIndex = 0;
    while(swapIndex != arr.length - 1){
        var min = swapIndex;
        for(var i = swapIndex; i < arr.length; i++){
            if(arr[i] < arr[min]){
                min = i;
            }
        }
        var temp = arr[swapIndex];
        arr[swapIndex] = arr[min];
        arr[min] = temp;
        swapIndex++;
    }
    return arr;
}

console.log(selectionSort([3,9,1,2,10,11,18,4]));