//drag function
function drag(event){
    event.dataTransfer.setData('text', event.target.id);
}

function allowDrop(event){
    event.preventDefault();
}

function drop(event){
    event.preventDefault();
    let data = event.dataTransfer.getData('text');
    event.target.appendChild(document.getElementById(data))
}

//onload function
window.onload = () => {
    
   let parentElement = document.getElementById('drag');
    let fragment = document.createDocumentFragment();
    while(parentElement.children.length){
        fragment.appendChild(parentElement.children[Math.floor(Math.random() * parentElement.children.length)])
    }

    parentElement.appendChild(fragment)
}