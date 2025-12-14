let cart = []
let eid = 0

// function to close the "welcome" screen and open shop
function openShop() {
    document.getElementById("shopDiv").classList.remove('d-none')
    document.getElementById("welcomeDiv").classList.add('d-none')
}

// <!-- Placeholder Product -->
//                 <!-- <div class="row border">
//             <div class="col-3">
//                 <img
//                 src="/img/bgimagetemp.jpeg"
//                 class="shadow-1-strong rounded mb-4"
//                 width="65"
//                 height="65"
//                 style="margin-left: 20%; margin-bottom: 0%; line-height: 0%; margin-bottom: 0%"
//                 >
//             </div>
//             <div class="col-3 text-center fs-1 font-weight-bold">Product Name</div>
//             <div class="col-3  text-center fs-1 font-weight-bold">Product Price</div>
//             <div class="col-3">
//             <button class="btn btn-danger">Cancel</button>
//             </div> -->
function updateCart(product) {

    //row and column
    let row = document.createElement('div')
    row.id = product[3]
    row.classList.add('row')
    row.classList.add('border')
    row.classList.add('bg-white')
    let col1 = document.createElement('div')
    col1.classList.add("col-3")
    row.append(col1)


    //image
    let img = document.createElement("img")
    img.src = product[0]
    img.classList = ("shadow-1-strong rounded mb-4")
    img.width = "65"
    img.height = "65"
    img.style = "margin-left: 20%; margin-bottom: 0%; line-height: 0%; margin-bottom: 0%; margin-top: 2%"
    col1.append(img)

    //product name
    let productName = document.createElement("div")
    productName.classList = ("col-3 text-center fs-1 font-weight-bold")
    productName.innerHTML = product[1]
    productName.style = "margin-top: 5%"
    let col2 = document.createElement('div')
    col2.classList.add("col-3")
    row.append(col2)
    col2.append(productName)

    //product price
    let productPrice = document.createElement("div")
    productPrice.classList = ("col-3 text-center fs-1 font-weight-bold")
    productPrice.innerHTML = product[2] + "€"
    productPrice.style = "margin-top: 5%"
    let col3 = document.createElement('div')
    col3.classList.add("col-3")
    row.append(col3)
    col3.append(productPrice)

    //cancelButton
    let cancelButton = document.createElement("button")
    cancelButton.classList = ("btn btn-danger")
    cancelButton.style = "margin-top: 5%"
    // :/ https://stackoverflow.com/questions/15097315/change-onclick-attribute-with-javascript
    functionString = 'cancelProduct(' + product[3] + ')'
    cancelButton.setAttribute('onclick', functionString)
    cancelButton.innerHTML = "Remove"
    let col4 = document.createElement('div')
    col4.classList.add("col-3")
    row.append(col4)
    col4.append(cancelButton)



    let cartHolder = document.getElementById("cartHolder")
    cartHolder.append(row)
}

// function adds product to cart array and notifies the user item has been successfully added to thecart
function buyProduct(img, name, price) {
    eid = eid + 1
    product = [img, name, price, eid]
    cart.push(product)
    cartHolder = document.getElementById("cartHolder")
    cartHolder.innerHTML = ""
    cart.forEach(updateCart)
}

function cancelProduct(eidButton) {
    cart.forEach(function cleanList(product) {
        if (product[3] == eidButton) {
            index = cart.indexOf(product)
            cart.splice(index, 1)
            console.log(cart)
        }
    })
    document.getElementById(eidButton).remove()
}

let inputs = []

function checkoutFormOpen() {
    document.getElementById("checkoutFormButton").innerHTML = "Continue"
    document.getElementById("detailsForm").classList = ""
    document.getElementById("finalConfirmation").classList = "d-none"
}

function continueToBuy() {
    inputs = []
    let errorMessage = ""
    inputs.push(document.getElementById("formInput1").value)
    inputs.push(document.getElementById("formInput2").value)
    inputs.push(document.getElementById("formInput3").value)
    inputs.push(document.getElementById("formInput4").value)
    console.log(inputs)

    let email = inputs[0]
    if (!(email.includes("@")) || email.length < 5) {
        errorMessage = "Email is Invalid!"
    }

    let phoneNumber = inputs[1]
    //https://www.geeksforgeeks.org/javascript/how-to-check-if-string-contains-only-digits-in-javascript/
    if (!(/^\d+$/.test(phoneNumber)) || phoneNumber.length < 5) {
        errorMessage = "Phone Number is Invalid!"
    }

    let fullName = inputs[2]
    if ((/\d/.test(fullName)) || fullName.length < 5 || !(fullName.match(" "))) {
        errorMessage = "Name is Invalid!"
    }

    let cardNumber = inputs[3]
    if (!(/^\d+$/.test(cardNumber)) || cardNumber.length < 5) {
        errorMessage = "Card Number is Invalid!"
    }

    if (errorMessage != "") {
        alert(errorMessage)
    }
    else {
        updateCheckoutForm()
    }

}

function updateCheckoutForm() {
    document.getElementById("finalConfirmation").innerHTML = ""
    addCheckoutRow("Name", "Price")


    cart.forEach(checkoutList)
    addCheckoutRow("-", "-")
    let x = 0
    totalPrice = 0
    while (x < cart.length) {
        totalPrice += cart[x][2]
        x += 1
    }

    addCheckoutRow("Total", "€" + totalPrice)
    let discount = 0
    if (cart.length >= 3) {
        discount = (totalPrice * 0.2).toFixed(2)
        addCheckoutRow("Discount", "-€" + discount)
    }
    let finalPrice = Number(totalPrice - Number(discount))
    console.log(totalPrice)
    console.log(discount)
    console.log(finalPrice)
    let taxes = (0.1 * totalPrice)
    // https://stackoverflow.com/questions/15762768/javascript-math-round-to-two-decimal-places
    taxes = taxes.toFixed(2)
    addCheckoutRow("Taxes", "€" + taxes)

    finalPrice = (finalPrice + Number(taxes)).toFixed(2)
    addCheckoutRow("Final Price", "€" + finalPrice)


    // updating other modal elements
    document.getElementById("checkoutFormButton").innerHTML = "Buy"
    document.getElementById("detailsForm").classList = "d-none"
    document.getElementById("finalConfirmation").classList = ""


}

function checkoutList(product) {
    addCheckoutRow(product[1], ("€" + product[2]))
}

function addCheckoutRow(HT1, HT2) {
    let row = document.createElement('div')
    row.classList.add('row')
    row.classList.add('border')
    row.classList.add('bg-white')

    let col1 = document.createElement('div')
    col1.classList = ("col-6 text-center fs-1 font-weight-bold")
    col1.innerHTML = HT1
    row.append(col1)



    let col2 = document.createElement('div')
    col2.classList = ("col-6 text-center fs-1 font-weight-bold")
    col2.innerHTML = HT2
    row.append(col2)

    document.getElementById("finalConfirmation").append(row)
}

function changeTab(category) {
    //meals, donations, or toys

    if (category == "meals") {
        document.getElementById("meal-row").classList = "row"
        document.getElementById("toy-row").classList = "row d-none"
        document.getElementById("donation-row").classList = "row d-none"
    }

    if (category == "donations") {
        document.getElementById("meal-row").classList = "row d-none"
        document.getElementById("toy-row").classList = "row d-none"
        document.getElementById("donation-row").classList = "row"
    }

    if (category == "toys") {
        document.getElementById("meal-row").classList = "row d-none"
        document.getElementById("toy-row").classList = "row"
        document.getElementById("donation-row").classList = "row d-none"
    }

}