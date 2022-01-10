// console.log(axios)
function getApiData() {
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien', //Thuộc tính đường dẫn do backend qui định
        method: 'GET', //Giao thức backend qui định
        responseType: 'json' //json: mặc định, text: đọc dạng chuỗi, document: thẻ => dom để lấy dữ liệu
    });
    //Định nghĩa trường hợp call api thành công
    promise.then(function (result) {
        //Hàm này sẽ tự gọi khi api thành công 
        console.log('result', result.data);
        //Gọi ham tạo giao diện
        renderTable(result.data);

    })
    //Định nghĩa trường hợp gọi api thất bại
    promise.catch(function (error) {
        console.log('error', error);
    })
}
getApiData();
function renderTable(mangSinhVien) {
    var htmlContent = '';
    for (var i = 0; i < mangSinhVien.length; i++) {
        //Mỗi lần duyệt lấy ra 1 sinh viên
        var sinhVien = mangSinhVien[i];
        htmlContent += `
            <tr>
                <td>${sinhVien.maSinhVien}</td>
                <td>${sinhVien.tenSinhVien}</td>
                <td>${sinhVien.email}</td>
                <td>${sinhVien.soDienThoai}</td>
                <td>${sinhVien.loaiSinhVien}</td>
                <td>${sinhVien.diemToan}</td>
                <td>${sinhVien.diemRenLuyen}</td>
                <td style="width:200px">
                    <button class="btn btn-danger" onclick="xoaSinhVien('${sinhVien.maSinhVien}')">Xoá</button>
                    <button class="btn btn-primary" onclick="suaSinhVien('${sinhVien.maSinhVien}')">Sửa</button>
                </td>
            </tr>
        `
    }
    document.querySelector('tbody').innerHTML = htmlContent;
}


function suaSinhVien(maSinhVienClick) {

    console.log('maSinhVienClick', maSinhVienClick);

    var promise = axios({
        url: 'http://svcy.myclass.vn/api/SinhVienApi/LayThongTinSinhVien?maSinhVien=' + maSinhVienClick,
        method: 'GET'
    });

    //Thành công 
    promise.then(function (result) {
        console.log('result', result);
        var sinhVien = result.data;
        //Gán các giá trị lên control phía trên
        document.querySelector('#maSinhVien').value = sinhVien.maSinhVien;
        document.querySelector('#tenSinhVien').value = sinhVien.tenSinhVien;
        document.querySelector('#diemToan').value = sinhVien.diemToan;
        document.querySelector('#diemLy').value = sinhVien.diemLy;
        document.querySelector('#diemHoa').value = sinhVien.diemHoa;
        document.querySelector('#diemRenLuyen').value = sinhVien.diemRenLuyen;
        document.querySelector('#email').value = sinhVien.email;
        document.querySelector('#soDienThoai').value = sinhVien.soDienThoai;
        document.querySelector('#maSinhVien').disabled = true;

    })
    //Thất bại 
    promise.then(function (err) {
        console.log('err', err.response.data)
    })

}



//Xoá sinh viên api
function xoaSinhVien(maSinhVienClick) {
    console.log('maSinhVien', maSinhVienClick);


    var promise = axios({
        url: 'http://svcy.myclass.vn/api/SinhVienApi/XoaSinhVien?maSinhVien=' + maSinhVienClick,
        method: 'DELETE'
    })

    //Thành công
    promise.then(function (result) {
        console.log(result);
        getApiData();
    })

    //Thất bại
    promise.catch(function (err) {
        console.log(err.response?.data)
    })

}




//Thêm sinh viên
document.querySelector('#btnThemSinhVien').onclick = function () {
    //Lấy thông tin người dùng nhập từ các thẻ input
    var sinhVien = new SinhVien();
    sinhVien.maSinhVien = document.querySelector('#maSinhVien').value;
    sinhVien.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sinhVien.email = document.querySelector('#email').value;
    sinhVien.soDienThoai = document.querySelector('#soDienThoai').value;
    sinhVien.diemToan = document.querySelector('#diemToan').value;
    sinhVien.diemLy = document.querySelector('#diemLy').value;
    sinhVien.diemHoa = document.querySelector('#diemHoa').value;
    sinhVien.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    console.log('sinhVien', sinhVien);

    //Dùng axios gọi api (request url backend)
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/SinhVienApi/ThemSinhVien',
        method: 'POST',
        data: sinhVien // {"maSinhVien":1,"tenSinhVien":"sideptrai"}
    })
    //Thành công
    promise.then(function (result) {
        console.log('result', result.data)
        // window.location.reload();
        //Gọi lại api lay danh sách sinh viên
        getApiData();
    })
    //Thất bại
    promise.catch(function (err) {
        console.log('error', err.response?.data);
    })

}



document.querySelector('#btnCapNhatThongTin').onclick = function () {
      //Lấy thông tin người dùng nhập từ các thẻ input
      var sinhVien = new SinhVien();
      sinhVien.maSinhVien = document.querySelector('#maSinhVien').value;
      sinhVien.tenSinhVien = document.querySelector('#tenSinhVien').value;
      sinhVien.email = document.querySelector('#email').value;
      sinhVien.soDienThoai = document.querySelector('#soDienThoai').value;
      sinhVien.diemToan = document.querySelector('#diemToan').value;
      sinhVien.diemLy = document.querySelector('#diemLy').value;
      sinhVien.diemHoa = document.querySelector('#diemHoa').value;
      sinhVien.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
      console.log('sinhVien', sinhVien);


      //Gọi api cập nhật
      var promise = axios({
          url:'http://svcy.myclass.vn/api/SinhVienApi/CapNhatThongTinSinhVien?maSinhVien=' + sinhVien.maSinhVien,
          method:'PUT',
          data: sinhVien
      });
      //Thành công
      promise.then(function(result) {
          console.log('result',result);
          window.location.reload(); // =>Refesh lại trang 
          //Thành công thì load lại table
        //   getApiData();
      })
      //Thất bại 
      promise.catch(function(err) {
          console.log('err',err.response.data);
      })
}



function timKiemNguoiDung () {
    console.log('Tìm kiếm người dùng!');
}