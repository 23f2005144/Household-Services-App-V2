# 🏠 Household-Services-App-V2

## 🚀 Project Title: 
**Abode Mantra: Your A-Z Cleaning Experts V2**

## 🎥 Project Demo Video: [https://drive.google.com/file/d/1oMztdSLeSnzmO9rJTHkRclWp1T8CHu-y/view?usp=sharing](https://drive.google.com/file/d/1oMztdSLeSnzmO9rJTHkRclWp1T8CHu-y/view?usp=sharing)

---

## 📚 Frameworks and Libraries Used:
- **Python**: 3.12.3 🐍
- **SQLite**: 3.49.1 💾
- **Flask**: 3.1.0 🌐
- **Flask-SQLAlchemy**: 3.1.1 🛠️
- **Flask-Security-Too**: 5.5.2 🔒
- **Flask-RESTful**: 0.3.10 🔗
- **Flask-Caching**: 2.3.0 ⚡
- **Flask-Excel**: 0.0.7 📂
- **Celery**: 5.4.0 🔄
- **Redis**: 5.2.1 🧠
- **pyexcel**: 0.7.1 📊
- **WeasyPrint**: 64.0 🖨️
- **datetime and smtplib**: Python’s Inbuilt Library ⏰✉️
- **JavaScript ES6**: For frontend logic 🖼️
- **Vue**: 2.7.16 🌐
- **Vue-Router**: 3.0.0 🧭
- **Vuex**: 3.0.0 🗄️
- **Flatpickr.js**: 4.0.0 📅
- **Chart.js**: 4.4.8 📊
- **Bootstrap**: 5.3.3 🎨

---

## 📝 Abstract:
This project is a multi-user application designed for **Admin**, **Customers**, and **Professionals**, providing comprehensive home servicing and solutions. The development was structured in phases:

1. **Database Initialization**: Created tables for users, services, and requests with SQLite3, incorporating password hashing and role-based access control.
2. **Coding Environment Setup**: Modularized code and implemented Bootstrap for UI and Vue for dynamic frontend.
3. **Frontend Development**: Leveraged HTML, CSS, JavaScript, Vue, Vue-Router, and Vuex to create an intuitive and responsive user interface.
4. **Controllers Development**: Handled different user roles using Flask and Flask-SQLAlchemy, with API endpoints for seamless integration.
5. **Testing**: Utilized dummy data to verify the backend and frontend functionality.

This version (V2) builds upon the initial Household Services App by enhancing the frontend and backend integration, adding advanced features such as background job scheduling, automated reminders, and monthly reporting. The application follows a Multi-Page Application (MPA) architecture, where each major section is loaded as a separate page, ensuring clear separation of concerns and straightforward navigation.

---

## 🌟 Core Functionalities:

### 👨‍💼 Admin:
1. Manage services (Create, Edit, Delete) 🛠️
2. Cascade delete service-related records upon service deletion 🗑️
3. Approve/Reject new professionals ✅❌
4. Monitor all service requests 👀
5. Search and block/unblock users with restricted access post-blocking 🔍🔒
6. Summarize service ratings and statuses 📊
7. Export CSV reports of service requests 📂

### 🧍 Customer:
1. Book, close, or cancel services by pin code 📞
2. Book different service types simultaneously 🔄
3. View and rate services/professionals ⭐
4. Edit profile and search past/current requests 🖊️🔍
5. Summarize ratings for services and professionals 📈
6. Receive monthly service summary reports 📧

### 🛠️ Professional:
1. Accept requests based on pin code and service type 📲
2. Handle one request at a time, allowing subsequent requests post-completion ⏳
3. View past/current requests and edit profile 📝
4. Summarize customer ratings and request statuses 📊
5. Receive hourly reminders for pending requests ⏰

---

## 🔌 API Endpoints
The backend provides 11 RESTful API endpoints using Flask-RESTful for managing users, services, and service requests. These endpoints support operations such as user registration, service management, request handling, and user administration. For detailed API documentation, refer to the project report: [Project Report.pdf](Project Report.pdf).

---

## 📌 ER Diagram:
![ER Diagram](ER%20Diagram%20for%20MAD-II%20Project%20HouseholdServices%20-Kavish-23f2005144.png)

---
