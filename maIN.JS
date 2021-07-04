const form = document.querySelector("#itemForm");
const inputItem = document.querySelector("#itemInput");
const itemList = document.querySelector("#itemList");
const navItem = document.querySelectorAll(".nav-item");

let todoItems =  [ ];


const getItemFilter = function(type){
  let filterItem = [ ] ;
  switch (type) {
    case "todo":
      filterItem = todoItems.filter((item) => !item.isDone) ;
      break;

      case "done":
        filterItem = todoItems.filter((item) => item.isDone) ;
        break;
    default:
      filterItem = todoItems ;
  }
  getList(filterItem) ;
}

const removeItem = function(item){
  const removeIndex = todoItems.indexOf(item) ;
  todoItems.splice(removeIndex, 1) ;
}

const updateItem = function(currentItemIndex, value){
  const newItem = todoItems[currentItemIndex];
  newItem.name = value;
  todoItems.splice(currentItemIndex, 1, newItem);
  setLocalStorage(todoItems);
}

const hadleItem = function (itemData) {
  const items = document.querySelectorAll(".list-group-item");
  items.forEach((item) => {
 if (item.querySelector(".title").getAttribute("data-time") == itemData.addedAt) {
   item.querySelector("[data-done]").addEventListener("click", function (e){
   e.preventDefault( ) ;
   const itemIndex = todoItems.indexOf(itemData) ;
   const currentItem = todoItems[itemIndex] ;
   const currentClass = currentItem.isDone ? "bi-check-circle-fill" : "bi-check-circle";
   currentItem.isDone = currentItem.isDone ? false  : true;
   todoItems.splice(itemIndex, 1, currentItem) ;
   setLocalStorage(todoItems)
   const iconClass = currentItem.isDone  ? "bi-check-circle-fill" : "bi-check-circle";
   this.firstElementChild.classList.replace(currentClass, iconClass) ;
    const tabFilter = document.querySelector("tabValue") ;
    getItemFilter(tabFilter) ;

   });

 item.querySelector("[data-edit]").addEventListener("click", function(e){
  e.preventDefault( ) ;
  inputItem.value = itemData.name ;
  document.querySelector("#objIndex").value = todoItems.indexOf(itemData) ;
 });


 item.querySelector("[data-delete]").addEventListener("click", function(e){
  e.preventDefault( ) ;
  if (confirm("Are you sure you want to delete this item?")) {
    itemList.removeChild(item);
    removeItem(items);
    setLocalStorage(todoItems) ;
    return todoItems.filter((item) => item != itemData) ;
  }
 });
};
});
}
         
   
    




const getList = function (todoItems) {
  itemList.innerHTML = " ";
  if (todoItems.length > 0) {
    todoItems.forEach((item) => {
      const iconClass = item.isDone ? "bi-check-circle-fill" : "bi-check-circle";
      itemList.insertAdjacentHTML(
        "beforeend",
        `<li class="list-group-item d-flex justify-content-between align-items-center">
                <span class="title" data-time="${item.addedAt}"> ${item.name} </span>
                <span>
                 <a href="#" data-done><i class="bi ${iconClass} green"></i></a>
                  <a href="#" data-edit><i class="bi bi-pencil-square blue"></i></a>
                  <a href="#" data-delete><i class="bi bi-trash red"></i></a>
                </span>
                </li>`
      );
      hadleItem(item);
    });
  } else{
    itemList.insertAdjacentHTML(
    "beforeend",
    `<li class="list-group-item d-flex justify-content-between align-items-center">
            <span>No record found.</span>
            
            </li>`
    );
  }
}

const getLocalStorage = function () {
  const todoStorage = localStorage.getItem("todoItems");
  if (todoStorage === "undefined" || todoStorage === null) {
    todoItems = [];
  } else {
    todoItems = JSON.parse(todoStorage);
  }
  console.log("items", todoItems);

  getList(todoItems);
};

const setLocalStorage = function (todoItems) {
  localStorage.setItem("todoItems", JSON.stringify(todoItems));
};

document.addEventListener("DOMContentLoaded", () => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const itemName = inputItem.value.trim( );
    if (itemName.length === 0) {
      alert("Please enter a item . . . .");
    } else {

      const currentItemIndex = document.querySelector("#objIndex").value;
      if (currentItemIndex) {
        updateItem(currentItemIndex, itemName);
        document.querySelector("#objIndex").value=" ";
      } else{
        const itemOjt = {
          name: itemName,
          isDone: false,
          addedAt: new Date().getTime(),
        };
        todoItems.push(itemOjt);
        setLocalStorage(todoItems);
      
      }
      getList(todoItems);
      
    };
    itemInput.value = " ";




  });


  navItem .forEach((tab) =>{
    tab.addEventListener('click', function(e){
      e.preventDefault( ) ;
      const tabType = this.getAttribute("data-type") ;
      document.querySelectorAll(".nav-link").forEach((nav) =>{
        nav.classList.remove("active") ;
      })
      this.firstElementChild.classList.add("active") ;
      getItemFilter(tabType) ;
      document.querySelector("#tabValue").value = tabType ;

    })
  })



  getLocalStorage( );
});
