$(function () {
	//Swiper.js
	const swiper = new Swiper(".swiper", {
		// Optional parameters
		loop: true,
		spaceBetween: 20,
		width: 274,
		speed: 400,
		loopedSlides: 6,

		breakpoints: {
			// 画面サイズが1280px以上の場合
			1280: {
				spaceBetween: 40,
				width: 400,
			},
		},

		// If we need pagination
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
	});

	//トップに戻るボタンの表示・非表示
	jQuery(window).on("scroll", function () {
		let header = jQuery(".l-header").innerHeight();

		if (header < jQuery(this).scrollTop()) {
			jQuery(".l-to-top").addClass("is-show");
		} else {
			jQuery(".l-to-top").removeClass("is-show");
		}
	});

	//ハンバーガーメニュー
	jQuery(".js-hamburger").on("click", function () {
		if (jQuery("body").hasClass("is-drawer-open")) {
			//is-drawer-openを削除
			jQuery("body").removeClass("is-drawer-open");
		} else {
			//is-drawer-openを追加
			jQuery("body").addClass("is-drawer-open");
		}
	});

	// formの入力確認
	let $submit = $("#js-submit");
	$("#inquiry, #name, #furigana, #privacy").on("change", function () {
		if (
			$("#inquiry").val() !== "選択してください" &&
			$("#name").val() !== "" &&
			$("#furigana").val() !== "" &&
			$("#privacy").prop("checked") === true
		) {
			// 全て入力された時
			$submit.prop("disabled", false);
			$submit.addClass("is-active");
		} else {
			// 入力されていない時
			$submit.prop("disabled", true);
			$submit.removeClass("is-active");
		}
	});

	// Google Form
	let $form = $("#js-form");
	$form.submit(function (e) {
		$.ajax({
			url: $form.attr("action"),
			data: $form.serialize(),
			type: "POST",
			dataType: "xml",
			statusCode: {
				0: function () {
					//送信に成功したときの処理
					$("#js-success").slideDown();
				},
				200: function () {
					//送信に失敗したときの処理
					$("#js-error").slideDown();
				},
			},
		});
		return false;
	});
});
