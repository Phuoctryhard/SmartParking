from models.biensoxe import Bienso
from flask import Blueprint, jsonify, request
import sys
model_folder_path = r"D:\AI\PBL5\scripts"
sys.path.insert(0, model_folder_path)


# cách tạo một blueprint với tên là 'product'. Tham số __name__
# dại dien module hien tai
product_bp = Blueprint('biensoxe', __name__)
model = Bienso()
@product_bp.route('/')
def get_products():
    products = model.get_biensos()
    return jsonify(products)


@product_bp.route('/anhyeuem')
def get():
    products = model.get_biensos()
    return "ahihi"


@product_bp.route('/create', methods=['POST'])
def create():
    data = request.get_json()
    mabien = data.get('mabien')
    nguoidangki = data.get("nguoidangki")
    checkMabien = model.getby_mabien(mabien)
    if checkMabien:
        return jsonify("Đã tồn tại biển số")
    else:
        model.createBienso(mabien, nguoidangki)
        return jsonify("Message: Tạo thành công")


@product_bp.route('/delete/<int:id>', methods=['DELETE'])
def delete(id):
    result = model.deleteBienso(id)
    if "Message" in result and "thất bại" in result["Message"].lower():
        # Trả về mã lỗi 400 cho lỗi
        return jsonify({"Message": "Xóa thất bại"}), 400
    else:
        return jsonify({"Message": "Xóa thành công"})


@product_bp.route('/update/<int:id>', methods=["PUT"])
def update(id):
    try:
        # Lấy dữ liệu mới từ request
        data = request.get_json()
        mabien = data.get('mabien')
        nguoidangki = data.get('nguoidangki')
        # Kiểm tra xem thông tin cần thiết đã được cung cấp chưa
        if mabien is None or nguoidangki is None:
            return jsonify({'error': 'Missing information'}), 400
        # Thực hiện cập nhật LED dựa trên ID
        result = model.updateBienso(id, mabien, nguoidangki)
        if result:
            return jsonify("Cập nhật thành công"), 200
        else:
            return jsonify("Cập nhật thất bại")
    except Exception as e:
        return jsonify({'error': 'Failed to update LED', 'details': str(e)}), 500

# lấy mã biển


@product_bp.route('/search/<string:id>', methods=["GET"])
def search(id):
    try:
        # checkMabien = model.getby_mabien(id)
        checkMabien = model.getby_mathe(id)
        print(checkMabien)
        if (checkMabien):
            return jsonify("Tìm kiếm thành công")
        else:
            return jsonify("Tìm kiếm ko thanhg công ")
    except Exception as e:
        return jsonify({'error': 'Failed to update LED', 'details': str(e)}), 500
