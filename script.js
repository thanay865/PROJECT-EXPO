let selectedService = "";
let selectedPrice = 0;


// OPEN BOOKING MODAL

function openBooking(service, price) {

    selectedService = service;
    selectedPrice = price;

    document.getElementById("selectedService")
        .textContent = service;

    document.getElementById("bookingModal")
        .style.display = "flex";
}


// CLOSE MODAL

function closeBooking() {

    document.getElementById("bookingModal")
        .style.display = "none";
}


// CONFIRM BOOKING

function confirmBooking() {

    let name =
        document.getElementById("customerName").value;

    let date =
        document.getElementById("bookingDate").value;

    let time =
        document.getElementById("bookingTime").value;

    let guests =
        document.getElementById("bookingGuests").value;


    if (name === "" || date === "" || time === "") {

        alert("Please fill all the details.");

        return;
    }


    let booking = {

        service: selectedService,

        price: selectedPrice,

        name: name,

        date: date,

        time: time,

        guests: guests

    };


    // Get existing bookings

    let bookings =
        JSON.parse(localStorage.getItem("bookings")) || [];


    bookings.push(booking);


    // Save booking

    localStorage.setItem(
        "bookings",
        JSON.stringify(bookings)
    );


    alert("Booking confirmed successfully!");


    closeBooking();

    displayBookings();
}


// DISPLAY BOOKINGS

function displayBookings() {

    let bookings =
        JSON.parse(localStorage.getItem("bookings")) || [];


    let container =
        document.getElementById("booking-list");


    if (bookings.length === 0) {

        container.innerHTML =
            `<p class="no-bookings">
                You don't have any bookings yet.
            </p>`;

        return;
    }


    container.innerHTML = "";


    bookings.forEach((booking, index) => {

        container.innerHTML += `

            <div class="booking-item">

                <div>

                    <h3>${booking.service}</h3>

                    <p>
                        👤 ${booking.name}
                    </p>

                    <p>
                        📅 ${booking.date}
                    </p>

                    <p>
                        ⏰ ${booking.time}
                    </p>

                    <p>
                        👥 ${booking.guests} Guest(s)
                    </p>

                    <p>
                        💰 ₹${booking.price}
                    </p>

                </div>


                <button
                    class="cancel-btn"
                    onclick="cancelBooking(${index})">

                    Cancel

                </button>

            </div>

        `;

    });

}


// CANCEL BOOKING

function cancelBooking(index) {

    let bookings =
        JSON.parse(localStorage.getItem("bookings")) || [];


    bookings.splice(index, 1);


    localStorage.setItem(
        "bookings",
        JSON.stringify(bookings)
    );


    displayBookings();
}


// SEARCH

function searchServices() {

    let location =
        document.getElementById("location").value;

    let date =
        document.getElementById("date").value;

    let guests =
        document.getElementById("guests").value;


    if (location === "") {

        alert("Please enter a location.");

        return;
    }


    alert(
        `Searching bookings in ${location}
        
Date: ${date || "Any date"}

Guests: ${guests}`
    );

}


// LOAD BOOKINGS WHEN PAGE OPENS

displayBookings();