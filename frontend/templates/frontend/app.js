function getCookie(name) {
        let cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                const cookies = document.cookie.split(';');
                for (let i = 0; i < cookies.length; i++) {
                    const cookie = cookies[i].trim();
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
    const csrftoken = getCookie('csrftoken');
    let activeItem = null


function buildApi(){
    let wrapper = document.querySelector('#list-wrapper')
    wrapper.innerHTML = ''
    let url = 'http://127.0.0.1:8000/api/task-list/'
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log("Data: ", data)
            let list = data
            for (let i in list){
                let item = `
                    <div id="data-row-${i}" class="task-wrapper flex-wrapper">
                        <div style="flex: 7">
                        <span class="title">${list[i].title}</span>
                        </div>
                        <div style="flex: 1">
                       <button class="btn btn-sm btn-outline-info edit">Edit </button>
                        </div>
                        <div style="flex: 1">
                        <button class="btn btn-sm btn-outline-dark delete">-</button>
                        </div>
                    </div>
                    `
                wrapper.innerHTML += item

                }
            for (let i in list){
                let editButton = document.getElementsByClassName('edit')[i]
                editButton.addEventListener('click', function (){
                    editItem(list[i])
            })
    }

    })
}

buildApi()

const form = document.querySelector('#form-wrapper')
form.addEventListener('submit', function(e){
    e.preventDefault()
    let url = 'http://127.0.0.1:8000/api/task-create/'
    if (activeItem != null){
        let url = `http://127.0.0.1:8000/api/task-update/${activeItem.id}`
        activeItem = null
    }
    let title = document.querySelector('#title').value
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({'title':title})
    })
    .then(function(response){
        buildApi()
        form.querySelector('#form').reset() // form will be reset after submitting data
    })
})

function editItem(item){
    console.log("Data:  ",item)
    activeItem = item
    document.getElementById('title').value = activeItem.title
}