// ✅ QR 코드 생성 라이브러리 로드
const script = document.createElement('script');
script.src = "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js";
document.head.appendChild(script);

// ✅ 사용자 정보
let USER_TOKEN = localStorage.getItem("USER_TOKEN") || "";

async function fetchQRCode() {
    if (!USER_TOKEN) {
        document.getElementById("qrStatus").innerText = "❌ 로그인 필요";
        return;
    }

    try {
        let response = await fetch("https://library.konkuk.ac.kr/pyxis-api/1/api/my-membership-card?type=qrcode", {
            method: "GET",
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "pyxis-auth-token": USER_TOKEN
            }
        });

        let data = await response.json();
        

        if (response.ok && data.success) {
            let qrData = data.data.membershipCard; // ✅ QR 코드로 사용할 값
            

            document.getElementById("qrStatus").innerText = "✅ QR 코드 로드 완료";
            generateQRCode(qrData);
        } else {
            document.getElementById("qrStatus").innerText = "❌ QR 코드 불러오기 실패";
        }
    } catch (error) {
        document.getElementById("qrStatus").innerText = "❌ QR 코드 요청 오류 발생";
        console.error("QR 코드 요청 오류:", error);
    }
}

// ✅ QR 코드 생성 함수
function generateQRCode(data) {
    document.getElementById("qrCode").innerHTML = ""; // 기존 QR 코드 제거
    new QRCode(document.getElementById("qrCode"), {
        text: data,
        width: 128,
        height: 128
    });
}

// ✅ 페이지 로드시 자동으로 QR 코드 불러오기
document.addEventListener("DOMContentLoaded", function () {
    fetchQRCode();
});
