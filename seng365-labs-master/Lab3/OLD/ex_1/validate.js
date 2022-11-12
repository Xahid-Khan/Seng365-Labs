
function validateForm(){
    let search_string = document.getElementById("search_string").value;
    if (search_string.length == 0) {
        alert("Search string is empty!");
        return false;
    } else {
        return true;
    }
}