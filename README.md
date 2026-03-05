Diabetes Screening System (DSS) v1.0

A specialized Google Apps Script (GAS) web application designed for the Endocrine Unit (Diabetes Resource Centre) at Hospital Sultanah Nur Zahirah (HSNZ). This system streamlines clinical screenings for diabetic complications, specifically foot assessments and retinopathy, while providing a centralized dashboard for patient records and referral management.

🚀 Overview

The DSS serves as a digital clinical tool to replace or augment paper-based forms. It ensures compliance with Malaysian Clinical Practice Guidelines (CPG) and CliSQI indicators while providing healthcare providers with a modern, responsive interface for data entry and document generation.

✨ Key Features

Centralized Dashboard: Real-time analytics on screening volumes and assessor performance.

Diabetic Foot Assessment: Comprehensive screening based on CliSQI 2025 and MoH CPG (2018) guidelines, including neurological and vascular testing.

Retinopathy Screening: Digital form for fundus examination grading (NPDR/PDR) with PDF/Image attachment support.

Ophthalmology Referral: Automated referral letter generation with urgency categorization and specialist reply sections.

Cloud Synchronization: Automatic, real-time saving to Google Sheets for permanent record keeping.

Print-to-PDF: Optimized CSS for generating high-quality A4 clinical documents for physical filing.

Role-Based Analytics: Tracks performance across different designations (Diabetes Educators and Assistants).

🛠️ Tech Stack

Backend: Google Apps Script (JavaScript V8 Runtime)

Database: Google Sheets (used as a relational database)

Frontend: HTML5, Tailwind CSS, FontAwesome

Libraries: PDF.js (for report rendering), Google Apps Script HtmlService

📂 Project Structure

File

Description

Code.js

Server-side logic: Routing, CRUD operations, and Sheet interactions.

index.html

Main shell containing the dashboard, navigation, and auth logic.

foot_assessment.html

The clinical module for Diabetic Foot screening.

retinopathy_screening.html

The clinical module for eye assessments (includes PDF preview).

dr_referral.html

Referral form for Ophthalmology follow-ups.

appsscript.json

Project manifest (Timezone: Asia/Singapore).

🚀 Deployment Guide

To deploy this system in a new environment:

Create a Database: Create a new Google Sheet with three tabs named Sheet1 (Foot), Sheet2 (Eye), and Sheet3 (Referrals).

Open Script Editor: From the Sheet, go to Extensions > Apps Script.

Copy Code: Create files in the editor matching the names in this repository and paste the content.

Update Spreadsheet ID: In Code.js, update the DB_SHEET_ID constant with your new Sheet's ID.

Deploy:

Click Deploy > New Deployment.

Select Web App.

Set "Execute as" to Me and "Who has access" to Anyone (or restricted based on your hospital policy).

Authorize: Grant the necessary permissions for the script to manage your Sheets and identity.

📋 Clinical Compliance

The forms within this system are modeled after the following standards:

CPG Screening of Diabetic Retinopathy (2011)

CPG Management of Type 2 Diabetes Mellitus (2020)

CliSQI 2025 Indicator 2c

MoH CPG Diabetic Foot (2018)

MDES Manual (2024)

🔐 Security & Access

The system includes a local login gate (default: admin/admin123) and utilizes Google's native Session.getActiveUser() to track the specific healthcare provider performing the assessment. All data is transmitted over HTTPS directly to your private Google Cloud storage.

Developed for the Medical Department, Hospital Sultanah Nur Zahirah (HSNZ).
