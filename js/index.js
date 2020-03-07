var language = document.getElementById('language');
var languageMenu = document.getElementById('languageMenu');
var lis = languageMenu.getElementsByTagName('li');
for (var i = 0; i < lis.length; i++) {
    lis[i].onclick = function() {
        language.innerHTML = this.innerHTML;
    }
}