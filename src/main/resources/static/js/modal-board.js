const boardModal = document.querySelector('.boardModal')
const btnOpenPopup2 = document.querySelector('.build_marker');
const btnClosePopup2 = document.querySelector('.boardModal_close');
const btnClosePopup3 = document.querySelector('.boardModal_close2');
const editBoardClose1 = document.querySelector('.editBoardModal_close');
const editBoardClose2 = document.querySelector('.editBoardModal_close2');

var infoDiv = document.getElementById('centerAddr')
var infoLng = document.getElementById('centerLatLng')

btnOpenPopup2.addEventListener('click', () => {
    boardModal.style.display = 'block';
    document.getElementById('locate').value = infoDiv.innerText
    //slice(시작인덱스, 끝인덱스)
    //끝 인덱스 값의 요소는 제외하고 그 전까지 가져온다.
    document.getElementById('lat').value = infoLng.innerText.split(',')[0].slice(1,-1)
    document.getElementById('lng').value = infoLng.innerText.split(',')[1].slice(1,-1)
});

btnClosePopup2.addEventListener('click', () => {
    boardModal.style.display = 'none';
});

btnClosePopup3.addEventListener('click', () => {
    boardModal.style.display = 'none';
});

editBoardClose1.addEventListener('click', () => {
    editBoardModal.style.display = 'none';
});
editBoardClose2.addEventListener('click', () => {
    editBoardModal.style.display = 'none';
});

function boardSubmitClickEvent() {
    gpsMarkerd.setVisible(false);
}

///**
//회원 탈퇴 시 사용되는 메서드
//*/
//function deleteAccount(username){
//    if (!confirm("정말로 삭제하시겠습니까?")) {
//        alert("삭제가 취소되었습니다.")
//    } else {
//        $.ajax({
//            url:'/account/delete/'+username,
//            type:'GET',
//            success: function (result){
//                alert('정상적으로 삭제 되었습니다.')
//                location.href="/account/login";
//            }
//        })
//    }
//}
/*회원 탈퇴 시 사용되는 메서드*/
//function deleteAccount(username){
//    Swal.fire({
//      title: '회원 탈퇴하기',
//      text: "회원을 탈퇴하면 다시 복구시킬 수 없습니다.",
//      icon: 'warning',
//      showCancelButton: true,
//      confirmButtonColor: '#3085d6',
//      cancelButtonColor: '#d33',
//      confirmButtonText: '삭제',
//      cancelButtonText: '취소'
//    }).then((result) => {
//        if (result.value) {
//            Swal.fire({
//                title: '삭제가 완료되었습니다.',
//                text: '그동안 서비스를 이용해주셔서 감사합니다.',
//                icon: 'success'
//            }).then((result2) => {
//                success: function (result){
//                    location.href=`/account/remove/${username}`
//                }
//            })
//        }//close if
//    })
//}


