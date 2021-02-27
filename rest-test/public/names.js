(function iife() {

    const list = document.querySelector('ul');
    const status = document.querySelector('.status');
    const add = document.querySelector('.add');
    const toAdd = document.querySelector('.add-name');

    let names = [];

    const errMsgs= {
        'duplicate':'already exists',
        'network-error':'connecting problem',
    }

    function updateStatus(message) {
        status.innerText = message;
    }
    function renderNames(names) {
        const html = names.map((name) => `
        <li>
            <span class="name">${name}</span>
            <span class="delete" data-name=""${name}>x</span>
        </li>`
        ).join('');
        list.innerHTML = html;
    }

    function convertError(response) {
        if(response.ok) {
            return response.json();
        }
        return response.json()
            .then(err => Promise.reject(err));
    }


    fetch('/people/',{
        method:'GET',
    })
        .catch(() => Promise.reject({error: 'network-error'}))
        .then(convertError)
        .then(names => {
            renderNames(names);
            updateStatus('');
        })
        .catch(err => {
            updateStatus(errMsgs[err.error] || err.error);
        });
})();