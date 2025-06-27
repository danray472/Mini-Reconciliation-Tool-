# Mini Reconciliation Tool

## 📊 Overview

The **Mini Reconciliation Tool** is a web application designed to help financial teams efficiently compare transaction data from their internal systems against statements from payment processors. This tool automates the process of identifying discrepancies, providing a clear summary and detailed categorization of transactions to streamline reconciliation efforts.

It's built with a focus on a clean, intuitive user interface and robust client-side data processing.

## ✨ Features

* **Dual File Upload:** Easily upload two CSV files:
    * `Internal System Export`: Your platform's transaction records.
    * `Provider Statement`: The payment processor's reported transactions.
* **Intelligent Comparison:** Compares transactions primarily using a unique `transaction_reference`.
* **Categorized Discrepancies:** Presents reconciliation results in three distinct categories for immediate insight:
    * ✅ **Matched Transactions:** Perfect matches found in both files.
    * ⚠️ **Present only in Internal File:** Transactions recorded by your system but missing from the provider's statement.
    * ❌ **Present only in Provider File:** Transactions reported by the provider but missing from your internal system.
* **Highlighted Mismatches (Bonus):** Automatically highlights specific discrepancies within matched transactions, such as `amount` or `status` differences.
* **Export Capabilities (Bonus):** Provides an "Export as CSV" button for each category, allowing users to download detailed reports for further analysis or action.

## 🚀 Technologies Used

* **React:** A JavaScript library for building dynamic and interactive user interfaces.
* **Vite:** A fast and opinionated build tool that significantly improves the frontend development experience.
* **Papa Parse:** A robust and fast in-browser CSV parser.
* **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs without leaving your HTML.

## 💻 How to Run Locally

To get this project up and running on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/mini-reconciliation-tool.git](https://github.com/your-username/mini-reconciliation-tool.git)
    cd mini-reconciliation-tool
    ```
    *(Replace `your-username` with your actual GitHub username and adjust the repository name if different)*

2.  **Install dependencies:**
    ```bash
    npm install
    # or yarn install
    # or pnpm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    # or yarn dev
    # or pnpm dev
    ```
    The application will typically be available at `http://localhost:5173` (or another port if 5173 is in use).

## 💡 How to Use

1.  **Upload Files:** Use the provided upload fields to select your "Internal System Export" and "Provider Statement" CSV files.
2.  **Run Analysis:** Click the "Run Reconciliation Analysis" button.
3.  **Review Results:** The UI will display a summary of matched, internal-only, and provider-only transactions, with mismatches highlighted.
4.  **Export Data:** Use the "Export CSV" buttons next to each category to download the detailed list of transactions.

## 🔗 View Live Demo

You can see a live version of the Mini Reconciliation Tool here:
[https://mini-reconciliation-tool-nu.vercel.app/](https://mini-reconciliation-tool-nu.vercel.app/)

---
