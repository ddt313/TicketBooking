var seatsSelected = null;
var seatsSold = null;
var ticketPrice = 0;
var foodMoney = 0;
var discount = 0;
var totalMoney = 0;
var quantityTicket = 0;

$(document).ready(function() {
  $(".interface-add-food").hide();

  seatsSelected = {length : 0};
  seatsSold = {
    length : 7,
    "h10": 1,
    "h9": 1,
    "h8": 1,
    "h11": 1,
    "i4": 1,
    "i6": 1,
    "i5": 1
  };
  ticketPrice = 100000;
  foodMoney = 0;
  discount = 11;
  totalMoney = 0;
  quantityTicket = 0;

  for (var seat in seatsSold) {
    if (seat != "length") {
      $(".seats .seat[data-seat=" + seat + "]").addClass("sold");
    }
  }

  $(".seats .seat").click(function() {        
    if (this.classList.contains("sold")) {
      return;
    }
    
    var seat = this.dataset.seat;
    if (seatsSold[seat]) {
      $(`.seats .seat[data-seat=${seat}]`).addClass("sold");
      return;
    }

    this.classList.toggle("selected");

    if (seatsSelected[seat]) {
      delete seatsSelected[seat];
      seatsSelected.length--;
    } else {
      seatsSelected[seat] = 1;
      seatsSelected.length++;
    }

    quantityTicket = seatsSelected.length;
    $("#num-of-seats").empty();
    $("#num-of-seats").append(`${quantityTicket} Seats`);
    
    $("#list-seat-selected").empty();
    for (var seat in seatsSelected) {
      if (seat != "length") {
        var elementSeatSeleted = `<div class="seat-selected">${seat.toUpperCase()}</div>`;
        $("#list-seat-selected").append(elementSeatSeleted);
      }
    }

    quantityTicket = seatsSelected.length;
    $("#number-ticket").empty();
    $("#number-ticket").append(quantityTicket);

    totalMoney = calcTotalMoney();
    $("#total-price").empty();
    $("#total-price").append(`${formatMoney(totalMoney)} VND`);
  });

  $("#ticket-price").append(`${formatMoney(ticketPrice)} VND`);
  $("#discount").append(`${discount}%`);

  // ----------------------add foods----------------
  $(".add-food").click(function() {
    $(".interface-add-food").show();
  });

  $("#close-add-food").click(function() {
    $(".interface-add-food").hide();
  });
});

function formatMoney(money) {
  var res = "";
  var moneyString = money.toString();

  for (var i = 0; i < moneyString.length; i++) {
    res = moneyString[moneyString.length - 1 - i] + res;
    
    if ((i + 1) % 3 == 0) {
      res = "," + res;
    }
  }

  if (res[0] == ',') {
    res = res.slice(1, res.length);
  }

  return res;
}

function calcTotalMoney() {
  return Math.round((ticketPrice * quantityTicket + foodMoney) * (1 - discount / 100.0));
}