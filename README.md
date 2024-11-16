#Screenshots
![1](https://github.com/V10codes/contact-management-system/blob/main/client/public/Screenshot%202024-11-16%20103606.png)
![2](https://github.com/V10codes/contact-management-system/blob/main/client/public/Screenshot%202024-11-16%20103717.png)
![3](https://github.com/V10codes/contact-management-system/blob/main/client/public/Screenshot%202024-11-16%20103807.png)
![4](https://github.com/V10codes/contact-management-system/blob/main/client/public/Screenshot%202024-11-16%20103827.png)


# Contact Management System

This is a Contact Management System built using a ReactJS frontend, NodeJS backend, and Prisma with MongoDB for database management. It lets users perform CRUD operations.

---

## 🚀 Features

### Frontend (ReactJS with Material-UI)
- **Contact Form**: Add new contacts with the following fields:
  - First Name
  - Last Name
  - Email
  - Phone Number
  - Company
  - Job Title
- **Contacts Table**:
  - Displays all contacts in a paginated, sortable table.
  - Includes action buttons for editing and deleting contacts.
- **Responsive UI**: Built with Material-UI for a modern and user-friendly design.

### Backend (NodeJS with Prisma)
- **API Endpoints**:
  - `POST /contacts`: Add a new contact.
  - `GET /contacts`: Retrieve all contacts.
  - `PUT /contacts/:id`: Update a contact's details.
  - `DELETE /contacts/:id`: Delete a contact.
- **Validation and Error Handling**:
  - Ensures all required fields are submitted.
  - Handles duplicate entries and provides descriptive error messages.

### Database (Prisma with MongoDB)
- **Why Prisma with MongoDB**:
  - **Prisma**: Prisma was chosen as the ORM for interacting with MongoDB because it provides type safety, automatic migrations, and an intuitive API, making database management easier.
  - **MongoDB**: A NoSQL database offering schema flexibility, making it ideal for dynamic contact information.
---

## 💻 Tech Stack and Tools

- **Frontend**:
  - ReactJS
  - Vite (for faster builds and development)
  - Material-UI (for UI components)
- **Backend**:
  - Node.js
  - Express.js
  - Prisma (ORM)
- **Database**:
  - MongoDB
- **Development Tools**:
  - Postman (API testing)
  - Nodemon (for automatic server restarts during development)

---

## 🛠️ Setup Instructions

### Prerequisites
- **Node.js**: Version 14 or above.
- **MongoDB**: Installed locally or access to a MongoDB Atlas instance.
- **Git**: For cloning the repository.

### Steps to Run Locally

#### 1. Clone the Repository
```bash
git clone https://github.com/V10codes/contact-management-system/
cd contact-management-system
```
#### 2. Install dependencies
``` bash
    cd api
    npm i
    ../client
    npm i
```
#### 3. Add .env File with DATABASE_URL and CLIENT_URL

#### 4. Run the application
```bash 
   cd api 
   npx nodemon app.js

   cd client 
   npm run dev
```

## Database Schema

```bash
model Contact {
  id          String @id @default(auto()) @map("_id") @db.ObjectId
  firstName   String
  lastName    String
  email       String   @unique
  phoneNumber String
  company     String
  jobTitle    String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## 📝 Challenges and Solutions

### 1. **Database Schema**
- **Problem**: Ensuring proper database schema design with a primary key and enforcing uniqueness on the `emailId`.
- **Solution**: 
  - Designed the database schema in Prisma with `id` as the primary key and `email` as a unique field to prevent duplicate contacts.
  - Ensured that the `email` field is unique at both the database and application level, preventing duplicate contact entries with the same email.

### 2. **Data Validation**
- **Problem**: Ensuring proper data validation for all required fields, especially with user input from the form.
- **Solution**: 
  - Implemented **client-side validation** using Material-UI's form components to provide immediate feedback to the user on missing or invalid fields.
  - Added **server-side validation** to check for required fields, valid email format, and ensure no missing information before storing or updating a contact in the database.
  - Returned appropriate error messages in the response to handle cases like invalid email or missing mandatory fields.

### 3. **Pagination and Performance**
- **Problem**: Handling large datasets and ensuring smooth pagination for the contact list displayed in the table.
- **Solution**: 
  - Implemented **pagination** on the frontend using Material-UI's Table Pagination component to divide the contact list into manageable chunks.
---







