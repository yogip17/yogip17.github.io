let bobas = [
   //boba 
   {'id': 1, 'name': 'Boba Coklat', 'harga': 20000, 'image': 'images/boba.jpeg'},
   {'id': 2, 'name': 'Boba Taro', 'harga': 15000, 'image': 'images/Boba1.jfif'},
   {'id': 3, 'name': 'Boba Vanilla', 'harga': 18000, 'image': 'images/boba.jpeg'}
];

let cart = [];

function read_data () {
    var data_container = document.getElementById("data-container");
    var temp_container = "";
    console.log(data_container);
    for (let i = 0; i < bobas.length; i++) {
        temp_container += "<article>" + "<figure>" + "<img src="+bobas[i].image+" width=\"290\" height=\"190\" alt=\"soto\" />"
        + "<figcaption>Boba Indonesia</figcaption>" + "</figure>" + "<hgroup><h2>"+bobas[i].name+"</h2><h3>"+format_rupiah(bobas[i].harga, 'Rp.')+"</h3><button onclick=\"add_to_cart("+bobas[i].id+");\">BELI</button></hgroup>" + "</article>";
    }
    data_container.innerHTML = temp_container.toString();
}

function add_to_cart (boba_id) {
    let quantity;
    do {
        quantity = prompt('Masukkan jumlah');
    } while (quantity == null || quantity == "" || quantity <= 0);
    let boba_cart;
    bobas.forEach(boba => {
        if (boba.id === boba_id) {
            boba_cart = boba;
        }
    });
    let subtotal = boba_cart.harga * quantity;
    let cart_data = {
        'name' : boba_cart.name,
        'quantity': quantity,
        'harga': boba_cart.harga,
        'subtotal': subtotal
    };
    cart.push(cart_data);
    alert("Success added to cart!");
    show_cart();
}

function show_cart () {
    let cart_container =  document.getElementById("testing");
    let total_harga_container =  document.getElementById("total-harga-container");
    cart_container.innerHTML = "";
    let temp_container = "";
    let total_semua = 0;
    for (let i = 0; i < cart.length; i++) {
        temp_container += "<div class=\"cart-container\">" +
        "<div class=\"column-tables\">"+cart[i].name+"</div>" +
        "<div class=\"column-tables\">"+cart[i].quantity+"</div>" +
        "<div class=\"column-tables\">"+format_rupiah(cart[i].harga, 'Rp. ')+"</div>" +
        "<div class=\"column-tables\">"+format_rupiah(cart[i].subtotal, 'Rp. ')+"</div>" + "</div>";
        total_semua = total_semua + cart[i].subtotal ;
    }
    if (cart.length <= 0) {
        total_harga_container.style.display = "none";
    } else {
        total_harga_container.style.display = "block";
    }
    show_total_harga(total_semua);
    cart_container.innerHTML = temp_container;
}

function show_total_harga (total_price) {
    let total_harga_text = document.getElementById("total-harga-text");
    total_harga_text.textContent = format_rupiah (total_price, 'Rp. ');
}

function empty (){
    cart = [];
    alert ("cheak Out Sukses");
    show_cart();
}

function format_rupiah(price, prefix) 
{
    let angka = price.toString();
    let number_string = angka.replace(/[^,\d]/g, '').toString(),
	split   		= number_string.split(','),
	sisa     		= split[0].length % 3,
	rupiah     		= split[0].substr(0, sisa),
	ribuan     		= split[0].substr(sisa).match(/\d{3}/gi);
 
	// tambahkan titik jika yang di input sudah menjadi angka ribuan
	if(ribuan){
		separator = sisa ? '.' : '';
		rupiah += separator + ribuan.join('.');
	}
 
	rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
	return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
}

read_data();
show_cart();