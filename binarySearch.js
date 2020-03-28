function rBinarySearch(arr, value) {
    //   base case
    if (arr.length) {
        if (arr[arr.length - 1] === value) {
            return true;
        } else {
            arr.pop();
            return rBinarySearch(arr, value)
        }
    }
    return false;
}

console.log(rBinarySearch([1, 2, 3, 10, 14, 99, 4, 20], 10));