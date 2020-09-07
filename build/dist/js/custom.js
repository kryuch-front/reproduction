$(function () {
  var slinky = $(".mobile-menu__body").slinky({
    title: true,
    theme: "slinky-baby",
  });

  $(".js-toggle").on("click", function () {
    $(this).next().slideToggle();
    if (!$(this).hasClass("toggled")) {
      $(this).addClass("toggled");
    } else {
      $(this).removeClass("toggled");
    }
  });

  var fixedHeader = $("header .main-header__top"),
    header = $("header").first();

  if (fixedHeader.length) {
    if (header.length) {
      var open = false,
        fixedHeaderHeight = fixedHeader.outerHeight(),
        headerHeight = header.outerHeight(),
        heightDif = headerHeight - fixedHeaderHeight;

      if ($("#panel").length) {
        var bitrixPanel = $("#panel:visible").outerHeight();
      } else {
        var bitrixPanel = 0;
      }

      if (heightDif <= 0) {
        heightDif = 0;
      }

      $(window).on("scroll", function () {
        var scrollAmount = $(window).scrollTop();

        if (!open) {
          if (scrollAmount > headerHeight + bitrixPanel) {
            open = true;
            fixedHeader.css("top", "-" + headerHeight + "px");
            fixedHeader.addClass("main-header__top--fixed");
            fixedHeader.animate(
              {
                top: "0",
              },
              {
                duration: 300,
              }
            );
          }
        } else {
          if (open) {
            if (scrollAmount <= heightDif + bitrixPanel) {
              open = false;
              fixedHeader.removeClass("main-header__top--fixed");
            }
          }
        }
      });
    }
  }

  $(".js-mobile-menu").on("click", function (e) {
    e.preventDefault();
    $("body").toggleClass("no-overflow");
    $(".mobile-menu").addClass("mobile-menu--open");
  });

  $(".js-mobile-menu-close").on("click", function (e) {
    e.preventDefault();
    $("body").toggleClass("no-overflow");
    $(".mobile-menu").removeClass("mobile-menu--open");
  });

  if ($("[data-fancybox]").length) {
    $("[data-fancybox]").fancybox({
      infobar: false,
    });
  }

  if ($(".js-nice-select").length) {
    $(".js-nice-select").niceSelect();
  }

  $(".js-phone-mask").inputmask({
    mask: "+7 (999) 999-99-99",
    showMaskOnHover: false,
  });

  /* card-item start */

  if ($(".js-slider").length) {
    $(".js-slider").slick({
      arrows: true,
      asNavFor: ".js-slider-nav",
      prevArrow:
        '<a class="card-item__slider-arrow card-item__slider-arrow--prev" href="#"></a>',
      nextArrow:
        '<a class="card-item__slider-arrow card-item__slider-arrow--next" href="#"></a>',
      rows: 0,
    });
  }

  if ($(".js-slider-partners").length) {
    $(".js-slider-partners").slick({
      arrows: true,
      prevArrow: '<a class="slider-arrow slider-arrow--prev" href="#"></a>',
      nextArrow: '<a class="slider-arrow slider-arrow--next" href="#"></a>',
      rows: 0,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 1500,
      touchMove: false,
      responsive: [
        {
          breakpoint: 991,
          settings: {
            arrows: false,
            centerMode: false,
            touchMove: true,
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: true,
            slidesToShow: 1,
          },
        },
      ],
    });
  }

  /* modals */

  $(".js-btn-modal-menu").click(function (e) {
    e.preventDefault();
    $("body").addClass("no-overflow");
    $(".modal-menu").addClass("modal-menu--open");
  });

  $(".js-btn-modal-menu-close").click(function () {
    // e.preventDefault();
    $("body").removeClass("no-overflow");
    $(".modal-menu").removeClass("modal-menu--open");
  });

  $("#modalCity, #callback").on("show.bs.modal", function () {
    // e.preventDefault();
    // $('body').removeClass('no-overflow');
    $(".modal-menu").removeClass("modal-menu--open");
    $(".mobile-menu").removeClass("mobile-menu--open");
  });

  $("#modalCity, #callback").on("hide.bs.modal", function () {
    // e.preventDefault();
    $("body").removeClass("no-overflow");
    // $('.modal-menu').removeClass('modal-menu--open');
  });

  /* count */
  $(".main-adv__item").each(function () {
    var number = $(this).find(".main-adv__item-title span");

    if (number) {
      var endNumber = parseInt(number.text()),
        startNumber = parseInt(number.attr("data-start")) || 0;

      number.countTo({
        from: startNumber,
        to: endNumber,
        speed: 1500,
        refreshInterval: 30,
      });
    }
  });
  /* count end */

  $(".js-banner-scroll").click(function () {
    $("html, body").animate(
      {
        scrollTop: $("main").offset().top,
      },
      1000
    );
  });

  /* js-range */

  if ($(".js-range").length > 0) {
    $(".js-range").each(function () {
      customRange($(this));
    });
  }

  function customRange(element) {
    var min = element.data("from"),
      max = element.data("to");

    element.slider({
      range: true,
      min: min,
      max: max,
      values: [min, max],
      create: function (event, ui) {
        var values = $(this).slider("values");

        var handle_left = $(this).find(".ui-slider-handle").first(),
          handle_right = $(this).find(".ui-slider-handle").last();

        handle_left.text(values[0]);
        handle_right.text(values[1]);
      },
      change: function (event, ui) {
        var values = ui.values,
          handle_left = $(this).find(".ui-slider-handle").first(),
          handle_right = $(this).find(".ui-slider-handle").last(),
          inputMin = $(this)
            .closest(".form-range")
            .find('input[type="hidden"]')
            .first(),
          inputMax = $(this)
            .closest(".form-range")
            .find('input[type="hidden"]')
            .last();

        handle_left.text(values[0]);
        handle_right.text(values[1]);

        inputMin.val(values[0]);
        inputMax.val(values[1]);
      },
      slide: function (event, ui) {
        var values = ui.values,
          handle_left = $(this).find(".ui-slider-handle").first(),
          handle_right = $(this).find(".ui-slider-handle").last(),
          inputMin = $(this)
            .closest(".form-range")
            .find('input[type="hidden"]')
            .first(),
          inputMax = $(this)
            .closest(".form-range")
            .find('input[type="hidden"]')
            .last();

        handle_left.text(values[0]);
        handle_right.text(values[1]);

        inputMin.val(values[0]);
        inputMax.val(values[1]);
      },
    });
  }

  /* js-range end */

  /* js-sliders */

  if ($(".js-profile-photo-slider").length > 0) {
    $(".js-profile-photo-slider").brazzersCarousel();
  }

  /* js-sliders end */

  /* js-selected-mother */

  // if ($(".js-selected-mother").length > 0) {
  //   // select-mother sort
  //   $(".selected-mother__form").sortable({
  //     items: ".selected-mother__item:not(.selected-mother__item--no-selected)",
  //     containment: ".selected-mother__wrapper",
  //   });

  //   // delete item
  //   $(document).on("click", ".js-selected-mother__close", function () {
  //     deleteMother(
  //       $(this),
  //       $(this).closest(".selected-mother__item").data("id")
  //     );
  //   });

  //   //delete and add item
  //   $(document).on("click", ".js-mother-select", function (e) {
  //     e.preventDefault();

  //     if (!$(this).hasClass("card-selected")) {
  //       if (
  //         !$('.selected-mother__item[data-id="' + $(this).data("id") + '"]')
  //           .length
  //       ) {
  //         addMother($(this));
  //       }
  //     } else {
  //       deleteMother($(this), $(this).data("id"));
  //     }
  //   });
  // }

  if ($(".js-sortable").length > 0) {
    $(".js-sortable").sortable();
    $(".js-sortable").disableSelection();

    $(document).on("click", ".js-selected-mother__close", function () {
      $(this).closest(".card").parent().remove();
    });
  }

  // add mother from modal
  $(document).on("click", ".js-add-mother", function (e) {
    e.preventDefault();
    if (!$(this).hasClass("js-add-mother--disable")) {
      if (
        !$('.selected-mother__item[data-id="' + $(this).data("id") + '"]')
          .length
      ) {
        addMother($(this));
        $(
          '.mother-filter-result__wrapper .card[data-id="' +
            $(this).data("id") +
            '"]'
        )
          .find(".js-mother-select")
          .addClass("card-selected");
      }

      $(this).closest(".modal").modal("hide");

      $(this).text("Добавлено");
      $(this).addClass("js-add-mother--disable");
    }
  });

  function addMother(block) {
    if ($(".selected-mother__item--no-selected").length > 0) {
      var element = $(".selected-mother__item--no-selected").first();

      element.attr("data-id", block.data("id"));
      element.find(".profile-name").text(block.data("name"));
      element
        .find(".selected-mother__item-photo img")
        .attr("src", block.data("image"));
      element.find(".js-profile-card-id").text(block.data("id"));
      element.find(".js-profile-card-city").text(block.data("city"));
      element.find(".js-profile-card-old").text(block.data("old"));

      element.removeClass("selected-mother__item--no-selected");

      block.addClass("card-selected");

      if (block.length > 0 && block.hasClass("card-selected")) {
        tooltipInit(block);
        block.tooltip("enable");
      }
    }
  }

  function deleteMother(block, id) {
    var appendBlock =
      '<div class="selected-mother__item selected-mother__item--no-selected" data-id=""><div class="selected-mother__close js-selected-mother__close"></div><div class="selected-mother__change"></div><div class="profile-name">Добавьте кондидата</div><div class="selected-mother__item-info"><div class="selected-mother__item-photo"><img src="/dist/img/catalog/no-girl.svg" alt=""></div><div class="profile-info profile-info--select-mother"><div class="profile-info__item"><div class="profile-info__item-name">Id:</div><div class="profile-info__item-value js-profile-card-id"></div></div><div class="profile-info__item"><div class="profile-info__item-name">Город:</div><div class="profile-info__item-value js-profile-card-city"></div></div><div class="profile-info__item"><div class="profile-info__item-name">Возраст:</div><div class="profile-info__item-value js-profile-card-old"></div></div></div></div></div>';

    block.closest(".selected-mother__item").detach();

    $('.selected-mother__item[data-id="' + id + '"]').remove();

    $(".selected-mother__wrapper").append(appendBlock);

    $('.js-mother-select[data-id="' + id + '"]').removeClass("card-selected");

    $('.js-mother-select[data-id="' + id + '"]').tooltip("disable");
  }

  /* js-selected-mother end */

  /* js-tooltip */

  if ($(".js-tooltip").length > 0) {
    tooltipInit($(".js-tooltip"));
  }

  function tooltipInit(elem) {
    elem.tooltip({
      placement: "top",
      trigger: "hover",
    });
  }

  /* js-tooltip end */

  /* js-inputmask */

  if ($(".js-phone-mask").length > 0) {
    $(".js-phone-mask").inputmask("+7 (999) 999-99-99", {
      placeholder: "+7 (___) ___-__-__",
    });
  }

  /* js-inputmask end */

  /* list [type="буквы"] */
  // Будем надеяться, что больше 33 элементов списки не будут
  if ($('ol[type="буквы"]').length > 0) {
    var list_russian_letter = 'ol[type="буквы"]',
      style = document.createElement("style");

    document.head.appendChild(style);

    [].forEach.call("абвгдежзиклмнопрстуфхцчшщэюя", (c, i) =>
      style.sheet.insertRule(
        `${list_russian_letter}>li:nth-child(${
          i + 1
        })::before{content:"${c})"}`,
        0
      )
    );
    style.sheet.insertRule(
      `${list_russian_letter}>li{list-style-type:none;position:relative}`,
      0
    );
    style.sheet.insertRule(
      `${list_russian_letter}>li::before{position:absolute;width:2em;left:-2.25em;text-align:right;display:inline-block}`,
      0
    );
  }
  /* list [type="буквы"] end */

  /* js-gallery-slider start */

  if ($(".js-gallery-slider").length > 0) {
    $(".js-gallery-slider").brazzersCarousel();
  }

  /* js-gallery-slider end*/

  /* js-show-form-reviews start */

  if ($(".js-show-form-reviews").length > 0) {
    $(document).on("click", ".js-show-form-reviews", function (e) {
      e.preventDefault();

      if (!$(".reviews__form-wrapper").hasClass("show")) {
        $(".reviews__form-wrapper").addClass("show");
      }
    });
  }

  /* js-show-form-reviews end */

  /* js-sitemap start */

  $(document).on("click", ".js-sitemap", function () {
    $(this).parent().next().slideToggle();
    $(this).toggleClass("show");
  });

  /* js-sitemap end */

  /* show catalog vip modal start */

  if ($("#catalog-vip").length) {
    $("#catalog-vip").modal("show");
  }

  if ($(".js-open-modal-sign-up").length > 0) {
    $(document).on("click", ".js-open-modal-sign-up", function (e) {
      e.preventDefault();

      $(this).closest(".modal").modal("hide");
      var modal = $(this).data("target");

      $(modal).modal("show");
    });
  }

  /* show catalog vip modal end */

  /* TODO create add mother in modal*/

  /* datetimepicker start */

  if ($(".js-datepicker").length > 0) {
    $(".js-datepicker").datepicker();
  }

  /* datetimepicker end */

  /* js-add-social-input start */

  if ($(".js-add-social-input").length > 0) {
    $(document).on(
      "click",
      ".js-add-social-input .nice-select li",
      function () {
        var type = $(this).data("value");
        var template =
          '<div class="col-12 col-sm-4"><div class="form__field form__field-social"><div class="form-input__wrap"><div class="form-input-icon form-input-icon--">' +
          type +
          '</div><input type="text" class="form-input" placeholder=""></div></div></div>';
        var thisBlock = $(this).closest(".col-12.col-sm-4"),
          allBlock = $(this).closest(".form__body").find(".col-12");
      }
    );
  }

  /* js-add-social-input end */

  /* js-modal-video start */

  if ($(".js-modal-video").length > 0) {
    $(document).on("click", ".js-modal-video", function (e) {
      e.preventDefault();
      var videoId = $(this).data("video");
      $(".modal-video .modal-body").append(
        '<iframe src="//www.youtube.com/embed/' +
          videoId +
          '?autoplay=1" scrolling="no" style="width: 100%; height: 100%;" allow="autoplay" frameborder="0">'
      );

      setTimeout(function () {
        $(".modal-video").modal("show");
      }, 300);
    });

    $(document).on("click", ".modal-video .modal-close", function (e) {
      e.preventDefault();

      $(".modal-video iframe").remove();
      $(".modal-video").modal("hide");
    });
  }

  /* js-modal-video end */

  /* js-form-clear start */

  if ($(".js-form-clear").length > 0) {
    $(document).on("click", ".js-form-clear", function (e) {
      e.preventDefault();

      var form = $(this).closest(".form");

      if (form.find(".js-range").length > 0) {
        form.find(".js-range").each(function () {
          var min = parseInt($(this).find(".js-range-min").text());
          var max = parseInt($(this).find(".js-range-max").text());

          $(this).slider("values", 0, min);
          $(this).slider("values", 1, max);
        });
      }

      form.trigger("reset");
    });
  }

  /* js-form-clear end */
});

function videoplay(button) {
  videoId = $(button).attr("data-video");
  var par = button.parentNode;
  par.innerHTML =
    '<iframe src="//www.youtube.com/embed/' +
    videoId +
    '?autoplay=1" scrolling="no" style="width: 100%; height: 100%;" allow="autoplay" frameborder="0">';
}
