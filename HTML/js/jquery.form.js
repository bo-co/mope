var el = null,
  result = null,
  params = null,
  baron__choose = null,
  list__elements = list__elements;

function clear(el) {
  "use strict";
  el.each(function () {
    if ($(this).val()) {
      $(this).val("");
    }
    if ($(this).next("span").hasClass("selected")) {
      $(this).next("span").removeClass("selected");
    }
    if ($(this).hasClass("error")) {
      $(this).removeClass("error");
    }
    if ($(this).hasClass("success")) {
      $(this).removeClass("success");
    }
  });
  return false;
}

function isChoose(el) {
  "use strict";
  if ($("div.container > div.list").length !== 0) {
    $("div.container > div.list").remove();
  } else {
    if (list__elements.length !== 0) {
      $("<div>", {
        "class": "list tail tail-right",
        "style": "display: block; width:" + el.width + "px; left:" + el.offset.left + "px; top:" + (el.offset.top + el.height + 5) + "px"
      }).appendTo("div.container");
      $("<div>", {
        "class": "baron baron__choose"
      }).appendTo("div.container > div.list");
      $("<div>", {
        "class": "baron-scroller"
      }).appendTo("div.container > div.list > div.baron.baron__choose");
      $("<ul>").appendTo("div.container > div.list > div.baron.baron__choose > div.baron-scroller");
      for (var i = 0; i < list__elements.length; i += 1) {
        $("<li>", {
          "class": "item_" + i,
          "data-form": el.form,
          "data-field": el.list
        }).appendTo("div.container > div.list > div.baron.baron__choose > div.baron-scroller > ul");
        $("<span>", {
          "text": list__elements[i].value
        }).appendTo("div.container > div.list > div.baron.baron__choose > div.baron-scroller > ul > li.item_" + i);
      }
      $("<div>", {
        "class": "baron-track"
      }).appendTo("div.container > div.list > div.baron.baron__choose");
      $("<div>", {
        "class": "baron-bar"
      }).appendTo("div.container > div.list > div.baron.baron__choose > div.baron-track");
      baron__choose = baron({
        root: "div.container > div.list > div.baron.baron__choose",
        scroller: "div.container > div.list > div.baron.baron__choose > div.baron-scroller",
        bar: "div.container > div.list > div.baron.baron__choose > div.baron-track > div.baron-bar"
      }).autoUpdate();
      $("div.container > div.list > div.baron.baron__choose > div.baron-scroller").on("scroll", $.debounce(250, true, function () {
        $("div.container > div.list > div.baron.baron__choose > div.baron-track > div.baron-bar").css({
          "opacity": "0.5"
        });
      }));
      $("div.container > div.list > div.baron.baron__choose > div.baron-scroller").on("scroll", $.debounce(500, function () {
        $("div.container > div.list > div.baron.baron__choose > div.baron-track > div.baron-bar").css({
          "opacity": "0"
        });
      }));
    }
  }
  return false;
}

function isName(name) {
  "use strict";
  var regex = new RegExp(/^([а-яА-Яa-zA-Z][а-яА-Яa-zA-Z\- ]{1,20})+$/);
  return regex.test(name);
}

function isEmail(email) {
  "use strict";
  var regex = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
  return regex.test(email);
}

function isPhone(phone) {
  "use strict";
  var regex = new RegExp(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{10,20}$/);
  return regex.test(phone);
}

function isRequire(classname) {
  "use strict";
  if ($("div.form." + classname + " input.error").length !== 0) {
    if ($("div.form." + classname + " > form li > div > button").hasClass("active")) {
      $("div.form." + classname + " > form li > div > button").removeClass("active");
    }
  } else {
    if ($("div.form." + classname + " .required > input").length !== $("div.form." + classname + " .required > input.success").length) {
      if ($("div.form." + classname + " > form li > div > button").hasClass("active")) {
        $("div.form." + classname + " > form li > div > button").removeClass("active");
      }
    } else {
      if (!$("div.form." + classname + " > form li > div > button").hasClass("active")) {
        $("div.form." + classname + " > form li > div > button").addClass("active");
      }
    }
  }
  return false;
}

function isForm(form) {
  "use strict";
  $.ajax({
    type: "POST",
    data: $("div.form." + form + " > form").serialize(),
    url: "/actions/?action=" + form,
    cache: false,
    dataType: "json"
  }).done(function (result) {
    if (result.status === "success") {
      $("div.form." + form).html(result.message);
    } else {
      if (result.field) {
        if (!$("div.form." + form + " > form input[name=" + result.field + "]").hasClass("error")) {
          $("div.form." + form + " > form input[name=" + result.field + "]").addClass("error");
        }
      }
      console.log(result.error);
    }
  }).fail(function () {
    console.log("ошибка отправки формы");
  });
  return false;
}

$(document).ready(function () {
  "use strict";
  /* $("div.form div.choose > input[readonly]").focus(function () {
  	this.blur();
  }); */
  $("div.form div.choose > input[readonly]").on("click", function () {
    params = {
      "form": $(this).data("form"),
      "list": $(this).data("list"),
      "offset": $(this).offset(),
      "width": $(this).outerWidth(),
      "height": $(this).outerHeight()
    };
    isChoose(params);
  });
  $("div.baron-article > div.baron-scroller").on("scroll", function () {
    if ($("div.container > div.list").length !== 0 && $("div.container > div.list").is(":visible")) {
      $("div.container > div.list").remove();
    }
  });
  $(window).resize(function () {
    if ($("div.container > div.list").length !== 0) {
      $("div.container > div.list").remove();
    }
  });
  $(".field").on("propertychange change click keyup input paste", function () {
    el = this;
    setTimeout(function () {
      if (!$(el).val()) {
        if ($(el).next('span').hasClass('selected')) {
          $(el).next('span').removeClass('selected');
        }
        if ($(el).hasClass('error')) {
          $(el).removeClass('error');
        }
        if ($(el).hasClass('success')) {
          $(el).removeClass('success');
        }
        if ($(el).hasClass('selected')) {
          $(el).removeClass('selected');
        }
      } else {
        if (!$(el).next("span").hasClass("selected")) {
          $(el).next("span").addClass("selected");
        }
        if ($(el).parent().hasClass("required")) {
          if ($(el).data("check") === "name") {
            result = isName($(el).val());
          }
          if ($(el).data("check") === "phone") {
            result = isPhone($(el).val());
          }
          if ($(el).data("check") === "email") {
            result = isEmail($(el).val());
          }
          if (!result) {
            if ($(el).hasClass("success")) {
              $(el).removeClass("success");
            }
            $(el).addClass("error");
          } else {
            if ($(el).hasClass("error")) {
              $(el).removeClass("error");
            }
            $(el).addClass("success");
          }
        }
      }
      isRequire($(el).data("form"));
    }, 100);
  });
  $("span.checkbox").on("click", function () {
    if (!$(this).hasClass("checked")) {
      $(this).addClass("checked");
      $(this).prev("input").prop("checked", true);
      $(this).prev("input").addClass("success");
    } else {
      $(this).removeClass("checked");
      $(this).prev("input").prop("checked", false);
      $(this).prev("input").removeClass("success");
    }
    isRequire($(this).data("form"));
  });
  $("div.form > form li > div > button").on("click", function () {
    if ($(this).hasClass("active")) {
      /* isForm($(this).data("form")); */
      $("div.form").addClass("success");
    }
  });
  clear($(".field"));
  $("input[type=tel]").inputmask("+7 (999) 999-99-99");
  return false;
});

$(document).mouseup(function (e) {
  "use strict";
  if ($("div.container > div.list").length !== 0 && !$("div.container > div.list").is(e.target) && $("div.container > div.list").has(e.target).length === 0 && $("div.container > div.list").is(":visible")) {
    $("div.container > div.list").remove();
  }
  e.preventDefault();
  return false;
});

$(document).on("click", "div.container > div.list > div.baron.baron__choose > div.baron-scroller > ul > li", function (e) {
  "use strict";
  el = "div.form." + $(this).data("form") + " form div.choose." + $(this).data("field") + " > input.field";
  $(el).val($(this).find("span").text());
  if (!$(el).next("span").hasClass("selected")) {
    $(el).next("span").addClass("selected");
  }
  $("div.form." + $(this).data("form") + " form .hide." + $(this).data("field")).each(function () {
    $(this).removeClass("hide");
  });
  $("div.container > div.list").remove();
  e.preventDefault();
  return false;
});
