// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e){
    var siteName = document.getElementById('siteName').value;
    var siteURL = document.getElementById('siteURL').value;
    
    if(!siteName || !siteURL){
        alert('Please fill in the whole form.');
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteURL
    }

    if(localStorage.getItem('bookmarks') === null){
        var bookmarks = [];
        bookmarks.push(bookmark);

        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    else{
        
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);

        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    fetchBookmarks();

    // Prevent form from submitting
    e.preventDefault();
}

function fetchBookmarks(){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    let bookmarksResults = document.getElementById('bookmarksResults');
    bookmarksResults.innerHTML = '';

    for(var i = 0; i < bookmarks.length; i++)
    {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML +=   '<div class="well">'                                                                        +
                                        '<h3>'+name                                                                                 + 
                                        ' <a class="btn btn-default" target="_blank" href="http://'+url+'">Visit</a> '              +
                                        ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>  '    +
                                        '</h3'+
                                        '</div>';
    }
}

function deleteBookmark(url){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    for(var i=0; i < bookmarks.length; i++){
        if (bookmarks[i].url == url){
            bookmarks.splice(i,1);
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    fetchBookmarks();
}