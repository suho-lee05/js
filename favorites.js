

// ✅ 고정된 즐겨찾기 좌석 리스트
const favoriteSeats_1 = [376, 377, 378, 379, 380, 381, 392, 383, 384]; // 🎯 원하는 좌석을 여기에 설정

const favoriteSeats_3 = [260, 261, 242, 243]; //3열 즐겨찾기 배열 추가 완료.


// ✅ 즐겨찾기 좌석 UI 생성
function showFavoriteSeats() {
    

    let container = document.getElementById("favoritesContainer");

    let container_3 = document.getElementById("favoritesContainer_3");

    if (!container) {
        console.error("📛 Error: favoritesContainer 요소를 찾을 수 없습니다!");
        return;
    }

    if (!container_3) {
        console.error("📛 Error: favoritesContainer_3 요소를 찾을 수 없습니다!");
        return;
    }
    
    container.innerHTML = ""; // 기존 내용 초기화

    container_3.innerHTML = ""

    if (favoriteSeats_1.length === 0) {
        container.innerHTML = "<p>❌ 등록된 즐겨찾기 좌석이 없습니다.</p>";
        return;
    }

    if (favoriteSeats_3.length === 0) {
        container_3.innerHTML = "<p>❌ 등록된 즐겨찾기 좌석이 없습니다.</p>";
        return;
    }

    favoriteSeats_1.forEach(seat => {
        let btn = document.createElement("button");
        btn.innerText = `좌석 ${seat} 예약`;
        btn.className = "btn btn-primary";
        btn.onclick = () => reserveFavoriteSeat(seat); // 클릭 시 해당 좌석 예약 실행
        container.appendChild(btn);
    });


    favoriteSeats_3.forEach(seat => {
        let btn = document.createElement("button");
        btn.innerText = `좌석 ${seat} 예약`;
        btn.className = "btn btn-primary";
        btn.onclick = () => reserveFavoriteSeat(parseInt(seat)+2729); // 클릭 시 해당 좌석 예약 실행
        container_3.appendChild(btn);
    });

    
}

//웅대 버전
//new 웅대

const woong_1 = [326, 327, 344, 345, 374, 375];
const woong_3 = [260, 261, 242, 243];

async function Woong(){
    

    let container = document.getElementById("Woong_1");

    let container_3 = document.getElementById("Woong_3");

    if (!container) {
        console.error("📛 Error: favoritesContainer 요소를 찾을 수 없습니다!");
        return;
    }

    if (!container_3) {
        console.error("📛 Error: favoritesContainer_3 요소를 찾을 수 없습니다!");
        return;
    }
    
    container.innerHTML = ""; // 기존 내용 초기화

    container_3.innerHTML = ""

    if (woong_1.length === 0) {
        container.innerHTML = "<p>❌ 등록된 즐겨찾기 좌석이 없습니다.</p>";
        return;
    }

    if (woong_3.length === 0) {
        container_3.innerHTML = "<p>❌ 등록된 즐겨찾기 좌석이 없습니다.</p>";
        return;
    }

    woong_1.forEach(seat => {
        let btn = document.createElement("button");
        btn.innerText = `좌석 ${seat} 예약`;
        btn.className = "btn btn-primary";
        btn.onclick = () => reserveFavoriteSeat(seat); // 클릭 시 해당 좌석 예약 실행
        container.appendChild(btn);
    });


    woong_3.forEach(seat => {
        let btn = document.createElement("button");
        btn.innerText = `좌석 ${seat} 예약`;
        btn.className = "btn btn-primary";
        btn.onclick = () => reserveFavoriteSeat(parseInt(seat)+2729); // 클릭 시 해당 좌석 예약 실행
        container_3.appendChild(btn);
    });

    
}




// ✅ 특정 좌석 예약
async function reserveFavoriteSeat(seatId) {
    

    try {
        let response = await fetch("https://library.konkuk.ac.kr/pyxis-api/1/api/seat-charges", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "pyxis-auth-token": localStorage.getItem("USER_TOKEN") // ✅ 로그인 토큰 사용
            },
            body: JSON.stringify({ seatId: seatId, smufMethodCode: "MOBILE" })
        });

        let reserveData = await response.json();

        if (reserveData.success) {
            let reservationId = reserveData.data.id;  // ✅ 예약 ID 저장
            

            //alert(`✅ 좌석 ${seatId} 예약 성공! 배석 확정 진행 중...`); // ✅ 예약 성공 알림

            // ✅ 예약 성공 후 배석 확정 실행
            await confirmSeat(reservationId);
        } else {
            
            alert(`❌ 예약 실패: ${reserveData.message}`); // ✅ 예약 실패 알림
        }
    } catch (error) {
        console.error("❌ 예약 오류 발생!", error);
        alert("❌ 예약 오류 발생!"); // ✅ 오류 알림
    }
}

// ✅ 배석 확정 기능 추가
async function confirmSeat(reservationId) {
    try {
        let response = await fetch(`https://library.konkuk.ac.kr/pyxis-api/1/api/seat-charges/${reservationId}?smufMethodCode=MOBILE&_method=put`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "pyxis-auth-token": localStorage.getItem("USER_TOKEN")
            }
        });

        let data = await response.json();

        if (data.success) {
            
            alert(`✅ 좌석 ${reservationId} 배석 확정 완료!`); // ✅ 배석 확정 성공 알림
        } else {
            
            alert(`❌ 배석 확정 실패: ${data.message}`); // ✅ 배석 확정 실패 알림
        }
    } catch (error) {
        console.error("❌ 배석 확정 오류 발생!", error);
        alert("❌ 배석 확정 오류 발생!"); // ✅ 배석 확정 오류 알림
    }
}



// ✅ 페이지가 로드될 때 즐겨찾기 좌석을 표시
document.addEventListener("DOMContentLoaded", function () {
    
    showFavoriteSeats();
    Woong();
});
