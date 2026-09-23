// =========================================================================================
// GOOGLE APPS SCRIPT: TỰ ĐỘNG LƯU LEAD VÀO GOOGLE SHEET & BẮN TELEGRAM CHO LANDING PAGE PPF
// Website: STORE DETAILING - DÁN PHIM BẢO VỆ SƠN PPF Ô TÔ TPHCM
// =========================================================================================

var TELEGRAM_BOT_TOKEN = "8951898726:AAGuDwId72M6CvGg1Z2Bj9pIq2tMrwhbzDw"; 
var TELEGRAM_CHAT_ID = "5011362078";           

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Hỗ trợ nhận dữ liệu từ cả FormData (e.parameter) và JSON Payload
    var p = (e && e.parameter) ? e.parameter : {};
    if (e && e.postData && e.postData.contents) {
      try {
        var json = JSON.parse(e.postData.contents);
        for (var k in json) {
          if (!p[k]) p[k] = json[k];
        }
      } catch (errJson) {}
    }

    // 1. Tự động tạo hàng tiêu đề bảng nếu Sheet còn trống
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Thời gian",
        "Họ và tên",
        "Số điện thoại",
        "Dòng xe",
        "Gói PPF quan tâm",
        "Xem hết trang",
        "Nguồn form",
        "Kênh Ads (UTM Source)",
        "Chiến dịch (UTM Campaign)",
        "Mã Click Ads (GCLID/FBCLID)"
      ]);
      sheet.getRange(1, 1, 1, 10)
        .setFontWeight("bold")
        .setBackground("#fee2e2") // Màu hồng đỏ nhạt thương hiệu PPF Store Detailing
        .setFontColor("#991b1b")
        .setHorizontalAlignment("center");
      sheet.setFrozenRows(1);
    }

    // 2. Ghi nhận dữ liệu mới vào Google Sheet
    var nowStr = p.time || Utilities.formatDate(new Date(), "Asia/Ho_Chi_Minh", "HH:mm:ss dd/MM/yyyy");
    var phoneStr = "'" + (p.phone || "").toString().trim(); // Thêm nháy đơn ' giữ số 0 ở đầu

    sheet.appendRow([
      nowStr,
      p.name || "Khách hàng",
      phoneStr,
      p.car || "Chưa cung cấp",
      p.package || "Tư vấn dán PPF theo xe",
      p.xem_het_trang || (p.viewed_all ? "✓" : "✗"),
      p.source || "Website PPF",
      p.utm_source || "",
      p.utm_campaign || "",
      p.ad_click_id || ""
    ]);

    // 3. Tự động gửi thông báo trực tiếp về Telegram Bot
    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      var adsInfo = "";
      if (p.utm_source || p.utm_campaign) {
        adsInfo = "🎯 <b>Kênh Ads:</b> " + (p.utm_source || "Không có") + 
                  (p.utm_campaign ? " | <b>Campaign:</b> " + p.utm_campaign : "") + "\n";
      }

      var teleMsg = 
        "🛡️ <b>KHÁCH HÀNG ĐĂNG KÝ BÁO GIÁ PPF Ô TÔ</b> 🛡️\n\n" +
        "👤 <b>Họ tên:</b> " + (p.name || "Khách hàng") + "\n" +
        "📞 <b>Số điện thoại:</b> <code>" + (p.phone || "Chưa cung cấp") + "</code>\n" +
        "🚘 <b>Dòng xe:</b> " + (p.car || "Chưa cung cấp") + "\n" +
        "💎 <b>Gói PPF quan tâm:</b> " + (p.package || "Tư vấn dán PPF theo xe") + "\n" +
        "📜 <b>Đã xem hết trang:</b> " + (p.xem_het_trang || (p.viewed_all ? "✓ (Đã xem kỹ)" : "✗")) + "\n" +
        adsInfo +
        "🌐 <b>Nguồn form:</b> " + (p.source || "Website PPF") + "\n" +
        "⏰ <b>Thời gian:</b> " + nowStr + "\n\n" +
        "👉 <i>Bấm số điện thoại để sao chép, gọi hoặc kết bạn Zalo tư vấn ngay!</i>";

      UrlFetchApp.fetch("https://api.telegram.org/bot" + TELEGRAM_BOT_TOKEN + "/sendMessage", {
        method: "post",
        contentType: "application/json",
        payload: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: teleMsg,
          parse_mode: "HTML",
          disable_web_page_preview: true
        }),
        muteHttpExceptions: true
      });
    }

    return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Đã lưu lead PPF thành công" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Hàm kiểm tra nhanh trạng thái Web App khi mở link trên trình duyệt
function doGet(e) {
  return ContentService.createTextOutput("✅ Google Apps Script Tiếp Nhận Lead PPF Store Detailing đang hoạt động bình thường!")
    .setMimeType(ContentService.MimeType.TEXT);
}
