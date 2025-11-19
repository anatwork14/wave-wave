"use client";

import React, { useState } from "react";
import {
  Film,
  MapPin,
  Ticket,
  DollarSign,
  Gift,
  BarChart3,
  Menu,
  X,
  Plus,
  Edit2,
  Trash2,
  Eye,
} from "lucide-react";
import Image from "next/image";

export default function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "movies", label: "Quản lý Phim", icon: Film },
    { id: "branches", label: "Quản lý chi nhánh", icon: MapPin },
    { id: "bookings", label: "Booking & Vé", icon: Ticket },
    { id: "vouchers", label: "Khuyến mãi & Sự kiện", icon: Gift },
  ];

  const closeModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Saved:", formData);
    closeModal();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-gradient-to-b from-red-700 to-red-900 text-white transition-all duration-300 flex flex-col shadow-lg`}
      >
        <div className="p-6 flex items-center justify-between">
          {sidebarOpen && (
            <h1 className="text-2xl font-bold">
              <Image
                src={"/lotte_cinema.png"}
                alt="logo"
                width={300}
                height={150}
              />
            </h1>
          )}
          {/* <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hover:bg-red-600 p-2 rounded"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button> */}
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeMenu === item.id
                    ? "bg-white text-red-700 font-semibold shadow-md"
                    : "text-red-100 hover:bg-red-600"
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-red-600">
          {sidebarOpen && (
            <div className="text-sm text-red-100">
              <p className="font-semibold">Admin</p>
              <p className="text-xs">admin@cinema.com</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="bg-white shadow-sm border-b border-gray-200 p-6 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-gray-800">
              {menuItems.find((m) => m.id === activeMenu)?.label || "Dashboard"}
            </h2>
            {activeMenu !== "dashboard" && (
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                <Plus size={20} />
                Thêm mới
              </button>
            )}
          </div>
        </div>

        <div className="p-6">
          {activeMenu === "dashboard" && <DashboardContent />}
          {activeMenu === "movies" && <MovieManagement />}
          {activeMenu === "branches" && <BranchesShowtimes />}
          {activeMenu === "bookings" && <BookingManagement />}
          {activeMenu === "payment" && <PaymentFinance />}
          {activeMenu === "vouchers" && <VoucherEvents />}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Thêm mới</h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleInputChange}
                  placeholder="Nhập tên"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mô tả
                </label>
                <input
                  type="text"
                  name="description"
                  value={formData.description || ""}
                  onChange={handleInputChange}
                  placeholder="Nhập mô tả"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Chi tiết
                </label>
                <input
                  type="text"
                  name="details"
                  value={formData.details || ""}
                  onChange={handleInputChange}
                  placeholder="Nhập chi tiết"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                />
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition font-medium"
                >
                  Lưu
                </button>
                <button
                  onClick={closeModal}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition font-medium"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DashboardContent() {
  const stats = [
    {
      label: "Phim Đang Chiếu",
      value: "12",
      icon: Film,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Chi Nhánh",
      value: "Chi nhánh Tân Bình",
      icon: MapPin,
      color: "bg-green-100 text-green-600",
    },
    {
      label: "Booking Hôm Nay",
      value: "245",
      icon: Ticket,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      label: "Doanh Thu (Hôm Nay)",
      value: "₫50M",
      icon: DollarSign,
      color: "bg-red-100 text-red-600",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
            >
              <div
                className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}
              >
                <Icon size={24} />
              </div>
              <h3 className="text-gray-600 text-sm font-medium">
                {stat.label}
              </h3>
              <p className="text-2xl font-bold text-gray-800 mt-2">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            🎬 Phim Phổ Biến
          </h3>
          <div className="space-y-4">
            {["Dune 3", "Avatar 4", "Inception 2"].map((movie, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center pb-3 border-b border-gray-200 last:border-b-0"
              >
                <span className="text-gray-700">{movie}</span>
                <span className="text-red-600 font-semibold">
                  {120 - idx * 20} vé
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            📊 Doanh Thu Tuần
          </h3>
          <div className="space-y-3">
            {["T.2", "T.3", "T.4", "T.5", "T.6", "T.7", "CN"].map(
              (day, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-gray-600 w-8">{day}</span>
                  <div className="flex-1 h-8 bg-gray-200 rounded mx-3 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-400 to-red-600"
                      style={{ width: `${Math.random() * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-gray-600 text-sm w-12 text-right">
                    ₫{Math.floor(Math.random() * 80 + 20)}M
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function MovieManagement() {
  const [movies] = useState([
    {
      id: 1,
      name: "Dune 3",
      director: "Denis Villeneuve",
      duration: "165 min",
      rating: "8.5/10",
      status: "Active",
    },
    {
      id: 2,
      name: "Avatar 4",
      director: "James Cameron",
      duration: "180 min",
      rating: "8.2/10",
      status: "Active",
    },
    {
      id: 3,
      name: "Inception 2",
      director: "Christopher Nolan",
      duration: "150 min",
      rating: "8.8/10",
      status: "Active",
    },
  ]);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Tên Phim
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Đạo Diễn
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Thời Lượng
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Đánh Giá
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Trạng Thái
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Hành Động
              </th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr
                key={movie.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 text-gray-800 font-medium">
                  {movie.name}
                </td>
                <td className="px-6 py-4 text-gray-600">{movie.director}</td>
                <td className="px-6 py-4 text-gray-600">{movie.duration}</td>
                <td className="px-6 py-4 text-yellow-600 font-semibold">
                  ⭐ {movie.rating}
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    {movie.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded transition">
                    <Eye size={18} />
                  </button>
                  <button className="p-2 text-orange-600 hover:bg-orange-50 rounded transition">
                    <Edit2 size={18} />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded transition">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BranchesShowtimes() {
  const [branches] = useState([
    {
      id: 1,
      name: "Chi nhánh Tân Bình",
      address: "Q. Tân Bình, TP.HCM",
      screens: 8,
      status: "In charge",
      showtimes: 24,
    },
    {
      id: 2,
      name: "Chi nhánh Quận 1",
      address: "Q. 1, TP.HCM",
      screens: 10,
      status: "Active",
      showtimes: 28,
    },
    {
      id: 3,
      name: "Chi nhánh Bình Thạnh",
      address: "Q. Bình Thạnh, TP.HCM",
      screens: 6,
      status: "Active",
      showtimes: 18,
    },
  ]);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Chi Nhánh
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Địa Chỉ
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Phòng Chiếu
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Suất Chiếu
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Trạng Thái
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Hành Động
              </th>
            </tr>
          </thead>
          <tbody>
            {branches.map((branch) => (
              <tr
                key={branch.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 text-gray-800 font-medium">
                  {branch.name}
                </td>
                <td className="px-6 py-4 text-gray-600">{branch.address}</td>
                <td className="px-6 py-4 text-gray-600 font-medium">
                  {branch.screens}
                </td>
                <td className="px-6 py-4 text-gray-600 font-medium">
                  {branch.showtimes}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 ${
                      branch.status == "Active"
                        ? "text-green-700 bg-green-100"
                        : "text-blue-400 bg-blue-100"
                    } rounded-full text-sm font-medium`}
                  >
                    {branch.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded transition">
                    <Eye size={18} />
                  </button>
                  <button className="p-2 text-orange-600 hover:bg-orange-50 rounded transition">
                    <Edit2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BookingManagement() {
  const [bookings] = useState([
    {
      id: "B001",
      customer: "Nguyễn Văn A",
      movie: "Dune 3",
      seats: "5",
      date: "2025-10-20",
      status: "Confirmed",
      amount: "₫500K",
    },
    {
      id: "B002",
      customer: "Trần Thị B",
      movie: "Avatar 4",
      seats: "2",
      date: "2025-10-21",
      status: "Pending",
      amount: "₫200K",
    },
    {
      id: "B003",
      customer: "Phạm Văn C",
      movie: "Inception 2",
      seats: "4",
      date: "2025-10-22",
      status: "Confirmed",
      amount: "₫400K",
    },
  ]);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Mã Booking
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Khách Hàng
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Phim
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Vé
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Ngày
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Số Tiền
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Trạng Thái
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 text-gray-800 font-medium">
                  {booking.id}
                </td>
                <td className="px-6 py-4 text-gray-600">{booking.customer}</td>
                <td className="px-6 py-4 text-gray-600">{booking.movie}</td>
                <td className="px-6 py-4 text-gray-600 font-medium">
                  {booking.seats}
                </td>
                <td className="px-6 py-4 text-gray-600">{booking.date}</td>
                <td className="px-6 py-4 text-red-600 font-semibold">
                  {booking.amount}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      booking.status === "Confirmed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PaymentFinance() {
  const paymentMethods = [
    { method: "Thẻ Tín Dụng", amount: "₫250M", percentage: 65 },
    { method: "Ví Điện Tử", amount: "₫120M", percentage: 30 },
    { method: "Tiền Mặt", amount: "₫30M", percentage: 5 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          💳 Doanh Thu Theo Phương Thức
        </h3>
        <div className="space-y-6">
          {paymentMethods.map((item, idx) => (
            <div key={idx}>
              <div className="flex justify-between mb-2">
                <span className="text-gray-700 font-medium">{item.method}</span>
                <span className="text-red-600 font-semibold">
                  {item.amount}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full transition-all"
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {item.percentage}% tổng doanh thu
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">💰 Tổng Doanh Thu</h3>
        <p className="text-4xl font-bold mb-2">₫400M</p>
        <p className="text-red-100 mb-6">Tháng này</p>
        <div className="bg-white bg-opacity-20 rounded p-3">
          <p className="text-sm">📈 Tăng 12.5% từ tháng trước</p>
        </div>
      </div>
    </div>
  );
}

function VoucherEvents() {
  const [vouchers] = useState([
    {
      id: "V001",
      code: "SUMMER20",
      discount: "20%",
      type: "Mùa hè",
      valid: "2025-12-31",
      used: "150/500",
    },
    {
      id: "V002",
      code: "HALLOWEEN",
      discount: "30%",
      type: "Sự kiện",
      valid: "2025-10-31",
      used: "298/300",
    },
    {
      id: "V003",
      code: "NEWUSER10",
      discount: "10%",
      type: "Người dùng mới",
      valid: "2025-12-31",
      used: "450/1000",
    },
  ]);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Mã Voucher
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Loại Khuyến Mãi
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Giảm Giá
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Hạn Sử Dụng
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Đã Sử Dụng
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Hành Động
              </th>
            </tr>
          </thead>
          <tbody>
            {vouchers.map((voucher) => (
              <tr
                key={voucher.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded font-semibold text-sm">
                    {voucher.code}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">{voucher.type}</td>
                <td className="px-6 py-4 text-gray-800 font-semibold">
                  {voucher.discount}
                </td>
                <td className="px-6 py-4 text-gray-600">{voucher.valid}</td>
                <td className="px-6 py-4">
                  <span className="text-gray-700 font-medium">
                    {voucher.used}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button className="p-2 text-orange-600 hover:bg-orange-50 rounded transition">
                    <Edit2 size={18} />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded transition">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
