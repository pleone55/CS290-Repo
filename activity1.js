isPalindrome("racecar");

function isPalindrome(str){
    let newStr = ""
    for(let i = 0; i < str.length; i++){
        newStr += str[str.length - 1 - i]
    }
    return newStr === str;
};


isPalindrome("racecar");

const palindrome = function(str){
    let newStr = ""
    for(let i = 0; i < str.length; i++){
        newStr += str[str.length - 1 - i]
    }
    return newStr === str;
};