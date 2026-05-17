document.addEventListener('DOMContentLoaded', function () {
    console.log("PrintByte Loaded ✅");

    // Mobile menu
    const menuOpenBtn = document.getElementById("menu-open-button");
    const menuCloseBtn = document.getElementById("menu-close-button");
    const body = document.body;

    if (menuOpenBtn) {
        menuOpenBtn.addEventListener("click", () => body.classList.add("show-mobile-menu"));
    }
    if (menuCloseBtn) {
        menuCloseBtn.addEventListener("click", () => body.classList.remove("show-mobile-menu"));
    }

    // Swiper
    new Swiper(".slider-container", {
        loop: true,
        grabCursor: true,
        spaceBetween: 25,
        pagination: { el: ".swiper-pagination", clickable: true },
        navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
        autoplay: { delay: 2500, disableOnInteraction: false },
        breakpoints: {
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
        }
    });

    // ✅ GLOBAL VARIABLES
    let selectedService = "";
    let selectedPrice = 0;

    // ✅ SERVICE SELECTION
    window.setService = function(service) {
        selectedService = service;
        const prices = {
            "Brochure Service": 10,
            "Flyers Service": 8,
            "Id Picture Service": 50,
            "Tarpaulin Service": 35,
            "Xerox Service": 5
        };
        selectedPrice = prices[service] || 0;
        console.log("✅ Selected:", service, "Price: ₱", selectedPrice);
        location.href = "#contact";
    };

    // ✅ PRINT FUNCTION
    window.printReceipt = function() {
        window.print();
        console.log("🖨️ Printing receipt...");
    };

    // ✅ SINGLE CONTACT FORM SUBMIT (No duplicates!)
    const form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            console.log("📋 Form submitted!");

            let customer = document.getElementById("customerNameInput").value;
            let qty = parseInt(document.getElementById("qty").value) || 0;
            let total = qty * selectedPrice;

            console.log("Customer:", customer);
            console.log("Service:", selectedService);
            console.log("Qty:", qty);
            console.log("Total:", total);

            // Validation
            if (!customer || qty <= 0 || !selectedService) {
                alert("❌ Please select a service first and fill all fields!");
                return;
            }

            // Update receipt
            document.getElementById("encoderName").innerText = customer;
            document.getElementById("customerName").innerText = customer;
            document.getElementById("dateNow").innerText = new Date().toLocaleDateString();
            
            document.getElementById("receiptItems").innerHTML = `
                <tr>
                    <td>${selectedService}</td>
                    <td>${qty}</td>
                    <td>₱${selectedPrice}</td>
                    <td>₱${total}</td>
                </tr>
            `;
            
            document.getElementById("total").innerText = total;
            document.querySelector(".receipt-container").style.display = "flex";

            // Scroll to receipt
            setTimeout(() => {
                document.querySelector("#receipt").scrollIntoView({ behavior: 'smooth' });
            }, 500);

            // Reset form
            form.reset();
            console.log("✅ Receipt generated!");
        });
    }
});