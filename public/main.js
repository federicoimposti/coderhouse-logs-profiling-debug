const socket = io.connect();

function render(data) {
    const html = data.map((elem, i, arr) => {
        return(
            `<div class="chat-msg ${i === arr.length - 1 ? 'animate__animated animate__bounceInLeft' : ''}">
            <strong class="chat-msg__email">${elem.email}</strong>:
            <em class="chat-msg__text">[<em class="chat-msg_date">${elem.date}</em>]: ${elem.text}</em> </div>`
        )
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}

function addMessage(e) {
    const mensaje = {
        email: document.getElementById('email').value,
        text: document.getElementById('texto').value,
        date: dayjs().format('DD/MM/YYYY HH:MM:ss'),
    };
    socket.emit('new-message', mensaje);
    return false;
}

function addProduct(e) {
    const product = {
        title: document.getElementById('product-title').value,
        price: document.getElementById('product-price').value,
        image: document.getElementById('product-image').value
    };
    socket.emit('new-product', product);
    return false;
}

const renderProductsList = (products) => {
    return fetch('./templates/productsList.ejs')
    .then(response => response.text())
    .then(template => {
        const productListTemplate = ejs.compile(template);
        const html = productListTemplate({ products });
        return html;
    })
}

socket.on('products', (data) => {
    renderProductsList(data)
        .then(html => {
            document.getElementById('products').innerHTML = html;
        })
});

socket.on('messages', function(data) { render(data); });