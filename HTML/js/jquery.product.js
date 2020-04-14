var quantity = null,
  quantity_user = null;

$(document).ready(function () {
  "use strict";
  $(".product-quantity-button").on("click", function () {
    quantity = parseInt($(".product-quantity-input-hidden." + $(this).data("form")).val());
    if ($(this).hasClass("plus")) {
      quantity = quantity + 1;
      quantity_user = quantity;
      if (!$(this).parent(".product-quantity").hasClass("selected")) {
        $(this).parent(".product-quantity").addClass("selected");
      }
    } else {
      quantity = quantity - 1;
      if (quantity < 1) {
        quantity = 0;
        quantity_user = 1;
        if ($(this).parent(".product-quantity").hasClass("selected")) {
          $(this).parent(".product-quantity").removeClass("selected");
        }
      } else {
        quantity_user = quantity;
      }
    }
    $(".product-quantity-input-hidden." + $(this).data("form")).val(quantity);
    $(".product-quantity-input." + $(this).data("form")).val(quantity_user);
  });
  return false;
});
