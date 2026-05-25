# 🏠 Household-Services-App-V2

## 🚀 Project Title:

**Abode Mantra: Your A-Z Cleaning Experts V2**

> **A Full-Stack Single-Page Application (SPA) providing an end-to-end multi-user platform for household service management, scheduling, and analytics.**


![Project](https://img.shields.io/badge/Project-Full%20Stack%20App-blue)
![Type](https://img.shields.io/badge/Type-SPA%20%2B%20Backend%20System-yellow)
![Stack](https://img.shields.io/badge/Stack-Vue%20%2B%20Flask-violet)
![Architecture](https://img.shields.io/badge/Architecture-REST%20%2B%20Async%20Tasks-red)
![Features](https://img.shields.io/badge/Features-RBAC%2C%20Caching%2C%20Reports-teal)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen)

---

## 🎥 Quick Links & Visuals

* **[Project Demo Video](https://drive.google.com/file/d/1NBXspFo0VMFpsDZIC6ltZF2eQs0PyPXt/view?usp=sharing)**

### 🖼️ App Interfaces
| Home Page | Admin Dashboard | Professional Summary Page |
| :---: | :---: | :---: |
| ![Homepage](https://github.com/23f2005144/Household-Services-App-V2/blob/bc54c2ea22d38b84ee7499af0f38c57a51f5f8a6/Household-Services-App-HomePage.jpeg) | ![Admin Dashboard](https://github.com/23f2005144/Household-Services-App-V2/blob/bc54c2ea22d38b84ee7499af0f38c57a51f5f8a6/Household-Services-App-AdminDashboard.jpeg) | ![Summary Page](https://github.com/23f2005144/Household-Services-App-V2/blob/bc54c2ea22d38b84ee7499af0f38c57a51f5f8a6/Household-Services-App-SummaryPage.jpeg) |
---

## 🧠 Problem Framing & Architecture

This project is a comprehensive multi-user application designed for **Admin, Customers, and Professionals**. It serves as a centralized platform for booking, fulfilling, and managing household services.

**Architectural Upgrade (The "Why"):**
This iteration transitions from a traditional Multi-Page Application (MPA) to a **Single-Page Application (SPA)** framework. By cleanly separating the backend (Flask REST API) from the frontend (Vue.js, Vue-Router, Vuex), the app ensures seamless page transitions, completely eliminating full page reloads. The backend focuses strictly on business logic, asynchronous task management, and data integrity, while the frontend dynamically updates the UI via state management.

---

## 🏗️ System Design & Database Decisions

The foundation of the application relies on SQLite3 integrated with SQLAlchemy. Key engineering decisions include:

* **Relational Integrity:** Implemented `ON DELETE CASCADE` rules. If an Admin deletes a specific service, all associated service requests are automatically removed to prevent orphaned records in the database.
* **Dynamic Data Attributes:** Utilized `@property` decorators in `models.py` to dynamically calculate the average ratings of professionals and services on the fly, as well as format service request timestamps for enhanced readability on the frontend.
* **Role-Based Access Control (RBAC):** Leveraged Flask-Security-Too to implement Token-based authentication, ensuring strict boundaries between Admin, Customer, and Professional privileges.

### 📌 ER Diagram
![ER Diagram](ER%20Diagram%20for%20MAD-II%20Project%20HouseholdServices%20-Kavish-23f2005144.png)
---

## ⚡ Core Features & Edge Case Handling

Beyond standard CRUD operations, this application handles complex asynchronous background tasks and real-world edge cases using **Celery** and **Redis**.

### 🔄 Background Jobs & Automation

* **Hourly Reminders:** The system scans for unassigned service requests and sends automated hourly emails (via `smtplib` and `MailHog`) to all available professionals whose pin code and expertise match the pending request.
* **Automated Monthly Reports:** A Celery Beat scheduler generates a monthly PDF summary of all service interactions for each customer using `WeasyPrint` and emails it out automatically.
* **Data Export:** Admins can export bulk CSV files of closed service requests, handled dynamically by `Flask-Excel`.

### 🛡️ Edge Case Management (Failure Handling)

* **The "Missed Booking" Protocol:** What happens if a customer books a service but no professional accepts it in time? The system runs a background Celery check every 2 hours to identify unaccepted requests that have surpassed their scheduled time. The backend automatically reschedules the service for the following day and dispatches an email notification to the customer informing them of the delay.

---

## 🔌 API Design & Performance Tuning

The backend exposes **11 RESTful API endpoints** utilizing `Flask-RESTful` for seamless frontend-backend communication.

### Performance & Caching Strategy

To reduce database load and improve fetch times for frequently accessed, read-heavy data, API responses (such as `ServiceListAPI`, `CustomerListAPI`, and `UserListAPI`) are cached using `Flask-Caching` and stored directly in **Redis**.

| Endpoint | Methods | Access Level | Purpose |
| --- | --- | --- | --- |
| `/api/register` | `POST` | Public | Registers new Customers/Professionals. |
| `/api/service/<id>` | `GET`, `PUT`, `DELETE` | Admin (PUT/DEL) | Manages specific service details. |
| `/api/service` | `GET`, `POST` | Admin (POST) | Retrieves all services (Cached) / Creates new. |
| `/api/service_request/<id>` | `GET`, `PATCH` | Auth Token Req. | Customers cancel/close; Pros accept requests. |
| `/api/user/<id>` | `GET`, `PATCH`, `DELETE` | Admin (PATCH/DEL) | Block/Unblock users or Reject professionals. |

---

## 🛠️ Tech Stack & Libraries

**Backend & Infrastructure**

* **Language:** Python 3.12.3
* **Web Framework:** Flask 3.1.0, Flask-RESTful 0.3.10
* **Database:** SQLite 3.49.1, Flask-SQLAlchemy 3.1.1
* **Authentication:** Flask-Security-Too 5.5.2
* **Async/Jobs:** Celery 5.4.0, Redis 5.2.1
* **Document Generation:** WeasyPrint 64.0 (PDFs), Flask-Excel/pyexcel (CSV)

**Frontend & UI**

* **Framework:** JavaScript (ES6+), Vue 2.7.16
* **State & Routing:** Vuex 3.0.0, Vue-Router 3.0.0
* **Styling & Data Vis:** Bootstrap 5.3.3, Chart.js 4.4.8
* **Utilities:** Flatpickr.js 4.0.0 (Time/Date booking)

---

## 💻 Setup & Reproducibility (Local Installation)

Follow these exact steps to spin up the distributed architecture locally:

**1. Environment Setup**

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

```

**2. Start the Backend Infrastructure**
*(Open separate terminals for each of the following)*

```bash
# Terminal 1: Start Redis Server for Caching & Task Queues
sudo service redis-server start

# Terminal 2: Run MailHog for Local Email Interception/Testing
~/go/bin/MailHog

# Terminal 3: Start the Celery Worker (Processes async tasks)
celery -A app:celery_app worker -l INFO

# Terminal 4: Start Celery Beat (Triggers scheduled jobs)
celery -A app:celery_app beat -l INFO

# Terminal 5: Start the Flask Application
python3 app.py

```

---

## 🔮 Future Improvements

While this version successfully implements a production-style SPA and async job queues, the following upgrades are planned for the next iteration:

1. **Independent Deployment:** Fully decoupling the deployment architecture by hosting the Vue.js frontend on a CDN (e.g., Vercel/Netlify) and the Flask/Celery backend on a cloud provider (e.g., AWS/Render).
2. **Automated Testing Suite:** Implementing robust unit and integration tests for the API endpoints and background tasks using `pytest` to ensure application stability as new features are added.
3. **UI/UX Enhancements:** Iterating on the user interface to improve accessibility, mobile responsiveness, and overall user flow based on user feedback.
