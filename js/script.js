$(document).ready(function() {
  var seatsSelected = {length : 0};
  var seatsSold = {
    length : 7,
    "h10": 1,
    "h9": 1,
    "h8": 1,
    "h11": 1,
    "i4": 1,
    "i6": 1,
    "i5": 1
  };
  var ticketPrice = 70000;
  var discount = 10;
  var totalMoney = 0;
  var numberOfTicket = 0;

  for (var seat in seatsSold) {
    if (seat != "length") {
      $(".seats .seat[data-seat=" + seat + "]").addClass("sold");
    }
  }

  $(".seats .seat").click(function() {        
    if (this.classList.contains("sold")) {
      return;
    }

    this.classList.toggle("selected");
    var seat = this.dataset.seat;

    if (seatsSelected[seat]) {
      delete seatsSelected[seat];
      seatsSelected.length--;
    } else {
      seatsSelected[seat] = 1;
      seatsSelected.length++;
    }

    $("#num-of-seats").empty();
    $("#num-of-seats").append(`${seatsSelected.length} Seats`);
    
    $("#list-seat-selected").empty();
    for (var seat in seatsSelected) {
      if (seat != "length") {
        var elementSeatSeleted = `<div class="seat-selected">${seat.toUpperCase()}</div>`;
        $("#list-seat-selected").append(elementSeatSeleted);
      }
    }

    $("#number-ticket").empty();
    $("#number-ticket").append(seatsSelected.length);
  });

  $("#ticket-price").append(`${formatMoney(ticketPrice)} VND`);
  $("#discount").append(`${discount}%`);
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