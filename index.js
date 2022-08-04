//constructor
function Book(Name, regNo, bookName, author, type, issueDate, returnDate) {
    this.Name = Name;
    this.regNo = regNo;
    this.bookName = bookName;
    this.author = author;
    this.type = type;
    this.issueDate = issueDate;
    this.returnDate = returnDate;
}


//issue date 
function issueDate(){
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var today = day + "/" + month + "/" + year;
    return today;
}
document.getElementById('issueDate').value = issueDate();


//return date from issue date add 15 days
function returnDate(){
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var today = day + "/" + month + "/" + year;
    var returnDate = new Date(today);
    returnDate.setDate(returnDate.getDate() + 10);
    var day = returnDate.getDate();
    var month = returnDate.getMonth() + 1;
    var year = returnDate.getFullYear();
    var today = day + "/" + month + "/" + year;
    return today;
}
document.getElementById('returnDate').value = returnDate();


//display constructor
function display(){
    
}


//all the data from local storage
function getBooksFromLocalStorage(){
    var books = JSON.parse(localStorage.getItem('books'));
    if(books == null){
        books = [];
    }
    return books;
}


//add method to display prototype
display.prototype.add = function(book) {
    console.log("ui string");
    tabledata = document.getElementById('tabledata');
    let uiString = `
    <tr>
         <td>${book.Name}</td>
        <td>${book.regNo}</td>
        <td>${book.bookName}</td>
        <td>${book.author}</td>
        <td>${book.type}</td>
        <td>${book.issueDate}</td>
        <td>${book.returnDate}</td>
        <td><button type="submit" id="btn" class="btn btn-primary">Delete</button></td>
    </tr>
    `;
    tabledata.innerHTML += uiString;

}


//implement the claer function
display.prototype.clear = function(){
   //let name = document.getElementById('name');
   //name.reset();
   //let regno = document.getElementById('number');
   //regno.reset();
   //let bookname = document.getElementById('bookName');
   //bookname.reset();
   //let authorname = document.getElementById('authorName');
   //authorname.reset();
   //let Type = document.getElementById('bookType');
   //Type.reset();
   let LibraryForm = document.getElementById('LibraryForm');
   LibraryForm.reset();
}


//implement validate function
display.prototype.validate = function(book){
    if (book.Name.length<2 ||book.author.length<2 ||book.regNo.length<2||book.bookName.length<2){
        return false;
    }else{
        return true;
    }
}


//implemnt show function
display.prototype.show  = function(type,displayMessage){
 let message = document.getElementById('message');
 message.innerHTML=`
 <div class="alert alert-${type} alert-dismissible fade show" role="alert">
        <strong>Message:</strong>  ${displayMessage}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
 `;
 setTimeout(() => {
    message.innerHTML = '';
 }, 2000);
}


//add submit event listner to LibraryForm
let LibraryForm = document.getElementById('LibraryForm');
LibraryForm.addEventListener('submit', LibraryFormSubmit);
function LibraryFormSubmit(e){
    let Name = document.getElementById('name').value;
    let regNo = document.getElementById('number').value;
    let bookName = document.getElementById('bookName').value;
    let author = document.getElementById('authorName').value;
    let type = document.getElementById('bookType').value;
    let issueDate = document.getElementById('issueDate').value;
    let returnDate = document.getElementById('returnDate').value;

    let book = new Book(Name, regNo, bookName, author, type, issueDate, returnDate);
    console.log(book);

    let Display = new display();
    if(Display.validate(book)){
        Display.add(book);
        Display.clear();
        Display.show('success','your book has been successfully added');
    }else{
        Display.show('danger','sorry,please enter book details');
    }
    e.preventDefault();

}


//how to add data to the local storage
function addToLocalStorage(book){
    let books;
    if(localStorage.getItem('books') === null){
        books = [];
    }
    else{
        books = JSON.parse(localStorage.getItem('books'));
    }
    books.push(book);
    localStorage.setItem('books',JSON.stringify(books));
}


//delete book from table cleck delete button
let tabledata = document.getElementById('tabledata');
tabledata.addEventListener('click', deleteBook);
function deleteBook(e) {
    if (e.target.id === 'btn') {
        let tr = e.target.parentElement.parentElement;
        alert('are you sure you want to delete this book');
        tr.remove();
    }
}












