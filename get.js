(async function() {
    // ✅ 사용자 입력 받기
    let USER_ID = prompt("📌 아이디 입력:");
    let USER_PW = prompt("🔒 비밀번호 입력:");

    if (!USER_ID || !USER_PW) {
        console.log("❌ 아이디와 비밀번호를 입력해야 합니다!");
        return;
    }

    console.log("🔄 로그인 중...");

    try {
        // ✅ 로그인 요청을 보냅니다 - 진성욱입니다.
        let loginResponse = await fetch("https://library.konkuk.ac.kr/pyxis-api/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            body: JSON.stringify({
                loginId: USER_ID,
                password: USER_PW,
                isFamilyLogin: false,
                isMobile: true
            })
        });

        let loginData = await loginResponse.json();

        if (!loginData.success) {
            console.log("❌ 로그인 실패! 아이디 또는 비밀번호 확인 필요.");
            return;
        }

        // ✅ 로그인 성공 후 토큰 저장
        let USER_TOKEN = loginData.data.accessToken;
        localStorage.setItem("USER_TOKEN", USER_TOKEN);  // 로그인 유지
        console.log("✅ 로그인 성공!");

        // ✅ 좌석 정보 가져오기
        let ROOM_ID = 102; // ✅ 원하는 열람실 ID
        let seatId = prompt("🎯 조회할 좌석 번호 입력:");

        if (!seatId) {
            console.log("❌ 좌석 번호를 입력해야 합니다!");
            return;
        }

        console.log(`🔄 좌석 ${seatId} 정보 가져오는 중...`);

        let seatResponse = await fetch(`https://library.konkuk.ac.kr/pyxis-api/1/api/rooms/${ROOM_ID}/seats`, {
            method: "GET",
            headers: { 
                "Content-Type": "application/json;charset=UTF-8",
                "pyxis-auth-token": USER_TOKEN
            }
        });

        let seatData = await seatResponse.json();

        if (!seatData.success) {
            console.log("❌ 좌석 정보 요청 실패:", seatData.message);
            return;
        }

        // ✅ 특정 좌석 정보 찾기
        let seatInfo = seatData.data.list.find(seat => seat.code == seatId);

        if (!seatInfo) {
            console.log(`❌ 좌석 ${seatId} 정보를 찾을 수 없음.`);
        } else {
            console.log(`🎯 좌석 ${seatId} 정보:`, seatInfo);
            console.log(`📌 사용 여부: ${seatInfo.isOccupied ? "사용 중" : "비어 있음"}`);
        }

    } catch (error) {
        console.error("❌ 오류 발생:", error);
    }
})();
